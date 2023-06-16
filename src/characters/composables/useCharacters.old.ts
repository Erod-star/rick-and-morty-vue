import { onMounted, ref } from 'vue';
import axios from 'axios';

import rickAndMortyApi from '@/api/rickAndMorty';
import type { Character, CharactersRequest } from '../interfaces/character';

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharactersOld = () => {
  const loadCharacters = async () => {
    if (characters.value.length > 0) return;
    isLoading.value = true;
    try {
      const { data } = await rickAndMortyApi.get<CharactersRequest>('/character');
      characters.value = data.results;
    } catch (error) {
      hasError.value = true;

      if (axios.isAxiosError(error)) {
        return (errorMessage.value = error.message);
      }
      errorMessage.value = JSON.stringify(error);
    }
    isLoading.value = false;
  };

  // ? Lyfecicle hooks
  onMounted(async () => {
    await loadCharacters();
  });

  return {
    characters,
    isLoading,
    hasError,
    errorMessage
  };
};

// export default useCaracters
