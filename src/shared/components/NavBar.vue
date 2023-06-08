<script lang="ts">
import type { RouterLink } from '../../router/link-routes';

interface Props {
  title?: string;
  links: RouterLink[];
  showIcon?: boolean;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  showIcon: true
});
</script>

<template>
  <nav>
    <img v-if="props.showIcon" src="@/assets/logo.svg" alt="Vue Logo" height="25" width="25" />
    <span v-if="props.title">{{ props.title }}</span>
    <RouterLink v-for="link of props.links" :key="link.path" :to="link.path">
      {{ link.title }}
    </RouterLink>

    <!-- <RouterLink to="/"> Home </RouterLink>
    <RouterLink to="/about"> About </RouterLink> -->
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
}

img {
  margin-right: 15px;
}

span {
  margin-right: 15px;
}

a {
  margin-right: 15px;
}
</style>
