/**
 * Geological Time Scale data extracted from ICS Chart (2024)
 * https://github.com/i-c-stratigraphy/chart/blob/main/chart.ttl
 * 
 * Ages are in millions of years ago (Ma)
 * Each unit has a start (older) and end (younger) age
 */

export interface GeologicalPeriod {
	name: string;
	start: number; // Ma (millions of years ago)
	end: number; // Ma
	color?: string; // Hex color from ICS chart
	rank: 'Eon' | 'Era' | 'Period' | 'Epoch' | 'Age';
	parent?: string; // Name of parent unit
}

/**
 * Main geological time scale periods
 * Organized by rank: Eons > Eras > Periods > Epochs > Ages
 */
export const GEOLOGICAL_TIME_SCALE: GeologicalPeriod[] = [
	// PHANEROZOIC EON
	{ name: "Phanerozoic", start: 538.8, end: 0, color: "#9AD9DD", rank: "Eon" },
	
	// CENOZOIC ERA
	{ name: "Cenozoic", start: 66.0, end: 0, color: "#F2F91D", rank: "Era", parent: "Phanerozoic" },
	
	// Quaternary Period
	{ name: "Quaternary", start: 2.58, end: 0, color: "#F9F97F", rank: "Period", parent: "Cenozoic" },
	{ name: "Holocene", start: 0.0117, end: 0, color: "#FEEBD2", rank: "Epoch", parent: "Quaternary" },
	{ name: "Meghalayan", start: 0.0042, end: 0, color: "#FDEDEC", rank: "Age", parent: "Holocene" },
	{ name: "Northgrippian", start: 0.0082, end: 0.0042, color: "#FDEEE5", rank: "Age", parent: "Holocene" },
	{ name: "Greenlandian", start: 0.0117, end: 0.0082, color: "#FEF2E9", rank: "Age", parent: "Holocene" },
	{ name: "Pleistocene", start: 2.58, end: 0.0117, color: "#FFF2AE", rank: "Epoch", parent: "Quaternary" },
	
	// Neogene Period
	{ name: "Neogene", start: 23.03, end: 2.58, color: "#FFE619", rank: "Period", parent: "Cenozoic" },
	{ name: "Pliocene", start: 5.333, end: 2.58, color: "#FFFFB3", rank: "Epoch", parent: "Neogene" },
	{ name: "Miocene", start: 23.03, end: 5.333, color: "#FFFF00", rank: "Epoch", parent: "Neogene" },
	
	// Paleogene Period
	{ name: "Paleogene", start: 66.0, end: 23.03, color: "#FD9A52", rank: "Period", parent: "Cenozoic" },
	{ name: "Oligocene", start: 33.9, end: 23.03, color: "#FEC574", rank: "Epoch", parent: "Paleogene" },
	{ name: "Eocene", start: 56.0, end: 33.9, color: "#FDC07A", rank: "Epoch", parent: "Paleogene" },
	{ name: "Paleocene", start: 66.0, end: 56.0, color: "#FDA75F", rank: "Epoch", parent: "Paleogene" },
	
	// MESOZOIC ERA
	{ name: "Mesozoic", start: 251.902, end: 66.0, color: "#67C5CA", rank: "Era", parent: "Phanerozoic" },
	
	// Cretaceous Period
	{ name: "Cretaceous", start: 145.0, end: 66.0, color: "#7FC64E", rank: "Period", parent: "Mesozoic" },
	{ name: "Upper Cretaceous", start: 100.5, end: 66.0, color: "#A6D84A", rank: "Epoch", parent: "Cretaceous" },
	{ name: "Lower Cretaceous", start: 145.0, end: 100.5, color: "#8CCD57", rank: "Epoch", parent: "Cretaceous" },
	
	// Jurassic Period
	{ name: "Jurassic", start: 201.3, end: 145.0, color: "#34B2C9", rank: "Period", parent: "Mesozoic" },
	{ name: "Upper Jurassic", start: 163.5, end: 145.0, color: "#B3E1E6", rank: "Epoch", parent: "Jurassic" },
	{ name: "Middle Jurassic", start: 174.1, end: 163.5, color: "#80CED7", rank: "Epoch", parent: "Jurassic" },
	{ name: "Lower Jurassic", start: 201.3, end: 174.1, color: "#66C2D7", rank: "Epoch", parent: "Jurassic" },
	
	// Triassic Period
	{ name: "Triassic", start: 251.902, end: 201.3, color: "#812B92", rank: "Period", parent: "Mesozoic" },
	{ name: "Upper Triassic", start: 237.0, end: 201.3, color: "#B051C5", rank: "Epoch", parent: "Triassic" },
	{ name: "Middle Triassic", start: 247.2, end: 237.0, color: "#B051C5", rank: "Epoch", parent: "Triassic" },
	{ name: "Lower Triassic", start: 251.902, end: 247.2, color: "#983999", rank: "Epoch", parent: "Triassic" },
	
	// PALEOZOIC ERA
	{ name: "Paleozoic", start: 538.8, end: 251.902, color: "#99C08D", rank: "Era", parent: "Phanerozoic" },
	
	// Permian Period
	{ name: "Permian", start: 298.9, end: 251.902, color: "#F04028", rank: "Period", parent: "Paleozoic" },
	{ name: "Lopingian", start: 259.1, end: 251.902, color: "#FBA794", rank: "Epoch", parent: "Permian" },
	{ name: "Guadalupian", start: 272.95, end: 259.1, color: "#FB745D", rank: "Epoch", parent: "Permian" },
	{ name: "Cisuralian", start: 298.9, end: 272.95, color: "#EF5845", rank: "Epoch", parent: "Permian" },
	
	// Carboniferous Period
	{ name: "Carboniferous", start: 358.9, end: 298.9, color: "#67A599", rank: "Period", parent: "Paleozoic" },
	{ name: "Pennsylvanian", start: 323.2, end: 298.9, color: "#99C2B8", rank: "Epoch", parent: "Carboniferous" },
	{ name: "Mississippian", start: 358.9, end: 323.2, color: "#8CB06C", rank: "Epoch", parent: "Carboniferous" },
	
	// Devonian Period
	{ name: "Devonian", start: 419.2, end: 358.9, color: "#CB8C37", rank: "Period", parent: "Paleozoic" },
	{ name: "Upper Devonian", start: 382.7, end: 358.9, color: "#F1D281", rank: "Epoch", parent: "Devonian" },
	{ name: "Middle Devonian", start: 393.3, end: 382.7, color: "#F1C96B", rank: "Epoch", parent: "Devonian" },
	{ name: "Lower Devonian", start: 419.2, end: 393.3, color: "#E5B75A", rank: "Epoch", parent: "Devonian" },
	
	// Silurian Period
	{ name: "Silurian", start: 443.8, end: 419.2, color: "#B3E1B6", rank: "Period", parent: "Paleozoic" },
	{ name: "Pridoli", start: 423.0, end: 419.2, color: "#E6F5E1", rank: "Epoch", parent: "Silurian" },
	{ name: "Ludlow", start: 427.4, end: 423.0, color: "#D9EFD7", rank: "Epoch", parent: "Silurian" },
	{ name: "Wenlock", start: 433.4, end: 427.4, color: "#CCE9CD", rank: "Epoch", parent: "Silurian" },
	{ name: "Llandovery", start: 443.8, end: 433.4, color: "#BFE3C3", rank: "Epoch", parent: "Silurian" },
	
	// Ordovician Period
	{ name: "Ordovician", start: 485.4, end: 443.8, color: "#009270", rank: "Period", parent: "Paleozoic" },
	{ name: "Upper Ordovician", start: 458.4, end: 443.8, color: "#5EB27E", rank: "Epoch", parent: "Ordovician" },
	{ name: "Middle Ordovician", start: 470.0, end: 458.4, color: "#3FA755", rank: "Epoch", parent: "Ordovician" },
	{ name: "Lower Ordovician", start: 485.4, end: 470.0, color: "#1A9D6F", rank: "Epoch", parent: "Ordovician" },
	
	// Cambrian Period
	{ name: "Cambrian", start: 538.8, end: 485.4, color: "#7FA056", rank: "Period", parent: "Paleozoic" },
	{ name: "Furongian", start: 497.0, end: 485.4, color: "#B3E095", rank: "Epoch", parent: "Cambrian" },
	{ name: "Miaolingian", start: 509.0, end: 497.0, color: "#A6D889", rank: "Epoch", parent: "Cambrian" },
	{ name: "Cambrian Series 2", start: 521.0, end: 509.0, color: "#99CE80", rank: "Epoch", parent: "Cambrian" },
	{ name: "Terreneuvian", start: 538.8, end: 521.0, color: "#8CC47E", rank: "Epoch", parent: "Cambrian" },
	
	// PRECAMBRIAN
	{ name: "Precambrian", start: 4600.0, end: 538.8, color: "#F74370", rank: "Eon" },
	
	// PROTEROZOIC EON
	{ name: "Proterozoic", start: 2500.0, end: 538.8, color: "#F74370", rank: "Eon", parent: "Precambrian" },
	
	// Neoproterozoic Era
	{ name: "Neoproterozoic", start: 1000.0, end: 538.8, color: "#FED96A", rank: "Era", parent: "Proterozoic" },
	{ name: "Ediacaran", start: 635.0, end: 538.8, color: "#FED96A", rank: "Period", parent: "Neoproterozoic" },
	{ name: "Cryogenian", start: 720.0, end: 635.0, color: "#FECC64", rank: "Period", parent: "Neoproterozoic" },
	{ name: "Tonian", start: 1000.0, end: 720.0, color: "#FEBF5E", rank: "Period", parent: "Neoproterozoic" },
	
	// Mesoproterozoic Era
	{ name: "Mesoproterozoic", start: 1600.0, end: 1000.0, color: "#FFB549", rank: "Era", parent: "Proterozoic" },
	{ name: "Stenian", start: 1200.0, end: 1000.0, color: "#FFC846", rank: "Period", parent: "Mesoproterozoic" },
	{ name: "Ectasian", start: 1400.0, end: 1200.0, color: "#FFC140", rank: "Period", parent: "Mesoproterozoic" },
	{ name: "Calymmian", start: 1600.0, end: 1400.0, color: "#FFBA3A", rank: "Period", parent: "Mesoproterozoic" },
	
	// Paleoproterozoic Era
	{ name: "Paleoproterozoic", start: 2500.0, end: 1600.0, color: "#F74370", rank: "Era", parent: "Proterozoic" },
	{ name: "Statherian", start: 1800.0, end: 1600.0, color: "#FFA028", rank: "Period", parent: "Paleoproterozoic" },
	{ name: "Orosirian", start: 2050.0, end: 1800.0, color: "#FF9A26", rank: "Period", parent: "Paleoproterozoic" },
	{ name: "Rhyacian", start: 2300.0, end: 2050.0, color: "#FF9322", rank: "Period", parent: "Paleoproterozoic" },
	{ name: "Siderian", start: 2500.0, end: 2300.0, color: "#FF8C1F", rank: "Period", parent: "Paleoproterozoic" },
	
	// ARCHEAN EON
	{ name: "Archean", start: 4000.0, end: 2500.0, color: "#F0047F", rank: "Eon", parent: "Precambrian" },
	{ name: "Neoarchean", start: 2800.0, end: 2500.0, color: "#FFC0CB", rank: "Era", parent: "Archean" },
	{ name: "Mesoarchean", start: 3200.0, end: 2800.0, color: "#FFA6BA", rank: "Era", parent: "Archean" },
	{ name: "Paleoarchean", start: 3600.0, end: 3200.0, color: "#FF8CA8", rank: "Era", parent: "Archean" },
	{ name: "Eoarchean", start: 4000.0, end: 3600.0, color: "#FF7296", rank: "Era", parent: "Archean" },
	
	// HADEAN EON
	{ name: "Hadean", start: 4600.0, end: 4000.0, color: "#5E374E", rank: "Eon", parent: "Precambrian" },
];

