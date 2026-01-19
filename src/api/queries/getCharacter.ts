import { gql, useQuery } from "@apollo/client";
import type { CharacterQueryResponse } from "@/api/types";

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
      }
    }
  }
`;

export const useCharacter = (id: string) => {
  const { data, loading, error } = useQuery<CharacterQueryResponse>(GET_CHARACTER, {
    variables: { id },
    skip: !id,
  });

  return {
    character: data?.character ?? null,
    loading,
    error,
  };
};
