<template>
  <div class="flex flex-col w-full justify-center items-center">
    <h1 class="text-5xl text-blue-500 font-teko font-semi mt-4">
      {{ this.countryData.nameCom }}
    </h1>
    <div class="text-lg">
      <div class="w-full flex flex-row items-start justify-between leading-5">
        <p>Official name:</p>
        <p class="text-right font-semibold">{{ this.countryData.nameOff }}</p>
      </div>
      <div class="w-full h-auto flex justify-between items-center leading-5">
        Native Names:
        <div class="flex flex-col">
          <div
            v-for="(nativeName, key) in this.countryData.nameNative"
            :key="key"
            class="text-right mb-[2px]"
          >
            <div v-if="key < 5" class="mb-1 font-semibold">
              {{ nativeName }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-full h-auto flex justify-between items-center leading-5">
        <p>Capital(s):</p>
        <div class="flex flex-col text-right font-semibold">
          <div
            v-for="(capital, key) in this.countryData.capital"
            :key="key"
            class="mb-1"
          >
            {{ capital }}
          </div>
        </div>
      </div>

      <div class="w-full flex flex-row items-start justify-between leading-5">
        <p>Population</p>
        <p class="font-semibold">{{ this.countryData.pop }}</p>
      </div>

      <div class="w-full flex items-center justify-around mb-4">
        <img
          class="h-[35%] w-[35%] rounded-md border border-black/20"
          :src="countryData.flag"
          alt="country flag"
        />
        <img
          class="h-[30%] w-[30%]"
          :src="countryData.coa"
          alt="country emblem"
        />
      </div>
    </div>
    <!--     <router-link :to="{ name: 'hello', params: { code: countryCode } }">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        go to {{ country }} page
      </button>
    </router-link> -->
  </div>
</template>

<script>
export default {
  props: ["countryData", "country", "countryCode"],
};
</script>

<style></style>
