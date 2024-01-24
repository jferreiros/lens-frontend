<template>
  <div class="min-h-screen w-full bg-blue-500 flex items-center justify-center">
    <div class="max-w-10xl w-full mx-auto p-4">
      <h1 class="text-center text-white text-3xl font-bold mb-8">Meetoptics Exercise</h1>
      <div class="flex justify-between gap-4">
        <div class="bg-white rounded-lg p-4 shadow-lg w-96"> <!-- 300px width -->
          <LensEditor @parameters-changed="updateLens" />
        </div>
        <div class="bg-white bg-opacity-75 rounded-lg p-4 shadow-lg flex-1 flex items-center justify-center">
          <LensDisplay :lensParams="currentLensParams" />
        </div>
        <div class="bg-white bg-opacity-75 rounded-lg p-4 shadow-lg w-72"> <!-- 300px width -->
          <LensList @edit-lens="editLens" />
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
    }
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
