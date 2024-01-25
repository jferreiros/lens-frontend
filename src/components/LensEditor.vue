<template>
  <div class="bg-opacity-75 rounded-lg w-full overflow-hidden">
    <h2 class="text-white font-bold text-lg bg-red-600 p-4">Lens Parameters</h2>
    
    <form @submit.prevent="submitLens" class="p-4 flex flex-col gap-2">
      <!-- Lens Configuration Title -->
      <div class="grid grid-cols-3 gap-2">
        <div class="text-left col-span-2">
          <label for="lens-title" class="text-sm font-bold">Title:</label>
          <input
            type="text"
            id="lens-title"
            v-model="lensParams.lensTitle"
            :class="{'bg-lightblue': isEditing}"
            class="w-full px-3 py-2 border rounded mt-1"
            placeholder="Enter lens title"
          />
        </div>
        <div class="flex col-span-1 items-end gap-1">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
          <button v-if="isEditing" @click="cancelEdit" class="px-2 py-1 bg-red-600 text-white font-bold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300">
            <font-awesome-icon icon="fa-times-circle" />
          </button>
        </div>
      </div>
      
      <!-- Radius of Curvature -->
      <h3 class="text-gray-900 font-bold text-center">Radius of Curvature (mm)</h3>
      <div class="flex flex-col gap-2">
        <!-- Front Radius -->
        <div class="text-left border border-gray-300 rounded-lg p-2">
          <label class="block text-sm font-bold" for="front-radius">Front:</label>
          <input
            type="range"
            id="front-radius"
            v-model.number="lensParams.frontRadius"
            min="-2594"
            max="113.3"
            step="0.05"
            class="w-full mt-1"
          />
          <div class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block">
            {{ lensParams.frontRadius }} mm
          </div>
        </div>

        <!-- Back Radius -->
        <div class="text-left border border-gray-300 rounded-lg p-2">
          <label class="block text-sm font-bold" for="back-radius">Back:</label>
          <input
            type="range"
            id="back-radius"
            v-model.number="lensParams.backRadius"
            min="-2594"
            max="113.3"
            step="0.1"
            class="w-full mt-1"
          />
          <div class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block">
            {{ lensParams.backRadius }} mm
          </div>
        </div>
      </div>

      <!-- Thickness -->
      <div class="text-left">
        <h3 class="text-black font-bold text-center">Thickness (mm):</h3>
        <input
          type="range"
          id="thickness"
          v-model.number="lensParams.thickness"
          min="0"
          max="100"
          step="0.1"
          class="w-full mt-1"
        />
        <div class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block">
          {{ lensParams.thickness }} mm
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "LensEditor",
  computed: {
    ...mapState(['currentLens']),
    lensParams() {
      return this.currentLens || {
        frontRadius: 0,
        backRadius: 0,
        thickness: 10,
        lensTitle: ""
      };
    },
    isEditing() {
      return this.currentLens !== null;
    }
  },
  methods: {
    ...mapActions(['saveLens', 'updateLens', 'clearCurrentLens']),
    submitLens() {
      const lensData = { ...this.lensParams };
      if (this.isEditing) {
        this.updateLens(lensData);
      } else {
        this.saveLens(lensData);
      }
    },
    cancelEdit() {
      this.clearCurrentLens();
    }
  }
};
</script>

<style scoped>
/* Your existing styles, if any */
</style>
