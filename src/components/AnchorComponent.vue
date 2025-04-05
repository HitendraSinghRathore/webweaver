<template>
    <a :href="element.properties.link" :style="element.css">{{ element.properties.textContent }}</a>
  </template>
  <script>
  export default {
    name: "AnchorComponent",
    props: { element: { type: Object, required: true } }
  };
  </script>
  <style scoped>
  a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: var(--primary-color);
  }
  </style>
  