<script lang="ts">
interface Props {
  title: string;
  visible: boolean;
}
</script>

<script setup lang="ts">
import CardList from '../components/CardList.vue';
import useCaracters from '@/characters/composables/useCharacters';

const props = defineProps<Props>();
const { isLoading, hasError, errorMessage, characters, count } = useCaracters();
</script>

<template>
  <section v-if="isLoading">
    <h2>Loading...</h2>
    <img src="https://media.tenor.com/fjdydcAjFo8AAAAj/capoo-blue.gif" alt="loader" />
  </section>

  <section v-else-if="hasError">
    <h2>{{ errorMessage }}</h2>
  </section>

  <template v-else>
    <h2>{{ props.title }} - ({{ count }})</h2>
    <CardList :characters="characters" />
  </template>
</template>

<style scoped></style>
