import { defineStore } from "pinia";

export const getCountryName = defineStore("name", {
  state: () => ({ name: "country" }),
  actions: {
    change(newName) {
      this.name = newName;
    },
  },
});
