<template>
  <div class="lens-list">
    <h2 class="font-bold text-md bg-gray-800 text-white p-4">Saved Lens Configurations</h2>
    <div class="flex flex-col gap-4 p-4">
      <div v-if="error" class="error-message bg-red-300 text-red-950 font-bold text-sm rounded-md p-2">
        Error: {{ error }}
      </div>
      <div v-if="lenses.length > 0" class="flex flex-col gap-4">
        <div v-for="lens in lenses" :key="lens.id" class="bg-white shadow-lg rounded-md p-2">
          <div>
            <div class="font-bold text-md">{{ lens.lensTitle }}</div>
            <div class="flex gap-2 text-xs">
              <div><span class="font-bold">F: </span>{{ lens.frontRadius }} mm</div>
              <div><span class="font-bold">B: </span>{{ lens.backRadius }} mm</div>
              <div><span class="font-bold">T: </span>{{ lens.thickness }} mm</div>
            </div>
          </div>
          <div class="flex gap-2 justify-end">
            <button @click="selectLens(lens)"><font-awesome-icon icon="edit" /></button>
            <button @click="confirmDelete(lens.id)"><font-awesome-icon icon="trash-alt" /></button>
          </div>
        </div>
      </div>
      <div v-else class="bg-blue-300 text-blue-950 font-bold text-sm rounded-md p-2">
        No saved configurations found.
      </div>
    </div>
  </div>
  </template>
  
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LensList',
  computed: {
    ...mapState(['lenses']),
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    ...mapActions(['fetchLenses', 'selectLens', 'deleteLens']),
    confirmDelete(lensId) {
      if (confirm("Are you sure you want to delete this lens configuration?")) {
        this.deleteLens(lensId);
      }
    },
    handleError(error) {
      this.error = error.message || 'An unexpected error occurred';
    },
  },
  created() {
    this.fetchLenses();
  }
};
</script>
  
  <style scoped>
  
  </style>
  