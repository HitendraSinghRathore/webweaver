<template>
    <div class="section" :style="sectionStyle">
      <div class="section-header" v-if="!previewMode">
        <div class="drag-handle">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6H6m12 4H6m12 4H6m12 4H6"/>
</svg>

        </div>
        <div class="section-actions">
          <button @click="$emit('edit-section', section)"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg>
</button>
          <button @click="$emit('delete-section', section)" class="delete-button">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>

            </button>
        </div>
      </div>
      <div class="columns-container" :class="'cols-' + section.columns.length">
        <div
          v-for="(col, index) in section.columns"
          :key="col.id"
          class="column"
          :class="{'border-none': previewMode}"
          @dragover.prevent
          @drop="onDropElement($event, index)"
        >
          <div v-if="col.element" class="full-section">
            <div class="element-wrapper">
              <component :is="getComponent(col.element.type)" :element="col.element" :style="col.element.css" />
              <button v-if="!previewMode" class="element-edit" @click="$emit('edit-element', col.element)">Edit</button>
            </div>
          </div>
          <div v-else v-if="!previewMode" class="add-element-container">
            <button @click="$emit('add-element-to-column', section, index)">Add Element</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>

  import TextComponent from "./TextComponent";
  import ImageComponent from "./ImageComponent";
  import InputComponent from "./InputComponent.vue";
  import TextAreaComponent from "./TextAreaComponent.vue";
  import HeadingComponent from "./HeadingComponent.vue";
  import SubheadingComponent from "./SubheadingComponent.vue";
  import ListComponent from "./ListComponent.vue";
  import VideoComponent from "./VideoComponent.vue";
  import ButtonComponent from "./ButtonComponent.vue";
  import AnchorComponent from "./AnchorComponent.vue";
  export default {
    name: "SectionComponent",
    props: {
      section: { type: Object, required: true },
      previewMode: { type: Boolean, default: false }
    },
    computed: {
      sectionStyle() {
        if (this.previewMode) {
          return (this.section.css || "") + "; background: transparent; border: none;";
        }
        return this.section.css;
      }
    },
    methods: {
      getComponent(type) {
        if (type === "text") return TextComponent;
        if (type === "heading") return HeadingComponent;
        if (type === "subheading") return SubheadingComponent;
        if (type === "image") return ImageComponent;
        if (type === "list") return ListComponent;
        if (type === "button") return ButtonComponent;
        if (type === "input") return InputComponent;
        if (type === "textarea") return TextAreaComponent;
        if (type === "anchor") return AnchorComponent;
        if (type === "video") return VideoComponent;
        return TextComponent;
      },
      onDropElement(event, colIndex) {
        const type = event.dataTransfer.getData("addElement");
        if (type) {
          this.$emit("add-element-to-column", this.section, colIndex, type);
        }
      }
    }
  };
  </script>
  <style scoped>
  .section {
    width: 100%;
    position: relative;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    background: var(--primary-color);

  }
  .drag-handle {
    cursor: grab;
    font-size: 14px;
  }
  .section-actions button {
    background: #fff;
    border: none;
    padding: 4px 8px;
    margin-left: 5px;
    cursor: pointer;
  }
  .columns-container {
    display: flex;
  }
  .column {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px dashed var(--primary-color);
    position: relative;
  }
  .column:last-child {
    border-right: none;
  }
  .add-element-container  {
    padding:24px 0;
    button {
    border: none;
    padding: 4px 8px;
    cursor: pointer;
    background: var(--primary-color);
    }
  }
  .element-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .element-edit {
    position: absolute;
    top: 5px;
    right: 5px;
    background: #000;
    color:white;
    border: none;
    padding: 2px 5px;
    cursor: pointer;
    font-size: 12px;
  }
  .full-section {
    width: 100%;
    height: 100%;
  }
  .delete-button {
    color:#a72828;
  }
  .border-none {
    border: none;
  }
  </style>
  