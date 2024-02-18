<script setup>
import axios from "axios";
import { onMounted, defineProps, toRef } from "vue";
import { getCountryName } from "../app/store";

const store = getCountryName();
const props = defineProps({
  code: String,
});

const leagues = toRef([]);

onMounted(async () => {
  const code = toRef(props.code);
  const data = await axios.get(
    `http://localhost:3555/api/country/${code.value}/league`
  );
  leagues.value = data.data;
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center text-center h-screen w-screen"
  >
    <h1 class="text-9xl">Football leagues of {{ store.name }}</h1>
    <div class="w-full flex flex-row justify-around items-center">
      <div v-for="(league, key) in leagues" :key="key">
        <img :src="league.logo" alt="League logo" />
      </div>
    </div>
    <router-link :to="{ name: 'home' }">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Return to map
      </button>
    </router-link>
  </div>
</template>

<style></style>
