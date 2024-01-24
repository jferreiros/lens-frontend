<template>
    <div class="lens-list">
      <h2>Saved Lens Configurations</h2>
      <div v-if="error" class="error-message">
        Error: {{ error }}
      </div>
      <ul v-if="lenses.length > 0">
        <li v-for="lens in lenses" :key="lens.id">
          <span>Front Radius: {{ lens.frontRadius }}</span>
          <span>Back Radius: {{ lens.backRadius }}</span>
          <span>Thickness: {{ lens.thickness }}</span>
          <button @click="selectLens(lens)">Edit</button>
        </li>
      </ul>
      <div v-else>
        No saved configurations found.
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LensList',
    data() {
      return {
        lenses: [],
        error: null,
      };
    },
    created() {
      this.fetchLenses();
    },
    methods: {
      async fetchLenses() {
        try {
          const response = await axios.get('https://8mxhkm4s12.execute-api.eu-west-1.amazonaws.com/prod/lenses');
          this.lenses = response.data;
        } catch (err) {
          this.handleError(err);
        }
      },
      selectLens(lens) {
        this.$emit('edit-lens', lens);
      },
      handleError(error) {
        // A real-world application should have more sophisticated error handling
        this.error = error.message || 'An unexpected error occurred';
        // Optionally log to an external service
      },
    },
  };
  </script>
  
  <style scoped>
  .lens-list {
    margin: 0 auto;
    padding: 1rem;
  }
  
  .error-message {
    color: red;
  }
  
  .lens-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .lens-list li {
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #f3f3f3;
    cursor: pointer;
  }
  
  .lens-list span {
    margin-right: 1rem;
  }
  
  button {
    margin-left: 1rem;
  }
  </style>
  