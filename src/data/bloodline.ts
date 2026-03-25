export interface FamilyNode {
  id: string;
  name: string;
  alias?: string;
  years?: string;
  generation: number;
  parents?: string[];
  spouse?: string[];
  role?: string;
  bio?: string;
  isBloodline?: boolean; 
  isBloodBrother?: boolean;
}

export const bloodlineData: FamilyNode[] = [
  // Generation 1
  {
    id: "amituana_anoai",
    name: "Amituana'i Anoa'i",
    years: "1914–1994",
    generation: 1,
    role: "Patriarch",
    bio: "The foundation of the Anoa'i wrestling dynasty."
  },
  {
    id: "tovaleomanaia_amituanai",
    name: "Tovaleomanaia Amituana'i",
    alias: "Leoso Ripley",
    years: "1920–1988",
    generation: 1,
    spouse: ["amituana_anoai"],
    role: "Matriarch"
  },
  {
    id: "peter_maivia",
    name: "Fanene Anderson",
    alias: "Peter Maivia",
    years: "1937–1982",
    generation: 1,
    isBloodBrother: true,
    role: "High Chief",
    bio: "Blood brother to Amituana'i and patriarch of the Maivia line."
  },
  {
    id: "ofelia_fuataga",
    name: "Ofelia Fuataga",
    years: "1927–2008",
    generation: 1,
    spouse: ["peter_maivia"],
    role: "Grand Matriarch"
  },

  // Generation 2
  {
    id: "afa_anoai_sr",
    name: "Afa Anoa'i Sr.",
    alias: "Afa",
    generation: 2,
    parents: ["amituana_anoai", "tovaleomanaia_amituanai"],
    role: "Wild Samoan",
  },
  {
    id: "lynn_anoai",
    name: "Lynn Anoa'i",
    generation: 2,
    spouse: ["afa_anoai_sr"],
  },
  {
    id: "leati_anoai",
    name: "Leati Amituana'i",
    alias: "Sika Anoa'i",
    generation: 2,
    parents: ["amituana_anoai", "tovaleomanaia_amituanai"],
    isBloodline: true,
    role: "Wild Samoan / Father",
  },
  {
    id: "lisa_anoai_sr",
    name: "Lisa Anoa'i Sr.",
    generation: 2,
    spouse: ["leati_anoai"],
  },
  {
    id: "elevera_anoai",
    name: "Elevera Anoa'i",
    alias: "Vera",
    years: "1947–2008",
    generation: 2,
    parents: ["amituana_anoai", "tovaleomanaia_amituanai"],
    role: "Legacy Bearer"
  },
  {
    id: "solofa_fatu_sr",
    name: "I'aulualo Folau Solofa Fatu Sr.",
    years: "1945–2020",
    generation: 2,
    spouse: ["elevera_anoai"],
  },
  {
    id: "ata_maivia",
    name: "Mataniufeagaimaleata Fitisemanu",
    alias: "Ata Maivia",
    generation: 2,
    parents: ["peter_maivia", "ofelia_fuataga"],
    role: "Legacy Bearer"
  },
  {
    id: "rocky_johnson",
    name: "Rocky Johnson",
    years: "1944–2020",
    generation: 2,
    spouse: ["ata_maivia"],
    role: "Soulman"
  },

  // Generation 3
  {
    id: "roman_reigns",
    name: "Leati Joseph Anoa'i",
    alias: "Roman Reigns",
    generation: 3,
    parents: ["leati_anoai", "lisa_anoai_sr"],
    isBloodline: true,
    role: "The Tribal Chief",
    bio: "The Head of the Table and Undisputed Leader."
  },
  {
    id: "matthew_anoai",
    name: "Matthew Anoa'i",
    alias: "Rosey",
    years: "1970–2017",
    generation: 3,
    parents: ["leati_anoai", "lisa_anoai_sr"],
    role: "S.H.I.T."
  },
  {
    id: "edward_fatu",
    name: "Edward Fatu",
    alias: "Umaga",
    years: "1973–2009",
    generation: 3,
    parents: ["elevera_anoai", "solofa_fatu_sr"],
    role: "Samoan Bulldozer"
  },
  {
    id: "solofa_fatu_jr",
    name: "Solofa Fatu Jr.",
    alias: "Rikishi",
    generation: 3,
    parents: ["elevera_anoai", "solofa_fatu_sr"],
    role: "Hall of Famer"
  },
  {
    id: "talisua_fuavai",
    name: "Talisua Fuavai",
    generation: 3,
    spouse: ["solofa_fatu_jr"],
  },
  {
    id: "dwayne_johnson",
    name: "Dwayne Johnson",
    alias: "The Rock",
    generation: 3,
    parents: ["ata_maivia", "rocky_johnson"],
    isBloodline: true,
    role: "The Final Boss",
    bio: "The High Chief of the Modern Era."
  },
  {
    id: "samuel_fatu",
    name: "Samuel Fatu",
    alias: "Samoan Savage/Tonga Kid",
    generation: 3,
    parents: ["elevera_anoai", "solofa_fatu_sr"],
  },

  // Generation 4
  {
    id: "jacob_fatu",
    name: "Jacob Fatu",
    generation: 4,
    parents: ["samuel_fatu"],
    isBloodline: true,
    role: "The Werewolf / Enforcer",
    bio: "The most dangerous member of the Bloodline."
  },
  {
    id: "jimmy_uso",
    name: "Jonathan Fatu",
    alias: "Jimmy Uso",
    generation: 4,
    parents: ["solofa_fatu_jr", "talisua_fuavai"],
    isBloodline: true,
    role: "The Right Hand Man"
  },
  {
    id: "jey_uso",
    name: "Joshua Fatu",
    alias: "Jey Uso",
    generation: 4,
    parents: ["solofa_fatu_jr", "talisua_fuavai"],
    isBloodline: true,
    role: "Main Event Jey Uso"
  },
  {
    id: "solo_sikoa",
    name: "Joseph Yokozuna Sefa Fatu",
    alias: "Solo Sikoa",
    generation: 4,
    parents: ["solofa_fatu_jr", "talisua_fuavai"],
    isBloodline: true,
    role: "The Enforcer / Tribal Chief aspirant"
  },
  {
    id: "ava",
    name: "Simone Johnson",
    alias: "Ava",
    generation: 4,
    parents: ["dwayne_johnson"],
    role: "NXT GM"
  },
];
