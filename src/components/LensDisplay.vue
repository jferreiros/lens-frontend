<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">

      <path :d="lensPath" fill="lightblue" stroke="#14576e" />
      

      <line x1="20" y1="150" x2="580" y2="150" stroke="black" stroke-width="1" />
      <line x1="300" y1="10" x2="300" y2="290" stroke="black" stroke-width="1" />
      <line x1="20" y1="100" x2="300" y2="100" stroke="red" stroke-width="1" />
      <line v-if="focalLength" x1="300" y1="100" :x2="focalXPosition(focalLength)" y2="150" stroke="red" stroke-width="1" />

      <text x="20" y="170" font-family="Verdana" font-size="10" text-anchor="start">-1000 mm</text>
      <text x="580" y="170" font-family="Verdana" font-size="10" text-anchor="end">1000 mm</text>

      <circle v-if="focalLength" :cx="focalXPosition(focalLength)" cy="150" r="2" fill="red" />
      <circle v-if="focalLength" :cx="focalXPosition(-focalLength)" cy="150" r="2" fill="red" />
    </svg>
    <span font-family="Verdana" font-size="14" text-anchor="middle" class="p-4 bg-blue-100 rounded-md">
      Focal Length: <span class="font-bold">{{ focalLength }} mm</span>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LensDisplay',
  computed: {
    ...mapState(['currentLens']),

    focalXPosition() {
      return (focalLengthValue) => {
        const svgRangeStart = 20;
        const svgRangeEnd = 580;
        const svgRange = svgRangeEnd - svgRangeStart;
        const position = (focalLengthValue / 1000) * svgRange / 2 + 300;
        return position;
      };
    },

    lensPath() {
      const viewBoxHeight = 300;
      const lensHeight = 150;
      const centerY = viewBoxHeight / 2;
      const thickness = this.currentLens.thickness;

      const frontSurfaceCenterX = 300 - thickness / 2;
      const backSurfaceCenterX = 300 + thickness / 2;

      const topY = centerY - lensHeight / 2;
      const bottomY = centerY + lensHeight / 2;

      const frontControlX = frontSurfaceCenterX - this.currentLens.frontRadius;
      const backControlX = backSurfaceCenterX + this.currentLens.backRadius;

      return `
        M${frontSurfaceCenterX},${topY}
        C${frontControlX},${topY} ${frontControlX},${bottomY} ${frontSurfaceCenterX},${bottomY}
        L${backSurfaceCenterX},${bottomY}
        C${backControlX},${bottomY} ${backControlX},${topY} ${backSurfaceCenterX},${topY}
        Z`;
    },

    focalLength() {
      const n = 1.5;
      const R1 = this.currentLens.frontRadius;
      const R2 = -this.currentLens.backRadius;
      const d = this.currentLens.thickness;

      const lensPower = (n - 1) * ((1 / R1) - (1 / R2) + ((n - 1) * d) / (n * R1 * R2));
      const focalLength = lensPower !== 0 ? 1 / lensPower : 'Infinity';

      return isFinite(focalLength) ? focalLength.toFixed(2) : focalLength;
    },
  },
};
</script>

<style scoped>
  svg {
    border: 1px solid black;
  }

  circle {
    stroke: black;
    stroke-width: 2;
  }
</style>
