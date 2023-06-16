import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';

import rickAndMortyApi from '@/api/rickAndMorty';
import type { Character } from '@/characters/interfaces/character';

const characterSet = ref<{ [id: string]: Character }>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (id: string): Promise<Character> => {
  if (characterSet.value[id]) return characterSet.value[id];

  try {
    const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const loadedCharacter = (character: Character) => {
  hasError.value = false;
  errorMessage.value = null;

  characterSet.value[character.id] = character;
};

const onLoadedCharacter = (error: string) => {
  errorMessage.value = error;
  hasError.value = true;
};

const useCharacter = (id: string) => {
  const { isLoading } = useQuery([`characters/${id}`], () => getCharacter(id), {
    onSuccess: loadedCharacter,
    onError: onLoadedCharacter
  });

  return {
    // ? Properties
    list: characterSet,
    hasError,
    errorMessage,
    isLoading,

    // ? Getters
    character: computed<Character | null>(() => characterSet.value[id]),
    formattedEpisodes: computed<string[] | null>(() =>
      characterSet.value[id].episode.map((path) => path.split('/')[5])
    )

    // ? Methods
  };
};

export default useCharacter;
