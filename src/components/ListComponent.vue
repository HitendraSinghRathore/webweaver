<template>
    <component :is="listTag" :style="element.css">
      <li v-for="(item, index) in items" :key="index" :style="itemStyle">{{ item }}</li>
    </component>
  </template>
  <script>
  export default {
    name: "ListComponent",
    props: { element: { type: Object, required: true } },
    computed: {
      listTag() {
        return this.element.properties.ordered ? "ol" : "ul";
      },
      items() {
        return this.element.properties.items ? this.element.properties.items.split("\n") : [];
      },
      itemStyle() {
        return this.element.properties.itemCSS || "";
      }
    }
  };
  </script>
  <style scoped>
  ol, ul {
    width: 100%;
    padding-left: 20px;
  }
  li {
    margin-bottom: 5px;
  }
  </style>
  