/**
 * Get geological period by name
 */
export function getGeologicalPeriod(name: string): GeologicalPeriod | undefined {
	return GEOLOGICAL_TIME_SCALE.find(p => 
		p.name.toLowerCase() === name.toLowerCase()
	);
}

/**
 * Get all periods of a specific rank
 */
export function getPeriodsByRank(rank: GeologicalPeriod['rank']): GeologicalPeriod[] {
	return GEOLOGICAL_TIME_SCALE.filter(p => p.rank === rank);
}

/**
 * Find which geological period a given Ma (millions of years ago) falls into
 */
export function findPeriodAtTime(ma: number, rank?: GeologicalPeriod['rank']): GeologicalPeriod | undefined {
	const periods = rank ? getPeriodsByRank(rank) : GEOLOGICAL_TIME_SCALE;
	return periods.find(p => ma >= p.end && ma <= p.start);
}

/**
 * Get all child periods of a parent period
 */
export function getChildPeriods(parentName: string): GeologicalPeriod[] {
	return GEOLOGICAL_TIME_SCALE.filter(p => p.parent === parentName);
}

/**
 * Format Ma for display
 */
export function formatMa(ma: number): string {
	if (ma === 0) return "Present";
	if (ma < 1) return `${(ma * 1000).toFixed(1)} Ka`; // thousands of years
	if (ma >= 1000) return `${(ma / 1000).toFixed(2)} Ga`; // billions of years
	return `${ma.toFixed(2)} Ma`;
}
