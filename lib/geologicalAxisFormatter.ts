/**
 * Custom time axis formatter for geological timelines
 * This provides appropriate labels for different geological time scales
 */

import { isoToMa, formatMaDisplay } from "../util/geologicalDateUtil";
import { findPeriodAtTime, GeologicalPeriod } from "./geologicalTimeScale";

/**
 * Format a date for the geological timeline axis
 * @param date - Date object to format
 * @param scale - The scale level (millisecond, second, minute, hour, weekday, day, week, month, year)
 * @param step - The step size
 * @returns Formatted string for the axis
 */
export function formatGeologicalAxis(
	date: Date,
	scale: string,
	step: number
): string {
	try {
		// Check if this is geological time (negative year)
		if (date.getUTCFullYear() >= 0) {
			// Not geological time, use default formatting
			return formatModernDate(date, scale);
		}

		// Convert to Ma
		const isoStr = date.toISOString();
		const ma = isoToMa(isoStr);

		return formatMaDisplay(ma);
	} catch (e) {
		console.error("Error formatting geological axis:", e);
		return date.toISOString().split("T")[0];
	}
}


/**
 * Format modern dates (CE) for the axis
 */
function formatModernDate(date: Date, scale: string): string {
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1;
	const day = date.getUTCDate();
	
	const pad = (num: number, length: number): string => {
		return String(num).length >= length 
			? String(num) 
			: "0".repeat(length - String(num).length) + String(num);
	};

	switch (scale) {
		case "year":
			return `${year}`;
		case "month":
			return `${year}-${pad(month, 2)}`;
		case "day":
		case "week":
		case "weekday":
			return `${year}-${pad(month, 2)}-${pad(day, 2)}`;
		default:
			return `${year}`;
	}
}

/**
 * Get geological period name for a given date (if applicable)
 * This can be used for additional context in tooltips
 */
export function getGeologicalPeriodForDate(date: Date): GeologicalPeriod | undefined {
	try {
		if (date.getUTCFullYear() >= 0) return undefined;
		
		const isoStr = date.toISOString();
		const ma = isoToMa(isoStr);
		
		// Try to find period at different ranks
		return findPeriodAtTime(ma, "Period") || 
		       findPeriodAtTime(ma, "Epoch") ||
		       findPeriodAtTime(ma, "Era");
	} catch (e) {
		return undefined;
	}
}
