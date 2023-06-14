import { reactive } from 'vue';
import rickAndMortyApi from '@/api/rickAndMorty';

import type { Character } from '@/characters/interfaces/character';
import type { CharactersRequest } from '../characters/interfaces/character';

interface Store {
  characters: {
    count: number;
    errorMessage: string | null;
    hasError: boolean;
    isLoading: boolean;
    list: Character[];
  };
  ids: {
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
    list: {
      [id: string]: Character;
    };
  };

  // Characters methods
  startLoadingCharacters: () => void;
  loadedCharacters: (data: Character[]) => void;
  loadCharactersFailed: (error: string) => void;

  // Character by id methods
  startLoadingCharacter: () => void;
  loadedCharacter: (character: Character) => void;
  checkIdInStore: (id: string) => boolean;
}

// ? Initial state
const charactersStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: []
  },
  ids: {
    list: {},
    isLoading: false,
    hasError: false,
    errorMessage: null
  },

  // Characters methods
  async startLoadingCharacters() {
    try {
      const { data } = await rickAndMortyApi.get<CharactersRequest>('/character');
      this.loadedCharacters(data.results);
    } catch (error) {
      return this.loadCharactersFailed(`${error}`);
    }
  },
  loadedCharacters(data: Character[]) {
    this.characters = {
      count: data.length,
      errorMessage: null,
      hasError: false,
      isLoading: false,
      list: data
    };
  },
  loadCharactersFailed(error: string) {
    this.characters = {
      count: 0,
      errorMessage: error,
      hasError: true,
      isLoading: false,
      list: []
    };
  },

  // Character by id methods
  startLoadingCharacter() {
    this.ids = {
      ...this.ids,
      isLoading: true,
      hasError: false,
      errorMessage: null
    };
  },
  loadedCharacter(character: Character) {
    this.ids.isLoading = false;
    this.ids.list[character.id] = character;
  },
  checkIdInStore(id: string) {
    // if(this.ids.list[id]) return true
    // return false;
    return !!this.ids.list[id];
  }
});

export default charactersStore;
