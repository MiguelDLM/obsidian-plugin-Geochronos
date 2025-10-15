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
	rank: 'Supereon' | 'Eon' | 'Era' | 'Period' | 'Epoch' | 'Stage' | 'Age';
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
	{ name: "Meghalayan", start: 0.0042, end: 0, color: "#FDEDEC", rank: "Stage", parent: "Holocene" },
	{ name: "Northgrippian", start: 0.0082, end: 0.0042, color: "#FDEEE5", rank: "Stage", parent: "Holocene" },
	{ name: "Greenlandian", start: 0.0117, end: 0.0082, color: "#FEF2E9", rank: "Stage", parent: "Holocene" },
	{ name: "Pleistocene", start: 2.58, end: 0.0117, color: "#FFF2AE", rank: "Epoch", parent: "Quaternary" },
	{ name: "Upper Pleistocene", start: 0.129, end: 0.0117, color: "#FFF2AE", rank: "Stage", parent: "Pleistocene" },
	{ name: "Middle Pleistocene", start: 0.774, end: 0.129, color: "#FFF2AE", rank: "Stage", parent: "Pleistocene" },
	{ name: "Calabrian", start: 1.8, end: 0.774, color: "#FFF2AE", rank: "Stage", parent: "Pleistocene" },
	{ name: "Gelasian", start: 2.58, end: 1.8, color: "#FFF2AE", rank: "Stage", parent: "Pleistocene" },
	
	// Neogene Period
	{ name: "Neogene", start: 23.03, end: 2.58, color: "#FFE619", rank: "Period", parent: "Cenozoic" },
	{ name: "Pliocene", start: 5.333, end: 2.58, color: "#FFFFB3", rank: "Epoch", parent: "Neogene" },
	{ name: "Piacenzian", start: 3.6, end: 2.58, color: "#FFFFB3", rank: "Stage", parent: "Pliocene" },
	{ name: "Zanclean", start: 5.333, end: 3.6, color: "#FFFFB3", rank: "Stage", parent: "Pliocene" },
	{ name: "Miocene", start: 23.03, end: 5.333, color: "#FFFF00", rank: "Epoch", parent: "Neogene" },
	{ name: "Messinian", start: 7.246, end: 5.333, color: "#FFFF00", rank: "Stage", parent: "Miocene" },
	{ name: "Tortonian", start: 11.63, end: 7.246, color: "#FFFF00", rank: "Stage", parent: "Miocene" },
	{ name: "Serravallian", start: 13.82, end: 11.63, color: "#FFFF00", rank: "Stage", parent: "Miocene" },
	{ name: "Langhian", start: 15.97, end: 13.82, color: "#FFFF00", rank: "Stage", parent: "Miocene" },
	{ name: "Burdigalian", start: 20.44, end: 15.97, color: "#FFFF00", rank: "Stage", parent: "Miocene" },
	{ name: "Aquitanian", start: 23.03, end: 20.44, color: "#FFFF00", rank: "Stage", parent: "Miocene" },
	
	// Paleogene Period
	{ name: "Paleogene", start: 66.0, end: 23.03, color: "#FD9A52", rank: "Period", parent: "Cenozoic" },
	{ name: "Oligocene", start: 33.9, end: 23.03, color: "#FEC574", rank: "Epoch", parent: "Paleogene" },
	{ name: "Chattian", start: 27.82, end: 23.03, color: "#FEC574", rank: "Stage", parent: "Oligocene" },
	{ name: "Rupelian", start: 33.9, end: 27.82, color: "#FEC574", rank: "Stage", parent: "Oligocene" },
	{ name: "Eocene", start: 56.0, end: 33.9, color: "#FDC07A", rank: "Epoch", parent: "Paleogene" },
	{ name: "Priabonian", start: 37.71, end: 33.9, color: "#FDC07A", rank: "Stage", parent: "Eocene" },
	{ name: "Bartonian", start: 41.2, end: 37.71, color: "#FDC07A", rank: "Stage", parent: "Eocene" },
	{ name: "Lutetian", start: 47.8, end: 41.2, color: "#FDC07A", rank: "Stage", parent: "Eocene" },
	{ name: "Ypresian", start: 56.0, end: 47.8, color: "#FDC07A", rank: "Stage", parent: "Eocene" },
	{ name: "Paleocene", start: 66.0, end: 56.0, color: "#FDA75F", rank: "Epoch", parent: "Paleogene" },
	{ name: "Thanetian", start: 59.2, end: 56.0, color: "#FDA75F", rank: "Stage", parent: "Paleocene" },
	{ name: "Selandian", start: 61.6, end: 59.2, color: "#FDA75F", rank: "Stage", parent: "Paleocene" },
	{ name: "Danian", start: 66.0, end: 61.6, color: "#FDA75F", rank: "Stage", parent: "Paleocene" },
	
	// MESOZOIC ERA
	{ name: "Mesozoic", start: 251.902, end: 66.0, color: "#67C5CA", rank: "Era", parent: "Phanerozoic" },
	
	// Cretaceous Period
	{ name: "Cretaceous", start: 145.0, end: 66.0, color: "#7FC64E", rank: "Period", parent: "Mesozoic" },
	{ name: "Upper Cretaceous", start: 100.5, end: 66.0, color: "#A6D84A", rank: "Epoch", parent: "Cretaceous" },
	{ name: "Lower Cretaceous", start: 145.0, end: 100.5, color: "#8CCD57", rank: "Epoch", parent: "Cretaceous" },
	{ name: "Maastrichtian", start: 72.1, end: 66.0, color: "#A6D84A", rank: "Stage", parent: "Upper Cretaceous" },
	{ name: "Campanian", start: 83.6, end: 72.1, color: "#A6D84A", rank: "Stage", parent: "Upper Cretaceous" },
	{ name: "Santonian", start: 86.3, end: 83.6, color: "#A6D84A", rank: "Stage", parent: "Upper Cretaceous" },
	{ name: "Coniacian", start: 89.8, end: 86.3, color: "#A6D84A", rank: "Stage", parent: "Upper Cretaceous" },
	{ name: "Turonian", start: 93.9, end: 89.8, color: "#A6D84A", rank: "Stage", parent: "Upper Cretaceous" },
	{ name: "Cenomanian", start: 100.5, end: 93.9, color: "#A6D84A", rank: "Stage", parent: "Upper Cretaceous" },
	{ name: "Albian", start: 113.0, end: 100.5, color: "#8CCD57", rank: "Stage", parent: "Lower Cretaceous" },
	{ name: "Aptian", start: 125.0, end: 113.0, color: "#8CCD57", rank: "Stage", parent: "Lower Cretaceous" },
	{ name: "Barremian", start: 129.4, end: 125.0, color: "#8CCD57", rank: "Stage", parent: "Lower Cretaceous" },
	{ name: "Hauterivian", start: 132.9, end: 129.4, color: "#8CCD57", rank: "Stage", parent: "Lower Cretaceous" },
	{ name: "Valanginian", start: 139.8, end: 132.9, color: "#8CCD57", rank: "Stage", parent: "Lower Cretaceous" },
	{ name: "Berriasian", start: 145.0, end: 139.8, color: "#8CCD57", rank: "Stage", parent: "Lower Cretaceous" },
	
	// Jurassic Period
	{ name: "Jurassic", start: 201.3, end: 145.0, color: "#34B2C9", rank: "Period", parent: "Mesozoic" },
	{ name: "Upper Jurassic", start: 163.5, end: 145.0, color: "#B3E1E6", rank: "Epoch", parent: "Jurassic" },
	{ name: "Middle Jurassic", start: 174.1, end: 163.5, color: "#80CED7", rank: "Epoch", parent: "Jurassic" },
	{ name: "Lower Jurassic", start: 201.3, end: 174.1, color: "#66C2D7", rank: "Epoch", parent: "Jurassic" },
	{ name: "Tithonian", start: 152.1, end: 145.0, color: "#B3E1E6", rank: "Stage", parent: "Upper Jurassic" },
	{ name: "Kimmeridgian", start: 157.3, end: 152.1, color: "#B3E1E6", rank: "Stage", parent: "Upper Jurassic" },
	{ name: "Oxfordian", start: 163.5, end: 157.3, color: "#B3E1E6", rank: "Stage", parent: "Upper Jurassic" },
	{ name: "Callovian", start: 166.1, end: 163.5, color: "#80CED7", rank: "Stage", parent: "Middle Jurassic" },
	{ name: "Bathonian", start: 168.3, end: 166.1, color: "#80CED7", rank: "Stage", parent: "Middle Jurassic" },
	{ name: "Bajocian", start: 170.9, end: 168.3, color: "#80CED7", rank: "Stage", parent: "Middle Jurassic" },
	{ name: "Aalenian", start: 174.1, end: 170.9, color: "#80CED7", rank: "Stage", parent: "Middle Jurassic" },
	{ name: "Toarcian", start: 182.7, end: 174.1, color: "#66C2D7", rank: "Stage", parent: "Lower Jurassic" },
	{ name: "Pliensbachian", start: 190.8, end: 182.7, color: "#66C2D7", rank: "Stage", parent: "Lower Jurassic" },
	{ name: "Sinemurian", start: 199.5, end: 190.8, color: "#66C2D7", rank: "Stage", parent: "Lower Jurassic" },
	{ name: "Hettangian", start: 201.3, end: 199.5, color: "#66C2D7", rank: "Stage", parent: "Lower Jurassic" },
	
	// Triassic Period
	{ name: "Triassic", start: 251.902, end: 201.3, color: "#812B92", rank: "Period", parent: "Mesozoic" },
	{ name: "Upper Triassic", start: 237.0, end: 201.3, color: "#B051C5", rank: "Epoch", parent: "Triassic" },
	{ name: "Middle Triassic", start: 247.2, end: 237.0, color: "#B051C5", rank: "Epoch", parent: "Triassic" },
	{ name: "Lower Triassic", start: 251.902, end: 247.2, color: "#983999", rank: "Epoch", parent: "Triassic" },
	{ name: "Rhaetian", start: 208.5, end: 201.3, color: "#B051C5", rank: "Stage", parent: "Upper Triassic" },
	{ name: "Norian", start: 227.0, end: 208.5, color: "#B051C5", rank: "Stage", parent: "Upper Triassic" },
	{ name: "Carnian", start: 237.0, end: 227.0, color: "#B051C5", rank: "Stage", parent: "Upper Triassic" },
	{ name: "Ladinian", start: 242.0, end: 237.0, color: "#B051C5", rank: "Stage", parent: "Middle Triassic" },
	{ name: "Anisian", start: 247.2, end: 242.0, color: "#B051C5", rank: "Stage", parent: "Middle Triassic" },
	{ name: "Olenekian", start: 251.2, end: 247.2, color: "#983999", rank: "Stage", parent: "Lower Triassic" },
	{ name: "Induan", start: 251.902, end: 251.2, color: "#983999", rank: "Stage", parent: "Lower Triassic" },
	
	// PALEOZOIC ERA
	{ name: "Paleozoic", start: 538.8, end: 251.902, color: "#99C08D", rank: "Era", parent: "Phanerozoic" },
	
	// Permian Period
	{ name: "Permian", start: 298.9, end: 251.902, color: "#F04028", rank: "Period", parent: "Paleozoic" },
	{ name: "Lopingian", start: 259.1, end: 251.902, color: "#FBA794", rank: "Epoch", parent: "Permian" },
	{ name: "Guadalupian", start: 272.95, end: 259.1, color: "#FB745D", rank: "Epoch", parent: "Permian" },
	{ name: "Cisuralian", start: 298.9, end: 272.95, color: "#EF5845", rank: "Epoch", parent: "Permian" },
	{ name: "Changhsingian", start: 254.14, end: 251.902, color: "#FBA794", rank: "Stage", parent: "Lopingian" },
	{ name: "Wuchiapingian", start: 259.51, end: 254.14, color: "#FBA794", rank: "Stage", parent: "Lopingian" },
	{ name: "Capitanian", start: 264.28, end: 259.51, color: "#FB745D", rank: "Stage", parent: "Guadalupian" },
	{ name: "Wordian", start: 268.8, end: 264.28, color: "#FB745D", rank: "Stage", parent: "Guadalupian" },
	{ name: "Roadian", start: 272.95, end: 268.8, color: "#FB745D", rank: "Stage", parent: "Guadalupian" },
	{ name: "Kungurian", start: 283.5, end: 272.95, color: "#EF5845", rank: "Stage", parent: "Cisuralian" },
	{ name: "Artinskian", start: 290.1, end: 283.5, color: "#EF5845", rank: "Stage", parent: "Cisuralian" },
	{ name: "Sakmarian", start: 293.52, end: 290.1, color: "#EF5845", rank: "Stage", parent: "Cisuralian" },
	{ name: "Asselian", start: 298.9, end: 293.52, color: "#EF5845", rank: "Stage", parent: "Cisuralian" },
	
	// Carboniferous Period
	{ name: "Carboniferous", start: 358.9, end: 298.9, color: "#67A599", rank: "Period", parent: "Paleozoic" },
	{ name: "Pennsylvanian", start: 323.2, end: 298.9, color: "#99C2B8", rank: "Epoch", parent: "Carboniferous" },
	{ name: "Mississippian", start: 358.9, end: 323.2, color: "#8CB06C", rank: "Epoch", parent: "Carboniferous" },
	{ name: "Gzhelian", start: 303.7, end: 298.9, color: "#99C2B8", rank: "Stage", parent: "Pennsylvanian" },
	{ name: "Kasimovian", start: 307.0, end: 303.7, color: "#99C2B8", rank: "Stage", parent: "Pennsylvanian" },
	{ name: "Moscovian", start: 315.2, end: 307.0, color: "#99C2B8", rank: "Stage", parent: "Pennsylvanian" },
	{ name: "Bashkirian", start: 323.2, end: 315.2, color: "#99C2B8", rank: "Stage", parent: "Pennsylvanian" },
	{ name: "Serpukhovian", start: 330.9, end: 323.2, color: "#8CB06C", rank: "Stage", parent: "Mississippian" },
	{ name: "Visean", start: 346.7, end: 330.9, color: "#8CB06C", rank: "Stage", parent: "Mississippian" },
	{ name: "Tournaisian", start: 358.9, end: 346.7, color: "#8CB06C", rank: "Stage", parent: "Mississippian" },
	
	// Devonian Period
	{ name: "Devonian", start: 419.2, end: 358.9, color: "#CB8C37", rank: "Period", parent: "Paleozoic" },
	{ name: "Upper Devonian", start: 382.7, end: 358.9, color: "#F1D281", rank: "Epoch", parent: "Devonian" },
	{ name: "Middle Devonian", start: 393.3, end: 382.7, color: "#F1C96B", rank: "Epoch", parent: "Devonian" },
	{ name: "Lower Devonian", start: 419.2, end: 393.3, color: "#E5B75A", rank: "Epoch", parent: "Devonian" },
	{ name: "Famennian", start: 372.2, end: 358.9, color: "#F1D281", rank: "Stage", parent: "Upper Devonian" },
	{ name: "Frasnian", start: 382.7, end: 372.2, color: "#F1D281", rank: "Stage", parent: "Upper Devonian" },
	{ name: "Givetian", start: 387.7, end: 382.7, color: "#F1C96B", rank: "Stage", parent: "Middle Devonian" },
	{ name: "Eifelian", start: 393.3, end: 387.7, color: "#F1C96B", rank: "Stage", parent: "Middle Devonian" },
	{ name: "Emsian", start: 407.6, end: 393.3, color: "#E5B75A", rank: "Stage", parent: "Lower Devonian" },
	{ name: "Pragian", start: 410.8, end: 407.6, color: "#E5B75A", rank: "Stage", parent: "Lower Devonian" },
	{ name: "Lochkovian", start: 419.2, end: 410.8, color: "#E5B75A", rank: "Stage", parent: "Lower Devonian" },
	
	// Silurian Period
	{ name: "Silurian", start: 443.8, end: 419.2, color: "#B3E1B6", rank: "Period", parent: "Paleozoic" },
	{ name: "Pridoli", start: 423.0, end: 419.2, color: "#E6F5E1", rank: "Epoch", parent: "Silurian" },
	{ name: "Ludlow", start: 427.4, end: 423.0, color: "#D9EFD7", rank: "Epoch", parent: "Silurian" },
	{ name: "Wenlock", start: 433.4, end: 427.4, color: "#CCE9CD", rank: "Epoch", parent: "Silurian" },
	{ name: "Llandovery", start: 443.8, end: 433.4, color: "#BFE3C3", rank: "Epoch", parent: "Silurian" },
	{ name: "Pridoli Stage", start: 423.0, end: 419.2, color: "#E6F5E1", rank: "Stage", parent: "Pridoli" },
	{ name: "Ludfordian", start: 425.6, end: 423.0, color: "#D9EFD7", rank: "Stage", parent: "Ludlow" },
	{ name: "Gorstian", start: 427.4, end: 425.6, color: "#D9EFD7", rank: "Stage", parent: "Ludlow" },
	{ name: "Homerian", start: 430.5, end: 427.4, color: "#CCE9CD", rank: "Stage", parent: "Wenlock" },
	{ name: "Sheinwoodian", start: 433.4, end: 430.5, color: "#CCE9CD", rank: "Stage", parent: "Wenlock" },
	{ name: "Telychian", start: 438.5, end: 433.4, color: "#BFE3C3", rank: "Stage", parent: "Llandovery" },
	{ name: "Aeronian", start: 440.8, end: 438.5, color: "#BFE3C3", rank: "Stage", parent: "Llandovery" },
	{ name: "Rhuddanian", start: 443.8, end: 440.8, color: "#BFE3C3", rank: "Stage", parent: "Llandovery" },
	
	// Ordovician Period
	{ name: "Ordovician", start: 485.4, end: 443.8, color: "#009270", rank: "Period", parent: "Paleozoic" },
	{ name: "Upper Ordovician", start: 458.4, end: 443.8, color: "#5EB27E", rank: "Epoch", parent: "Ordovician" },
	{ name: "Middle Ordovician", start: 470.0, end: 458.4, color: "#3FA755", rank: "Epoch", parent: "Ordovician" },
	{ name: "Lower Ordovician", start: 485.4, end: 470.0, color: "#1A9D6F", rank: "Epoch", parent: "Ordovician" },
	{ name: "Hirnantian", start: 445.2, end: 443.8, color: "#5EB27E", rank: "Stage", parent: "Upper Ordovician" },
	{ name: "Katian", start: 453.0, end: 445.2, color: "#5EB27E", rank: "Stage", parent: "Upper Ordovician" },
	{ name: "Sandbian", start: 458.4, end: 453.0, color: "#5EB27E", rank: "Stage", parent: "Upper Ordovician" },
	{ name: "Darriwilian", start: 467.3, end: 458.4, color: "#3FA755", rank: "Stage", parent: "Middle Ordovician" },
	{ name: "Dapingian", start: 470.0, end: 467.3, color: "#3FA755", rank: "Stage", parent: "Middle Ordovician" },
	{ name: "Floian", start: 477.7, end: 470.0, color: "#1A9D6F", rank: "Stage", parent: "Lower Ordovician" },
	{ name: "Tremadocian", start: 485.4, end: 477.7, color: "#1A9D6F", rank: "Stage", parent: "Lower Ordovician" },
	
	// Cambrian Period
	{ name: "Cambrian", start: 538.8, end: 485.4, color: "#7FA056", rank: "Period", parent: "Paleozoic" },
	{ name: "Furongian", start: 497.0, end: 485.4, color: "#B3E095", rank: "Epoch", parent: "Cambrian" },
	{ name: "Miaolingian", start: 509.0, end: 497.0, color: "#A6D889", rank: "Epoch", parent: "Cambrian" },
	{ name: "Cambrian Series 2", start: 521.0, end: 509.0, color: "#99CE80", rank: "Epoch", parent: "Cambrian" },
	{ name: "Terreneuvian", start: 538.8, end: 521.0, color: "#8CC47E", rank: "Epoch", parent: "Cambrian" },
	{ name: "Cambrian Stage 10", start: 489.5, end: 485.4, color: "#B3E095", rank: "Stage", parent: "Furongian" },
	{ name: "Jiangshanian", start: 494.0, end: 489.5, color: "#B3E095", rank: "Stage", parent: "Furongian" },
	{ name: "Paibian", start: 497.0, end: 494.0, color: "#B3E095", rank: "Stage", parent: "Furongian" },
	{ name: "Guzhangian", start: 500.5, end: 497.0, color: "#A6D889", rank: "Stage", parent: "Miaolingian" },
	{ name: "Drumian", start: 504.5, end: 500.5, color: "#A6D889", rank: "Stage", parent: "Miaolingian" },
	{ name: "Cambrian Stage 5", start: 509.0, end: 504.5, color: "#A6D889", rank: "Stage", parent: "Miaolingian" },
	{ name: "Cambrian Stage 4", start: 514.0, end: 509.0, color: "#99CE80", rank: "Stage", parent: "Cambrian Series 2" },
	{ name: "Cambrian Stage 3", start: 521.0, end: 514.0, color: "#99CE80", rank: "Stage", parent: "Cambrian Series 2" },
	{ name: "Cambrian Stage 2", start: 529.0, end: 521.0, color: "#8CC47E", rank: "Stage", parent: "Terreneuvian" },
	{ name: "Fortunian", start: 538.8, end: 529.0, color: "#8CC47E", rank: "Stage", parent: "Terreneuvian" },
	
	// PRECAMBRIAN (Supereon)
	{ name: "Precambrian", start: 4600.0, end: 538.8, color: "#F74370", rank: "Supereon" },
	
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
