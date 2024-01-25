<template>
  <div class="lens-list grid grid-row-12 h-full">
    <h2 class="font-bold text-md bg-gray-800 text-white p-4 row-span-1">Saved Lens Configurations</h2>
    <div class="flex flex-col gap-4 p-4 row-span-11 max-h-full overflow-y-scroll">
      <div v-if="error" class="error-message bg-red-300 text-red-950 font-bold text-sm rounded-md p-2">
        Error: {{ error }}
      </div>
      <div v-if="lenses.length > 0" class="flex flex-col gap-4">
        <div v-for="lens in lenses" :key="lens.id" class="bg-white shadow-lg rounded-md p-2">          
          <div class="grid grid-cols-3">
            <div class="col-span-2 flex flex-col gap-2">
              <div class="font-bold text-md">{{ lens.lensTitle }}</div>
              <div class="text-xs">
                <div><span class="font-bold">F: </span>{{ lens.frontRadius }} mm</div>
                <div><span class="font-bold">B: </span>{{ lens.backRadius }} mm</div>
                <div><span class="font-bold">T: </span>{{ lens.thickness }} mm</div>
              </div>
            </div>              
            <div class="col-span-1 flex flex-col gap-2 justify-center items-end">
              <button @click="selectLens(lens)" class="p-2 bg-gray-200 rounded-md hover:bg-blue-400 hover:text-white focus:bg-blue-700"><font-awesome-icon icon="edit" /></button>
              <button @click="confirmDelete(lens.id)" class="p-2 bg-gray-200 rounded-md hover:bg-red-400 hover:text-white focus:bg-red-700"><font-awesome-icon icon="trash-alt" /></button>
            </div>
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
  