<template>
    <button :style="element.css" @click="onClick">{{ element.properties.textContent }}</button>
  </template>
  <script>
  export default {
    name: "ButtonComponent",
    props: { element: { type: Object, required: true } },
    methods: {
      onClick() {
        if (this.element.properties.link) {
          window.open(this.element.properties.link, "_blank");
        }
      }
    }
  };
  </script>
  <style scoped>
  button {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  </style>
  