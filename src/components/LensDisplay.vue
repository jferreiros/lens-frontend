<template>
    <div class="flex flex-col justify-center items-center gap-4">
        <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Lens curves -->
      <path :d="lensPath" fill="transparent" stroke="black" />
      
     
    <!-- Centered horizontal and vertical lines -->
    <line x1="20" y1="100" x2="380" y2="100" stroke="black" stroke-width="1" />
    <line x1="200" y1="10" x2="200" y2="190" stroke="black" stroke-width="1" />

    <!-- Labels for the horizontal line ends -->
    <text x="20" y="120" font-family="Verdana" font-size="10" text-anchor="start">-1000 mm</text>
    <text x="380" y="120" font-family="Verdana" font-size="10" text-anchor="end">1000 mm</text>

    <!-- Focal points positioned based on the computed scaling factor -->
    <circle v-if="focalLength" :cx="focalXPosition(focalLength)" cy="100" r="2" fill="red" />
    <circle v-if="focalLength" :cx="focalXPosition(-focalLength)" cy="100" r="2" fill="red" />

    <!-- Focal length text -->
    
    </svg>
    <span font-family="Verdana" font-size="14" text-anchor="middle" class="p-4 bg-white rounded-md">
      Focal Length: <span class="font-bold">{{ focalLength }} mm</span>
    </span>
    </div>
    
  </template>
  
  <script>
  const scale = 4;
  export default {
    name: 'LensDisplay',
    props: {
      lensParams: {
        type: Object,
        required: true
      }
    },
    computed: {

        focalXPosition() {
      // Given that the viewBox width is 400, and the range is 20 to 380,
      // we need to map the focal length range (-1000 to 1000) to this range.
      return (focalLengthValue) => {
        const svgRangeStart = 20;
        const svgRangeEnd = 380;
        const svgRange = svgRangeEnd - svgRangeStart;
        // Map the focal length to the SVG range
        const position = (focalLengthValue / 1000) * svgRange / 2 + 200; // 200 is the center of the viewBox
        return position;
      };
    },


      
  

        lensPath() {
    // Constants for SVG dimensions and lens properties
    const viewBoxHeight = 200; // Height of the SVG's viewBox
    const lensHeight = 150; // The vertical "diameter" of the lens, which remains constant
    const centerY = viewBoxHeight / 2; // Vertical center of the SVG
    const thickness = this.lensParams.thickness; // The lens thickness

    // Horizontal center positions for the front and back curves
    const frontSurfaceCenterX = 200 - thickness / 2;
    const backSurfaceCenterX = 200 + thickness / 2;

    // The y-coordinates for the top and bottom of the lens
    const topY = centerY - lensHeight / 2;
    const bottomY = centerY + lensHeight / 2;

    // Calculate the Bezier curve control points for the lens surfaces
    // These should create arcs that are horizontally symmetric
    const frontControlX = frontSurfaceCenterX - this.lensParams.frontRadius;
    const backControlX = backSurfaceCenterX + this.lensParams.backRadius;

    // Construct the SVG path for the lens
    return `
      M${frontSurfaceCenterX},${topY}
      C${frontControlX},${topY} ${frontControlX},${bottomY} ${frontSurfaceCenterX},${bottomY}
      L${backSurfaceCenterX},${bottomY}
      C${backControlX},${bottomY} ${backControlX},${topY} ${backSurfaceCenterX},${topY}
      Z`;
  },

      focalLength() {
    const n = 1.5; // Refractive index of glass; adjust if necessary
    const R1 = this.lensParams.frontRadius;
    const R2 = -this.lensParams.backRadius; // Invert R2 if it's the radius of the surface farther from the light source
    const d = this.lensParams.thickness;
    
    // Implement the full lensmaker's formula
    const lensPower = (n - 1) * ((1 / R1) - (1 / R2) + ((n - 1) * d) / (n * R1 * R2));
    const focalLength = lensPower !== 0 ? 1 / lensPower : 'Infinity';
    
    // Check if focal length is finite and round to two decimal places
    return isFinite(focalLength) ? focalLength.toFixed(2) : focalLength;
  },
      focalXLeft() {
        // The x-position of the left focal point in the SVG
        const focalLength = parseFloat(this.focalLength);
        return -focalLength * scale; // Position to the left of the lens center (0)
      },
      focalXRight() {
        // The x-position of the right focal point in the SVG
        const focalLength = parseFloat(this.focalLength);
        return focalLength * scale; // Position to the right of the lens center (0)
      }
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
  