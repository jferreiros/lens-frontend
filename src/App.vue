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
          <LensEditor
            :editLens="currentLensParams"
            @parameters-changed="onParametersChanged"
            @lens-saved="fetchLenses"
            @lens-updated="fetchLenses"
          />
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
        frontRadius: 0,
        backRadius: 0,
        thickness: 10,
        lensTitle: ""
      },
      editingLensId: null // Add this to track the editing lens ID
    };
  },
  methods: {
    editLens(lens) {
      this.currentLensParams = {...lens};
      this.editingLensId = lens.id; // Set the editing lens ID
    },
    onParametersChanged(parameters) {
      if (!this.editingLensId) {
        this.currentLensParams = parameters; // Update only if not editing
      }
    },
    fetchLenses() {
      this.resetEditing();
      this.$refs.lensList.fetchLenses();
    },
    resetEditing() {
      this.editingLensId = null;
      // this.currentLensParams = {
      //   frontRadius: 0,
      //   backRadius: 0,
      //   thickness: 10,
      //   lensTitle: ""
      // };
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
