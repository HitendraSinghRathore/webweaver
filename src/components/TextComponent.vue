<template>
    <p class="text-element">{{ element.properties.textContent }}</p>
  </template>
  <script>
  export default {
    name: "TextComponent",
    props: { element: { type: Object, required: true } }
  };
  </script>
  <style scoped>
  .text-element {
    font-size: 16px;
    color: var(--font-color);
    width: 100%;
    height: 100%;
  }
  </style>
  