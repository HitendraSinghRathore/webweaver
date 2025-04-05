<template>
    <component :is="headingTag" :style="element.css">{{ element.properties.textContent }}</component>
  </template>
  <script>
  export default {
    name: "SubheadingComponent",
    props: { element: { type: Object, required: true } },
    computed: {
      headingTag() {
        return this.element.properties.level || "h2";
      }
    }
  };
  </script>
  <style scoped>
  h2, h3, h4, h5, h6 {
    margin: 0;
    width: 100%;
  }
  </style>
  