<template>
  <div class="bg-opacity-75 rounded-lg w-full">
    <h2 class="text-black font-bold text-xl mb-4">Lens Parameters</h2>
    <form @submit.prevent="saveLens" class="space-y-6">
      <h3 class="text-black font-bold">Radius of curvature (mm)</h3>
      <div class="space-y-4">
        <div class="text-left">
          <label class="block text-sm font-bold" for="front-radius"
            >Front:</label
          >
          <div class="w-full flex justify-between">
            <span class="range-min text-sm">-2594 mm</span>
            <span class="range-max text-sm">113.3 mm</span>
            </div>

            <input
              type="range"
              id="front-radius"
              v-model.number="lensParams.frontRadius"
              min="-2594"
              max="113.3"
              step="0.05"
              class="w-full mt-1"
            />
            

          <div
            class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block"
          >
            {{ lensParams.frontRadius }} mm
          </div>
        </div>

        <div class="text-left">
          <label class="block text-sm font-bold" for="back-radius">Back:</label>
          <div class="w-full flex justify-between">
            <span class="range-min text-sm">-2594 mm</span>
            <span class="range-max text-sm">113.3 mm</span>
            </div>
            <input
              type="range"
              id="back-radius"
              v-model.number="lensParams.backRadius"
              min="-2594"
              max="113.3"
              step="0.1"
              class="w-full mt-1"
            />
            

          <div
            class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block"
          >
            {{ lensParams.backRadius }} mm
          </div>
        </div>
      </div>

      <div class="space-y-4 text-left">
        <label class="block text-sm font-bold">Thickness (mm):</label>
        <input
          type="range"
          id="thickness"
          v-model.number="lensParams.thickness"
          min="0"
          max="100"
          step="0.1"
          class="w-full mt-1"
        />
        <div
          class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block"
        >
          {{ lensParams.thickness }} mm
        </div>
      </div>

      <div class="mt-4 text-left">
        <label for="lens-title" class="text-sm font-bold"
          >Lens Configuration Title:</label
        >
        <input
          type="text"
          id="lens-title"
          v-model="lensTitle"
          class="w-full px-3 py-2 border rounded mt-1"
          placeholder="Enter lens title"
        />
      </div>

      <div class="mt-6">
        <button
          type="submit"
          class="w-full px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LensEditor",
  data() {
    return {
      lensParams: {
        frontRadius: 0,
        backRadius: 0,
        thickness: 10,
        lensTitle: "",
      },       // Add this new data property for the lens configuration title
    };
  },
  methods: {
    saveLens() {
      // Emit an event with the current parameters
      this.$emit("save-lens", this.lensParams);

      // Make sure to replace 'YOUR_LAMBDA_ENDPOINT_URL' with the actual endpoint
      axios
        .post("https://8mxhkm4s12.execute-api.eu-west-1.amazonaws.com/prod/lenses", this.lensParams)
        .then((response) => {
          console.log("Lens saved!", response);
        })
        .catch((error) => {
          console.error("There was an error saving the lens:", error);
        });
    },
  },
  watch: {
    lensParams: {
      handler(newValue) {
        this.$emit("parameters-changed", newValue);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
