<template>
    <img :src="element.properties.src" :height="element.properties.height" :width="element.properties.width" :alt="element.properties.alt" :style="mergedStyle" />
  </template>
  <script>
  export default {
    name: "imageComponent",
    props: { element: { type: Object, required: true } },
    computed: {
      mergedStyle() {
        let styleStr = this.element.css || "";
        if (this.element.properties.width) {
          styleStr += " width:" + this.element.properties.width + ";";
        }
        if (this.element.properties.height) {
          styleStr += " height:" + this.element.properties.height + ";";
        }
        return styleStr;
      }
    }
  };
  </script>
  <style scoped>
  img {
    object-fit: contain;
  }
  </style>
  