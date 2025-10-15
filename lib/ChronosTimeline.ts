import { setTooltip } from "obsidian";
import { Timeline, TimelineOptions } from "vis-timeline";
import { DataSet } from "vis-timeline/standalone";
import crosshairsSvg from "../assets/icons/crosshairs.svg";
import {
	Marker,
	Group,
	ChronosPluginSettings,
	ChronosTimelineConstructor,
	ChronosDataItem,
	ChronosDataSetDataItem,
} from "../types";
import { enDatestrToISO } from "../util/enDateStrToISO";
import { smartDateRange } from "../util/smartDateRange";
import { ChronosMdParser } from "./ChronosMdParser";
import { orderFunctionBuilder } from "./flags";
import { chronosMoment } from "./chronosMoment";
import { maToISO, isoToMa, formatMaRange } from "../util/geologicalDateUtil";
import { toUTCDate } from "../util/utcUtil";
import {
	GeologicalPeriod,
	getPeriodsByRank,
} from "./geologicalTimeScale";

const MS_UNTIL_REFIT = 100;

export class ChronosTimeline {
	private container: HTMLElement;
	private settings: ChronosPluginSettings;
	private parser: ChronosMdParser;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private eventHandlers: { [key: string]: (event: any) => void } = {};
	items: ChronosDataItem[] | undefined;
	timeline: Timeline | undefined;
	userItemIds: (string | number)[] = [];

	constructor({ container, settings }: ChronosTimelineConstructor) {
		this.container = container;
		this.settings = settings;
		this.parser = new ChronosMdParser(this.settings.selectedLocale);
	}

