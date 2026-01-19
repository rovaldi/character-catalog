// domain entities
export interface Character {
  id: string;
  name: string;
  image: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  episode: Episode[];
  created: string;
}

export interface Location {
  id?: string;
  name: string;
  dimension?: string;
}

export interface Episode {
  id: string;
  name: string;
  episode: string;
}

// domain enums
export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

// API filters
export interface CharacterFilter {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  gender?: CharacterGender;
}

// GraphQL responses
export interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersQueryResponse {
  characters: {
    info: PageInfo;
    results: Character[];
  };
}

export interface CharacterQueryResponse {
  character: Character;
}
