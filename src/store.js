import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        lenses: [],
        currentLent: {
            frontRadius: 0,
            backRadius: 0,
            thickness: 10,
            lensTitle: ""
        },
        reset: 1
  },
  mutations: {
    SET_LENSES(state, lenses) {
      state.lenses = lenses;
    },
    SET_CURRENT_LENT(state, lent) {
      state.currentLent = lent;
      state.reset = 0;
    },
    RESET_CURRENT_LENT(state) {
      state.currentLent = {
        frontRadius: 0,
        backRadius: 0,
        thickness: 10,
        lensTitle: "",
      };
      state.reset = 1;
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
    selectLent({ commit }, lent) {
      commit('SET_CURRENT_LENT', lent);
    },
    clearCurrentLent({ commit }) {
      commit('RESET_CURRENT_LENT');
    },
    saveLent({ dispatch }, lensParams) {
      axios.post('https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses', lensParams)
        .then(() => {
          dispatch('fetchLenses');
          alert("Lens configuration saved successfully!");
          dispatch('clearCurrentLent');
        })
        .catch(error => {
          console.error("There was an error saving the lent:", error);
          alert("Failed to save lens configuration.");
        });
    },
    updateLent({ dispatch }, lensParams) {
      axios.put(`https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses`, lensParams)
        .then(() => {
          dispatch('fetchLenses');
          alert("Lent configuration updated successfully!");
          dispatch('clearCurrentLent');
        })
        .catch(error => {
          console.error("There was an error updating the lent:", error);
          alert("Failed to update lens configuration.");
        });
    },
    deleteLent({ dispatch }, lentId) {
      axios.delete(`https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses/${lentId}`)
        .then(() => dispatch('fetchLenses'))
        .catch(error => console.error('Error deleting lent:', error));
    },
  },
});
