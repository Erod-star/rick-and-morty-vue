import type { RouteRecordRaw } from 'vue-router';

import CharacterLayout from '@/characters/layout/CharacterLayout.vue';
import CharacterId from '@/characters/pages/CharacterId.vue';
import CharacterList from '../pages/CharacterList.vue';
import CharacterSearch from '../pages/CharacterSearch.vue';

export const characterRoute: RouteRecordRaw = {
  path: '/characters',
  redirect: '/characters/list',
  component: CharacterLayout,
  children: [
    {
      path: 'by/id',
      name: 'character-id',
      props: { title: 'Character by id', visible: false },
      component: CharacterId
    },
    {
      path: 'list',
      name: 'character-list',
      props: { title: 'List of the wabalubadubdubverse', visible: true },
      component: CharacterList
    },
    {
      path: 'search',
      name: 'character-search',
      props: { title: 'Search page', visible: true },
      component: CharacterSearch
    }
  ]
};
