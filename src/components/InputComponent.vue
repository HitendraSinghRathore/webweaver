<template>
    <input :type="element.properties.type || 'text'" :value="element.properties.value" :style="styleObject" @input="onInput" />
  </template>
  <script>
  export default {
    name: "InputComponent",
    props: { element: { type: Object, required: true } },
    computed: {
      styleObject() {
        return this.element.css || "";
      }
    },
    methods: {
      onInput(e) {
        this.element.properties.value = e.target.value;
      }
    }
  };
  </script>
  <style scoped>
  input {
    width: 100%;
    padding: 5px;
  }
  </style>
  