	render(source: string) {
		try {
			const { items, markers, groups, flags } = this.parser.parse(
				source,
				this.settings,
			);

			this.userItemIds = items.flatMap((item) => (item.id ? [item.id] : []));

			const options = this._getTimelineOptions();

			// Handle flags
			if (flags?.orderBy) {
				options.order = orderFunctionBuilder(flags);
			}

			const hasDefaultViewFlag =
				flags?.defaultView?.start && flags?.defaultView?.end;

			if (hasDefaultViewFlag) {
				options.start = flags?.defaultView?.start;
				options.end = flags?.defaultView?.end;
			}

			if (flags?.noToday) {
				options.showCurrentTime = false;
			}
			if (flags?.height) {
				options.height = `${flags.height}px`;
				options.verticalScroll = true;
			}

			let workingItems = items;
			let workingGroups = groups;
			if (flags?.geologyOverlays?.length) {
				const { overlayItems, overlayGroups } =
					this._buildGeologicalOverlayLanes(
						flags.geologyOverlays,
						groups,
					);
				if (overlayItems.length) {
					workingItems = [...items, ...overlayItems];
				}
				if (overlayGroups.length) {
					workingGroups = [...groups, ...overlayGroups];
				}
			}

			const timeline = this._createTimeline(
				workingItems,
				workingGroups,
				options,
			);
			this._addMarkers(timeline, markers);
			this._setupTooltip(timeline, items);
			this._createRefitButton(timeline);
			// for whatever reason, timelines with groups render wonky on first paint and can be remedied by zooming in an out...
			this._handleZoomWorkaround(timeline, workingGroups, !hasDefaultViewFlag);

			this.timeline = timeline;

			// Ensure all items are visible by default - moved to after zoom workaround
			// (the fit will be called after the jiggle if needed)
		} catch (error) {
			this._handleParseError(error);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	on(eventType: string, handler: (event: any) => void) {
		this.eventHandlers[eventType] = handler;
		if (this.timeline) {
			this._setupEventHandlers(this.timeline);
		}
	}

	private _setupEventHandlers(timeline: Timeline) {
		// Set up event listeners based on the registered handlers
		Object.keys(this.eventHandlers).forEach((eventType) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			timeline.on(eventType, (event: any) => {
				this.eventHandlers[eventType](event);
			});
		});
	}

	private _getTimelineOptions(): TimelineOptions {
		return {
			min: new Date(maToISO(4600)), // Earth's formation
			max: new Date(maToISO(0.0209)), // ~20.9k years, chosen as the limit
			zoomMax: 2e14, // Allows zooming out to see ~220,000 virtual years (approx. 4600 Ma)
			zoomMin: 15147648000, // Prevents zooming beyond 2 decimal places of Ma
			zoomable: true,
			selectable: true,
			minHeight: "200px",
			align: this.settings.align,
			// locale: this.settings.selectedLocale,
			moment: (date: Date) => chronosMoment(date, this.settings),
			format: {
				minorLabels: {
					millisecond: "SSS",
					second: "s",
					minute: "HH:mm",
					hour: "HH:mm",
					weekday: "ddd D",
					day: "D",
					week: "w",
					month: "MMM",
					year: "YYYY",
				},
				majorLabels: {
					millisecond: "HH:mm:ss",
					second: "D MMMM HH:mm",
					minute: "ddd D MMMM",
					hour: "ddd D MMMM",
					weekday: "MMMM YYYY",
					day: "MMMM YYYY",
					week: "MMMM YYYY",
					month: "YYYY",
					year: "YYYY",
				},
			},
		};
	}

	private _handleParseError(error: Error) {
		const errorMsgContainer = this.container.createEl("div", {
			cls: "chronos-error-message-container",
		});
		errorMsgContainer.innerText = this._formatErrorMessages(error);
	}

	private _formatErrorMessages(error: Error): string {
		return `Error(s) parsing geochronos markdown. Hover to edit: \n\n${error.message
			.split(";;")
			.map((msg) => `  - ${msg}`)
			.join("\n\n")}`;
	}

	private _createTimeline(
		items: ChronosDataItem[],
		groups: Group[] = [],
		options: TimelineOptions,
	): Timeline {
		let timeline: Timeline;
		if (groups.length) {
			const { updatedItems, updatedGroups } = this.assignItemsToGroups(
				items,
				groups,
			);

			this.items = updatedItems;

			timeline = new Timeline(
				this.container,
				updatedItems,
				this._createDataGroups(updatedGroups),
				options,
			);
		} else {
			timeline = new Timeline(this.container, items, options);
			this.items = items;
		}

		setTimeout(() => this._updateTooltipCustomMarkers(), MS_UNTIL_REFIT);
		return timeline;
	}

	private _addMarkers(timeline: Timeline, markers: Marker[]) {
		markers.forEach((marker, index) => {
			const id = `marker_${index}`;
			timeline.addCustomTime(new Date(marker.start), id);
			timeline.setCustomTimeMarker(marker.content, id, true);
		});
	}

	private _setupTooltip(timeline: Timeline, items: ChronosDataItem[]) {
		timeline.on("itemover", (event) => {
			const item = new DataSet(items).get(
				event.item,
			) as unknown as ChronosDataSetDataItem;
			if (item) {
				let text: string;
                if (item.isGeological) {
                    const startMa = isoToMa(item.start.toISOString());
                    const endMa = item.end ? isoToMa(item.end.toISOString()) : startMa;
                    text = `${item.content} (${formatMaRange(startMa, endMa)})${item.cDescription ? " \n " + item.cDescription : ""}`;
                } else {
                    text = `${item.content} (${smartDateRange(
                        item.start.toISOString(),
                        item.end?.toISOString() ?? null,
                        this.settings.selectedLocale,
                    )})${item.cDescription ? " \n " + item.cDescription : ""}`;
                }
                setTooltip(event.event.target, text);
			}
		});
	}

	private _createRefitButton(timeline: Timeline) {
		const refitButton = this.container.createEl("button", {
			cls: "chronos-timeline-refit-button",
		});

		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(crosshairsSvg, "image/svg+xml");
		const svgElement = svgDoc.documentElement;

		refitButton.appendChild(document.importNode(svgElement, true));
		setTooltip(refitButton, "Fit all");
		refitButton.addEventListener("click", () => {
			if (this.userItemIds && this.userItemIds.length > 0) {
				const userItems = (this.items || []).filter(
					(item) => item.id && this.userItemIds.includes(item.id)
				);

				if (userItems.length > 0) {
					const itemDates = userItems.flatMap((item) => {
						const dates = [];
						if (item.start) dates.push(new Date(item.start).getTime());
						if (item.end) dates.push(new Date(item.end).getTime());
						return dates;
					});

					if (itemDates.length > 0) {
						let minTime = Math.min(...itemDates);
						let maxTime = Math.max(...itemDates);

						// Add 10% padding
						const padding = (maxTime - minTime) * 0.1;
						minTime -= padding;
						maxTime += padding;

						timeline.setWindow(new Date(minTime), new Date(maxTime));
					}
				}
			} else {
				timeline.fit();
			}
		});
	}

	private _updateTooltipCustomMarkers() {
		const customTimeMarkers =
			this.container.querySelectorAll(".vis-custom-time");
		customTimeMarkers.forEach((m) => {
			const titleText = m.getAttribute("title");
			if (titleText) {
				let text = titleText;
				if (this.settings.selectedLocale === "en") {
					const enDateISO = enDatestrToISO(titleText);
					text = smartDateRange(
						enDateISO,
						null,
						this.settings.selectedLocale,
					);
				} else {
					text = titleText
						.replace(", 0:00:00", "")
						.replace(/^.*?:/, "")
						.trim();
				}
				setTooltip(m as HTMLElement, text);

				const observer = new MutationObserver((mutationsList) => {
					for (const mutation of mutationsList) {
						if (
							mutation.type === "attributes" &&
							mutation.attributeName === "title"
						) {
							m.removeAttribute("title");
						}
					}
				});
				observer.observe(m, { attributes: true });
			}
		});
	}

	private assignItemsToGroups(items: ChronosDataItem[], groups: Group[]) {
		const DEFAULT_GROUP_ID = 0;
		if (!groups.length) {
			return { updatedItems: items, updatedGroups: groups };
		}

		const updatedGroups = [
			{ id: DEFAULT_GROUP_ID, content: " " },
			...groups,
		];

		const updatedItems = items.map((item) => {
			if (!item.group) item.group = DEFAULT_GROUP_ID;
			return item;
		});

		return { updatedItems, updatedGroups };
	}

	private _buildGeologicalOverlayLanes(
		ranks: GeologicalPeriod["rank"][],
		existingGroups: Group[],
	): { overlayItems: ChronosDataItem[]; overlayGroups: Group[] } {
		const uniqueRanks = Array.from(new Set(ranks));
		const overlayItems: ChronosDataItem[] = [];
		const overlayGroups: Group[] = [];
		const seen = new Set<string>();
		let nextGroupId = existingGroups.length
			? Math.max(...existingGroups.map((g) => g.id)) + 1
			: 1;

		uniqueRanks.forEach((rank) => {
			const periods = getPeriodsByRank(rank);
			if (!periods.length) return;

			const groupId = nextGroupId++;
			overlayGroups.push({
				id: groupId,
				content: this._labelForGeologicalRank(rank),
				className: "geology-lane-group",
			});

			periods.forEach((period) => {
				const overlayId = this._slugify(
					`overlay-${rank}-${period.name}`,
				);
				if (seen.has(overlayId)) {
					return;
				}
				seen.add(overlayId);

				overlayItems.push({
					id: overlayId,
					content: period.name,
					start: toUTCDate(maToISO(period.start)),
					end: toUTCDate(maToISO(period.end)),
					group: groupId,
					type: "background",
					className: `geology-lane geology-lane-${rank.toLowerCase()}`,
					style: this._buildOverlayStyle(period),
				});
			});
		});

		overlayItems.sort(
			(a, b) =>
				(a.start as Date).valueOf() - (b.start as Date).valueOf(),
		);

		return { overlayItems, overlayGroups };
	}

	private _buildOverlayStyle(period: GeologicalPeriod): string | undefined {
		const styles: string[] = [
			"border: none",
			"align-items: center",
			"display: flex",
			"pointer-events: none",
			"font-weight: 600",
			"text-transform: uppercase",
			"letter-spacing: 0.02em",
			"justify-content: center",
			"width: 100%",
		];
		if (period.color) {
			const rgba = this._hexToRgba(period.color, 0.25);
			if (rgba) {
				styles.push(`background-color: ${rgba}`);
			}
		}
		styles.push("color: var(--text-normal)");
		return styles.join("; ");
	}

	private _labelForGeologicalRank(rank: GeologicalPeriod["rank"]): string {
		switch (rank) {
			case "Stage":
				return "Stages";
			case "Age":
				return "Ages";
			case "Epoch":
				return "Epochs";
			case "Period":
				return "Periods";
			case "Era":
				return "Eras";
			case "Eon":
				return "Eons";
			case "Supereon":
				return "Supereons";
			default:
				return rank;
		}
	}

	private _slugify(value: string): string {
		return value
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
	}

	private _hexToRgba(hex: string, alpha: number): string | null {
		const sanitized = hex.replace("#", "");
		if (![3, 6].includes(sanitized.length)) {
			return null;
		}

		const expanded =
			sanitized.length === 3
				? sanitized
						.split("")
						.map((char) => char + char)
						.join("")
				: sanitized;

		const r = parseInt(expanded.slice(0, 2), 16);
		const g = parseInt(expanded.slice(2, 4), 16);
		const b = parseInt(expanded.slice(4, 6), 16);

		if ([r, g, b].some((value) => Number.isNaN(value))) {
			return null;
		}

		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	private _createDataGroups(rawGroups: Group[]) {
		return new DataSet<Group>(rawGroups.map((g) => ({ ...g })));
	}

	private _handleZoomWorkaround(timeline: Timeline, groups: Group[], shouldFitAfter: boolean = false) {
		if (groups.length) {
			setTimeout(() => this._jiggleZoom(timeline, shouldFitAfter), MS_UNTIL_REFIT + 50);
		} else if (shouldFitAfter) {
			// No groups, just fit
			setTimeout(() => timeline.fit(), MS_UNTIL_REFIT);
		}
	}

	private _jiggleZoom(timeline: Timeline, shouldFitAfter: boolean = false) {
		const range = timeline.getWindow();
		const zoomFactor = 1.02;
		const newStart = new Date(
			range.start.valueOf() -
				((range.end.valueOf() - range.start.valueOf()) *
					(zoomFactor - 1)) /
					2,
		);
		const newEnd = new Date(
			range.end.valueOf() +
				((range.end.valueOf() - range.start.valueOf()) *
					(zoomFactor - 1)) /
					2,
		);

		// zoom out...
		timeline.setWindow(newStart, newEnd, { animation: true });
		// zoom back in
		setTimeout(() => {
			timeline.setWindow(range.start, range.end, { animation: true });
			// Fit after jiggle if needed
			if (shouldFitAfter) {
				setTimeout(() => timeline.fit(), 250);
			}
		}, 200);
	}
}
