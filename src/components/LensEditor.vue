<template>
  <div class="bg-opacity-75 rounded-lg w-full overflow-hidden">
    <h2 class="text-white font-bold text-lg bg-red-600 p-4">Lens Parameters</h2>
    
    <form @submit.prevent="isEditing ? updateLens() : saveLens()" class="p-4 flex flex-col gap-2">
      <!-- Lens Configuration Title -->
      <div class="mt-4 text-left">
        <label for="lens-title" class="text-sm font-bold"
          >Lens Configuration Title:</label
        >
        <input
          type="text"
          id="lens-title"
          v-model="lensParams.lensTitle"
          :class="{'bg-lightblue': isEditing}"
          class="w-full px-3 py-2 border rounded mt-1"
          placeholder="Enter lens title"
        />
      </div>
      <h3 class="text-gray-900 font-bold text-center">Radius of curvature (mm)</h3>
      <div class="flex flex-col gap-2">
        <div class="text-left border border-gray-300 rounded-lg p-2">
          <label class="block text-sm font-bold" for="front-radius"
            >Front:</label
          >
          

            <input
              type="range"
              id="front-radius"
              v-model.number="lensParams.frontRadius"
              min="-2594"
              max="113.3"
              step="0.05"
              class="w-full mt-1"
            />
            <div class="w-full flex justify-between">
            <span class="range-min text-sm">-2594 mm</span>
            <span class="range-max text-sm">113.3 mm</span>
          </div>

          <div
            class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block"
          >
            {{ lensParams.frontRadius }} mm
          </div>
        </div>

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
            <div class="w-full flex justify-between">
            <span class="range-min text-sm">-2594 mm</span>
            <span class="range-max text-sm">113.3 mm</span>
            </div>

          <div
            class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block"
          >
            {{ lensParams.backRadius }} mm
          </div>
        </div>
      </div>

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
        <div
          class="text-md bg-gray-200 rounded-full px-3 py-1 font-semibold mt-1 inline-block"
        >
          {{ lensParams.thickness }} mm
        </div>
      </div>

      <div class="mt-6">
        <button
          type="submit"
          class="w-full px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {{ isEditing ? 'Update' : 'Save' }}
        </button>
        <button v-if="isEditing" @click="cancelEdit" class="mt-2 w-full px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LensEditor",
  props: {
    editLens: Object,
  },
  data() {
    return {
      lensParams: {
        frontRadius: 0,
        backRadius: 0,
        thickness: 10,
        lensTitle: "",
      },
      isEditing: false,
    };
  },
  methods: {
    saveLens() {
      // Emit an event with the current parameters
      this.$emit("save-lens", this.lensParams);

      // Make sure to replace 'YOUR_LAMBDA_ENDPOINT_URL' with the actual endpoint
      axios
        .post("https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses", this.lensParams)
        .then((response) => {
          console.log("Lens saved!", response);
          alert("Lens configuration saved successfully!");
          // Emit event to notify parent component about the save
          this.$emit("lens-saved");
        })
        .catch((error) => {
          console.error("There was an error saving the lens:", error);
          alert("Failed to save lens configuration.");
        });
    },
    async updateLens() {
    try {
      // Include the lens ID in the body of the PUT request
      const updatedLens = {
        id: this.lensParams.id,
        frontRadius: this.lensParams.frontRadius,
        backRadius: this.lensParams.backRadius,
        thickness: this.lensParams.thickness,
        lensTitle: this.lensParams.lensTitle
      };

      const response = await axios.put(`https://2tabw4hbkd.execute-api.eu-west-1.amazonaws.com/prod/lenses`, updatedLens);
      
      console.log("Lens updated!", response);
      
      // Emit event to notify parent component about the update
      this.$emit("lens-updated");
      
      // Optional: Show a success message to the user
      alert("Lens configuration updated successfully!");

      // Reset form and exit edit mode
      this.isEditing = false;
      this.resetForm();
    } catch (error) {
      console.error("There was an error updating the lens:", error);
      
      // Optional: Show an error message to the user
      alert("Failed to update lens configuration.");
    }
  },
    cancelEdit() {
      // Reset the form and exit edit mode
      this.isEditing = false;
      this.resetForm();
    },
    resetForm() {
      this.lensParams = { frontRadius: 0, backRadius: 0, thickness: 10, lensTitle: "" };
    }
  },
  watch: {
    editLens: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.lensParams = { ...newVal };
          this.isEditing = true;
        }
      }
    }
  }
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
