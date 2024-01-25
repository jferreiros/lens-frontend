<template>
  <div class="min-h-screen w-full bg-gray-200 flex justify-center">
    <div class="max-w-10xl w-full mx-auto">
      <div class="w-full text-center bg-gray-950 pr-4 pl-4 pt-2 pb-2">      
        <img src="./assets/images/logomeetoptics.png" alt="">
      </div>
      <div class="bg-white w-full p-6 text-xl font-bold text-left">
        Custom Lent builder
      </div>
      <div class="flex justify-between gap-4 p-4">
        <div class="bg-white rounded-lg shadow-lg w-96"> <!-- 300px width -->
          <LensEditor @lens-saved="fetchLenses" @lens-updated="fetchLenses" />
        </div>
        <div class="bg-white bg-opacity-75 rounded-lg p-4 shadow-lg flex-1 flex items-center justify-center">
          <LensDisplay :lensParams="currentLensParams" />
        </div>
        <div class="bg-gray-100 rounded-lg overflow-hidden shadow-lg w-72"> <!-- 300px width -->
          <LensList ref="lensList" @edit-lens="editLens" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import LensEditor from './components/LensEditor.vue'
import LensDisplay from './components/LensDisplay.vue'
import LensList from './components/LensList.vue'

export default {
  name: 'App',
  components: {
    LensEditor,
    LensDisplay,
    LensList
  },
  data() {
    return {
      currentLensParams: {
        frontRadius: 50, // default values
        backRadius: 50,  // default values
        thickness: 10    // default values
      }
    };
  },
  methods: {
    updateLens(parameters) {
      this.currentLensParams = parameters;
    },
    editLens(lens) {
      this.currentLensParams = lens;
    },
    fetchLenses() {
      this.$refs.lensList.fetchLenses();
    },
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: space-between;
}
.left-panel, .right-panel {
  width: 50%;
}
</style>
