<template>
  <div
    class="h-screen absolute w-full z-10 flex justify-center items-start pt-[125px] bg-black/50"
  >
    <div
      class="flex flex-col justify-center items-center bg-white w-[80%] h-auto sm:w-[450px] px-6 py-4 rounded-md"
    >
      <h1 class="text-5xl text-blue-500 font-teko font-semi pb-4">
        {{ this.countryData.nameCom }}
      </h1>
      <div class="w-full flex flex-row items-start justify-between leading-5">
        <p>Official name:</p>
        <p class="text-right">{{ this.countryData.nameOff }}</p>
      </div>
      <div
        class="w-full h-auto flex justify-between items-center my-2 leading-5"
      >
        Native Names:
        <div class="flex flex-col">
          <div
            v-for="(nativeName, key) in this.countryData.nameNative"
            :key="key"
            class="text-right"
          >
            {{ nativeName }}
          </div>
        </div>
      </div>

      <div
        class="w-full h-auto flex justify-between items-center mb-2 leading-5"
      >
        <p>Capital(s):</p>
        <div class="flex flex-col text-right">
          <div v-for="(capital, key) in this.countryData.capital" :key="key">
            {{ capital }}
          </div>
        </div>
      </div>

      <div
        class="w-full flex flex-row items-start justify-between leading-5 mb-2"
      >
        <p>Population</p>
        <p>{{ this.countryData.pop }}</p>
      </div>

      <div class="w-full flex items-center justify-around my-3">
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

      <button
        @click="close"
        class="py-2 px-4 bg-red-500 text-white rounded-md text-sm"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["countryData"],
  methods: {
    close() {
      this.$emit("closeModal");
    },
  },
};
</script>
