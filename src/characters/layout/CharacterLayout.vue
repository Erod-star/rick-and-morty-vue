<script setup lang="ts">
import { RouterView } from 'vue-router';

import type { RouterLink } from '@/router/link-routes';
import { characterRoute } from '../router/index';

import NavBar from '@/shared/components/NavBar.vue';

console.log(characterRoute.children);

const routeLink: RouterLink[] = characterRoute
  .children!.filter((route) => (route.props as { visible: boolean }).visible)
  .map((route) => {
    return {
      name: route.name as string,
      path: route.path,
      title: (route.props as { title: string }).title
    };
  });
</script>

<template>
  <h1>Characters</h1>
  <NavBar :links="routeLink" :show-icon="false" />

  <!-- RouterView + Suspense -->

  <RouterView />
</template>

<style scoped></style>
