<template>
  <div class="h-screen relative">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="[28.1632395923063, 2.63238813336793]"
      :options="mapOptions"
    >
      <l-tile-layer
        :url="url"
        layer-type="base"
        name="OpenStreetMap"
        :options="tileOptions"
      ></l-tile-layer>
      <l-geo-json
        :geojson="geoJson"
        :options="geoJsonOptions"
        :optionsStyle="geoJsonOptionStyle"
      >
        <l-popup>
          <CountryPopUpVue
            :countryData="countryData"
            :country="country"
            :countryCode="countryCode"
          />
        </l-popup>
      </l-geo-json>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson, LPopup } from "@vue-leaflet/vue-leaflet";
import { countries } from "../data/index";
import axios from "axios";
import CountryPopUpVue from "../components/CountryPopUp.vue";
import { onMounted, ref } from "vue";
import { getCountryName } from "../app/store";

export default {
  name: "HomeView",
  components: { LMap, LTileLayer, LGeoJson, LPopup, CountryPopUpVue },
  computed: {
    country() {
      return getCountryName().name;
    },
  },
  setup() {
    const zoom = ref(4);
    const countryData = ref([]);
    const countryCode = ref("");
    const url = ref(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`
    );
    const mapOptions = ref({
      doubleClickZoom: false,
      worldCopyJump: false,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      maxBoundsViscosity: 1.0,
    });
    const tileOptions = ref({
      maxZoom: 7,
      minZoom: 2,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: process.env.VUE_APP_API_KEY,
      worldCopyJump: false,
      doubleClickZoom: false,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      maxBoundsViscosity: 1.0,
    });
    const geoJson = ref(countries);
    const geoJsonOptionStyle = ref({
      opacity: 1,
      weight: 1,
      fillOpacity: 0,
    });
    const geoJsonOptions = ref({
      onEachFeature: function onEachFeature(feature, layer) {
        layer.on("click", async (e) => {
          let code = e.target.feature.properties.ISO_A3;
          const admin = e.target.feature.properties.ADMIN;
          admin === "Northern Cyprus"
            ? (code = "CYP")
            : admin === "Somaliland"
            ? (code = "SOM")
            : code;
          const data = await axios.get(
            `http://localhost:3555/api/country/${code}`
          );
          getCountryName().change(data.data.nameCom);
          setCountryData(data.data);
          setCountryCode(data.data.countryCode);
        });
      },
    });
    const setCountryData = (data) => {
      countryData.value = data;
    };
    const setCountryCode = (code) => {
      countryCode.value = code;
    };
    onMounted(() => {
      countryCode.value = "dummy";
    });
    return {
      zoom,
      mapOptions,
      tileOptions,
      url,
      geoJson,
      geoJsonOptionStyle,
      geoJsonOptions,
      countryData,
      countryCode,
    };
  },
};
</script>
