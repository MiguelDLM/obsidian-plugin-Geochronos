import { ChronosPluginSettings } from "../types";
import { moment } from "vis-timeline/standalone";
import { formatGeologicalAxis } from "./geologicalAxisFormatter";

// Create a cloned instance to avoid pollution global moment settings
const chronosMomentInstance = (moment as any).clone?.() || moment;

/**
 * Uses a localized moment instance without affecting the global locale settings. Moment has strange behavior of impacting global moment when settings are changed - don't want to spill outside of Chronos

 * @returns An encapsulated moment instance with the specified locale and UTC setting
 */
export function chronosMoment(
	date: Date | number | string | moment.Moment,
	settings: ChronosPluginSettings,
) {
	const baseDate = normalizeToDate(date);
	const m = chronosMomentInstance(baseDate).locale(settings.selectedLocale);
	const zoned = settings.useUtc ? m.utc() : m;

	if (baseDate.getUTCFullYear() < 0) {
		const originalFormat = zoned.format.bind(zoned);
		const geologicalFormatMap: Record<string, string> = {
			YYYY: "year",
			"MMMM YYYY": "month",
			"ddd D MMMM": "day",
			"D MMMM HH:mm": "minute",
			"HH:mm": "hour",
			"HH:mm:ss": "second",
			SSS: "millisecond",
			"ddd D": "weekday",
			D: "day",
			MMM: "month",
			w: "week",
		};

		zoned.format = (fmt?: string) => {
			if (!fmt) {
				return originalFormat(fmt);
			}

			const scale =
				geologicalFormatMap[fmt] || (fmt.includes("YYYY") ? "year" : undefined);
			if (scale) {
				return formatGeologicalAxis(baseDate, scale, 1);
			}

			return originalFormat(fmt);
		};
	}

	return zoned;
}

function normalizeToDate(
	value: Date | number | string | moment.Moment,
): Date {
	if (value instanceof Date) {
		return value;
	}

	// moment instances expose toDate
	if (moment.isMoment?.(value)) {
		return value.toDate();
	}

	const candidate = new Date(value as string | number);
	if (!Number.isNaN(candidate.valueOf())) {
		return candidate;
	}

	// Fallback to epoch to avoid runtime errors; timeline will reformat it anyway
	return new Date(0);
}
