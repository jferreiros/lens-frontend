import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        lenses: [],
        currentLens: {
            frontRadius: 0,
            backRadius: 0,
            thickness: 10,
            lensTitle: ""
        },
  },
  mutations: {
    SET_LENSES(state, lenses) {
      state.lenses = lenses;
    },
    SET_CURRENT_LENS(state, lens) {
      state.currentLens = lens;
    },
    RESET_CURRENT_LENS(state) {
      state.currentLens = {
        frontRadius: 0,
        backRadius: 0,
        thickness: 10,
        lensTitle: "",
      };
    },
  },
  actions: {
    fetchLenses({ commit }) {
      axios.get('https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses')
        .then(response => {
          commit('SET_LENSES', response.data);
        })
        .catch(error => console.error('Error fetching lenses:', error));
    },
    selectLens({ commit }, lens) {
      commit('SET_CURRENT_LENS', lens);
    },
    clearCurrentLens({ commit }) {
      commit('RESET_CURRENT_LENS');
    },
    saveLens({ dispatch }, lensParams) {
      axios.post('https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses', lensParams)
        .then(() => {
          dispatch('fetchLenses');
          alert("Lens configuration saved successfully!");
        })
        .catch(error => {
          console.error("There was an error saving the lens:", error);
          alert("Failed to save lens configuration.");
        });
    },
    updateLens({ dispatch }, lensParams) {
      axios.put(`https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses`, lensParams)
        .then(() => {
          dispatch('fetchLenses');
          alert("Lens configuration updated successfully!");
        })
        .catch(error => {
          console.error("There was an error updating the lens:", error);
          alert("Failed to update lens configuration.");
        });
    },
    deleteLens({ dispatch }, lensId) {
      axios.delete(`https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses/${lensId}`)
        .then(() => dispatch('fetchLenses'))
        .catch(error => console.error('Error deleting lens:', error));
    },
  },
});
