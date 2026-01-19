import { gql, useQuery } from "@apollo/client";
import type { CharactersQueryResponse, CharacterFilter } from "@/api/types";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }
`;

interface UseCharactersParams {
  page?: number;
  filter?: CharacterFilter;
}

export const useCharacters = ({ page = 1, filter }: UseCharactersParams = {}) => {
  const { data, previousData, loading, error } = useQuery<CharactersQueryResponse>(GET_CHARACTERS, {
    variables: { page, filter },
    fetchPolicy: "cache-first",
  });

  const currentData = data ?? previousData;

  return {
    characters: currentData?.characters.results ?? [],
    pageInfo: currentData?.characters.info ?? null,
    loading,
    error,
  };
};
