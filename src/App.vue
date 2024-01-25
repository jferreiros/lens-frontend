<template>
  <div class="min-h-screen w-full bg-gray-200 flex justify-center">
    <div class="max-w-10xl w-full mx-auto grid grid-rows-12 max-h-screen overflow-hidden">
      <div class="w-full text-center bg-gray-950 pr-4 pl-4 pt-2 pb-2 row-span-1">      
        <img src="./assets/images/logomeetoptics.png" alt="">
      </div>
      <div class="bg-white w-full p-6 text-xl font-bold text-left row-span-1">
        Custom Lent builder
      </div>
      <div class="flex justify-between gap-4 p-4 row-span-10">
        <div class="bg-white rounded-lg shadow-lg w-96"> 
          <LentEditor
            :editLent="currentLentParams"
            @parameters-changed="onParametersChanged"
            @lent-saved="fetchLenses"
            @lent-updated="fetchLenses"
          />
        </div>
        <div class="bg-white bg-opacity-75 rounded-lg p-4 shadow-lg flex-1 flex items-center justify-center">
          <LentDisplay :lentParams="currentLentParams" />
        </div>
        <div class="bg-gray-100 rounded-lg shadow-lg w-72 overflow-hidden"> 
          <LensList ref="lensList" @edit-lent="editLent" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';
import LentEditor from './components/LentEditor.vue';
import LentDisplay from './components/LentDisplay.vue';
import LensList from './components/LensList.vue';

export default {
  name: 'App',
  components: {
    LentEditor,
    LentDisplay,
    LensList
  },
  computed: {
    ...mapState(['currentLent']),
  },
  methods: {
    ...mapActions(['fetchLenses', 'clearCurrentLent']),
  },
  mounted() {
    this.fetchLenses();
  }
};
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
