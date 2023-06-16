import { computed, ref } from 'vue';
import rickAndMortyApi from '@/api/rickAndMorty';

import type { CharactersRequest, Character } from '@/characters/interfaces/character';
import { useQuery } from '@tanstack/vue-query';

const characters = ref<Character[]>([]);
const errorMessage = ref<string | null>(null);
const hasError = ref<boolean>(false);

const getCharacters = async (): Promise<Character[]> => {
  if (characters.value.length > 0) return characters.value;

  const { data } = await rickAndMortyApi.get<CharactersRequest>('/character');
  return data.results;
};

const loadedCharacters = (data: Character[]) => {
  hasError.value = false;
  errorMessage.value = null;
  characters.value = data;
};

const loadCharactersFailed = (error: string) => {
  characters.value = [];
  errorMessage.value = error;
  hasError.value = true;
};

// ? ========= Composable ==================
const useCharacters = () => {
  const { isLoading } = useQuery(['characters'], getCharacters, {
    onSuccess: loadedCharacters,
    onError(error) {
      loadCharactersFailed(`${error}`);
    }
  });

  return {
    // ? Properties
    characters,
    errorMessage,
    hasError,
    isLoading,

    // ? Getters
    count: computed(() => characters.value.length)

    // ? Methods
  };
};

export default useCharacters;
