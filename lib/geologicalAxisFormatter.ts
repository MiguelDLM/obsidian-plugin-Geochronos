/**
 * Custom time axis formatter for geological timelines
 * This provides appropriate labels for different geological time scales
 */

import { isoToMa } from "../util/geologicalDateUtil";
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

		// Format based on the magnitude
		if (ma < 0.001) {
			// Less than 1000 years - show in years
			return `${Math.round(ma * 1000000)} ya`;
		} else if (ma < 1) {
			// Less than 1 Ma - show in thousands of years (Ka)
			return `${(ma * 1000).toFixed(1)} Ka`;
		} else if (ma < 10) {
			// 1-10 Ma - show with 2 decimal places
			return `${ma.toFixed(2)} Ma`;
		} else if (ma < 100) {
			// 10-100 Ma - show with 1 decimal place
			return `${ma.toFixed(1)} Ma`;
		} else if (ma < 1000) {
			// 100-1000 Ma - show as integer
			return `${Math.round(ma)} Ma`;
		} else {
			// Over 1000 Ma - show in Ga (billions of years)
			return `${(ma / 1000).toFixed(2)} Ga`;
		}
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
