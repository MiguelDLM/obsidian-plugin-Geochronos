/**
 * Utilities for handling geological time dates
 * Geological dates are represented in Ma (millions of years ago)
 * 
 * Strategy: Convert Ma to a normalized year representation for vis-timeline
 * Ma of 0 = year 2000 (present)
 * Ma of 4600 = year -4599998000 (beginning of Earth)
 * 
 * This allows us to use vis-timeline's existing date handling while
 * representing geological time scales
 */

const PRESENT_YEAR = 2000; // Reference year for "present" (0 Ma)
const VIRTUAL_YEARS_PER_MA = 20; // Compress Ma to keep within JS Date limits

/**
 * Check if a string is in geological date format
 * Formats: "252Ma", "66.0Ma", "252.5Ma", "0.0042Ma"
 */
export function isGeologicalDate(dateStr: string): boolean {
	const geologicalRegex = /^-?\d+(\.\d+)?\s*Ma$/i;
	return geologicalRegex.test(dateStr.trim());
}

/**
 * Parse geological date string to Ma number
 * @param dateStr - String like "252Ma", "66.0Ma"
 * @returns Ma value as number
 */
export function parseMa(dateStr: string): number {
	const match = dateStr.trim().match(/^(-?\d+(?:\.\d+)?)\s*Ma$/i);
	if (!match) {
		throw new Error(`Invalid geological date format: ${dateStr}`);
	}
	return parseFloat(match[1]);
}

/**
 * Convert Ma (millions of years ago) to an ISO date string for vis-timeline
 * This creates a "virtual" date that vis-timeline can handle
 * 
 * @param ma - Millions of years ago (0 = present, 4600 = formation of Earth)
 * @returns ISO date string
 */
export function maToISO(ma: number): string {
	// Convert Ma to virtual integer years before present so generated dates remain valid
	const yearsAgo = Math.round(ma * VIRTUAL_YEARS_PER_MA);

	// Calculate the "virtual" year (negative for geological time)
	const year = PRESENT_YEAR - yearsAgo;

	// Format as ISO date; negative years must be zero-padded to at least 6 digits
	const absYearStr = Math.abs(year).toString();
	const paddedAbsYear = absYearStr.padStart(Math.max(6, absYearStr.length), "0");
	const yearStr = year < 0
		? `-${paddedAbsYear}`
		: year.toString().padStart(Math.max(4, year.toString().length), "0");

	return `${yearStr}-01-01T00:00:00Z`;
}

/**
 * Convert ISO date string back to Ma
 * @param isoStr - ISO date string
 * @returns Ma value
 */
export function isoToMa(isoStr: string): number {
	const match = isoStr.match(/^(-?\d+)-/);
	if (!match) {
		throw new Error(`Invalid ISO date format: ${isoStr}`);
	}
	
	const year = parseInt(match[1]);
		const yearsAgo = PRESENT_YEAR - year;
		return yearsAgo / VIRTUAL_YEARS_PER_MA;
}

/**
 * Convert a geological date string (like "252Ma") to ISO format
 * @param geologicalDateStr - String like "252Ma", "66.0Ma"
 * @returns ISO date string
 */
export function geologicalDateToISO(geologicalDateStr: string): string {
	if (!isGeologicalDate(geologicalDateStr)) {
		throw new Error(`Not a geological date: ${geologicalDateStr}`);
	}
	
	const ma = parseMa(geologicalDateStr);
	return maToISO(ma);
}

/**
 * Format a Ma value for display
 * @param ma - Millions of years ago
 * @returns Formatted string
 */
export function formatMaDisplay(ma: number): string {
	if (ma === 0) return "Present";
	if (ma < 0.001) return `${(ma * 1000000).toFixed(0)} years ago`;
	if (ma < 1) return `${(ma * 1000).toFixed(1)} Ka`; // thousands of years (Ka)
	if (ma >= 1000) return `${(ma / 1000).toFixed(2)} Ga`; // billions of years (Ga)
	return `${ma.toFixed(2)} Ma`;
}

/**
 * Validate geological date format
 * @param dateStr - String to validate
 * @throws Error if invalid
 */
export function validateGeologicalDate(dateStr: string): void {
	if (!isGeologicalDate(dateStr)) {
		throw new Error(`Invalid geological date format: ${dateStr}. Expected format like "252Ma" or "66.0Ma"`);
	}
	
	const ma = parseMa(dateStr);
	
	// Validate reasonable range (Earth is ~4.6 billion years old)
	if (ma < 0) {
		throw new Error(`Geological date cannot be negative: ${dateStr}`);
	}
	if (ma > 4600) {
		throw new Error(`Geological date cannot exceed 4600 Ma (age of Earth): ${dateStr}`);
	}
}

/**
 * Parse a date string that could be either geological or ISO format
 * @param dateStr - Date string in either format
 * @returns ISO date string
 */
export function parseGeologicalDate(dateStr: string): string {
	const trimmed = dateStr.trim();
	if (isGeologicalDate(trimmed)) {
		validateGeologicalDate(trimmed);
		return geologicalDateToISO(trimmed);
	}
	return trimmed;
}

/**
 * Create a range string for geological dates
 * @param startMa - Start in Ma (older)
 * @param endMa - End in Ma (younger)
 * @returns Formatted range string
 */
export function formatMaRange(startMa: number, endMa: number): string {
	if (startMa === endMa) {
		return formatMaDisplay(startMa);
	}
	return `${formatMaDisplay(startMa)} - ${formatMaDisplay(endMa)}`;
}
