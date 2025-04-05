<template>
    <textarea :value="element.properties.value" :style="element.css" @input="onInput"></textarea>
  </template>
  <script>
  export default {
    name: "TextAreaComponent",
    props: { element: { type: Object, required: true } },
    methods: {
      onInput(e) {
        this.element.properties.value = e.target.value;
      }
    }
  };
  </script>
  <style scoped>
  textarea {
    width: 100%;
    height: 100%;
    padding: 5px;
  }
  </style>
  