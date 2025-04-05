<template>
    <video :src="element.properties.src" 
           :controls="element.properties.controls" 
           :autoplay="element.properties.autoplay" 
           :style="mergedStyle"></video>
  </template>
  <script>
  export default {
    name: "VideoComponent",
    props: { element: { type: Object, required: true } },
    computed: {
      mergedStyle() {
        return this.element.css || "";
      }
    }
  };
  </script>
  <style scoped>
  video {
    object-fit: contain;
  }
  </style>
  