<template>
  <div class="editor">
    <header class="editor-header">
      <div v-if="!previewMode">
        <button @click="openSidebar('section')">Sections</button>
        <button @click="openSidebar('element')" :disabled="!page.sections.length" :class="{'disabled': !page.sections.length}">Elements</button>
        <button @click="savePage">Save</button>
        <button @click="activatePreview">Preview</button>
      </div>
      <div v-else>
        <button @click="deactivatePreview">Close preview</button>
      </div>
    </header>
    <div class="editor-body">
      <aside v-if="!previewMode && sidebarVisible" class="editor-sidebar">
        <!-- Section Drawer -->
        <div v-if="sidebarType === 'section'">
          <h3>Add row
            <button @click="closeSidebar">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>

            </button>
          </h3>
          <div class="card-container">
            <div v-for="n in 6" :key="n" class="card" @click="addSection(n)" draggable="true"
              @dragstart="onDragStartSectionCard($event, n)">
              <div class="card-content">{{ n }} Column<span v-if="n > 1">s</span></div>
            </div>
          </div>

        </div>
        <!-- Element Drawer -->
        <div v-if="sidebarType === 'element'">
          <h3>Select element
            <button @click="closeSidebar"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>
            </button>
          </h3>
          <div class="card-container">
            <div v-for="item in elementOptions" :key="item.type" class="card" @click="confirmAddElement(item.type)"
              draggable="true" @dragstart="onDragStartElementCard($event, item.type)">
              <div class="card-content">{{ item.name }}</div>
            </div>
          </div>

        </div>
        <!-- Edit Drawer -->
        <div v-if="sidebarType === 'edit'">
          <h3>Edit {{ editTargetType }}
            <button @click="closeSidebar"><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>
            </button>
          </h3>
          <div v-if="editTargetType === 'element'">
            <div v-if="editTarget.type === 'image'" class="edit-form">
              <div>
                <label for="image-url">Image URL</label>
                <input id="image-url" v-model="editTarget.properties.src" placeholder="Image URL" />
              </div>
              <div>
                <label for="image-width">Width</label>
                <input id="image-width" v-model="editTarget.properties.width" placeholder="Width" />
              </div>
              <div>
                <label for="image-height">Height</label>
                <input id="image-height" v-model="editTarget.properties.height" placeholder="Height" />
              </div>
              <div>
                <label for="image-alt">Alt text</label>
                <input id="image-alt" v-model="editTarget.properties.alt" placeholder="Alt Text" />
              </div>
            </div>
            <div v-else-if="editTarget.type === 'video'" class="edit-form">
              <div>
                <label for="video-url">Video URL</label>
                <input id="video-url" v-model="editTarget.properties.src" placeholder="Video URL" />
              </div>
              <div>
                <label for="video-controls">Controls</label>
                <input id="video-controls" type="checkbox" v-model="editTarget.properties.controls" />
              </div>
              <div>
                <label for="video-autoplay">Autoplay</label>
                <input id="video-autoplay" type="checkbox" v-model="editTarget.properties.autoplay" />
              </div>
            </div>

            <div v-else-if="editTarget.type === 'heading' || editTarget.type === 'subheading'" class="edit-form">
              <div>
                <label for="heading-text">Text</label>
                <textarea id="heading-text" v-model="editTarget.properties.textContent" rows="4"
                  placeholder="Text Content"></textarea>
              </div>
              <div>
                <label for="heading-level">Level</label>
                <select id="heading-level" v-model="editTarget.properties.level">
                  <option value="h1" v-if="editTarget.type === 'heading'">H1</option>
                  <option value="h2" v-if="editTarget.type === 'heading'">H2</option>
                  <option value="h3" v-if="editTarget.type === 'heading'">H3</option>
                  <option value="h4" v-if="editTarget.type === 'heading'">H4</option>
                  <option value="h5" v-if="editTarget.type === 'heading'">H5</option>
                  <option value="h6" v-if="editTarget.type === 'heading'">H6</option>
                  <option value="h2" v-if="editTarget.type === 'subheading'">H2</option>
                  <option value="h3" v-if="editTarget.type === 'subheading'">H3</option>
                  <option value="h4" v-if="editTarget.type === 'subheading'">H4</option>
                  <option value="h5" v-if="editTarget.type === 'subheading'">H5</option>
                  <option value="h6" v-if="editTarget.type === 'subheading'">H6</option>
                </select>
              </div>
            </div>
            <div v-else-if="editTarget.type === 'list'" class="edit-form">
              <div>
                <label for="list-ordered">List type</label>
                <select id="list-ordered" v-model="editTarget.properties.ordered">
                  <option :value="false">Unordered</option>
                  <option :value="true">Ordered</option>
                </select>
              </div>
              <div>
                <label for="list-items">List items (one per line)</label>
                <textarea id="list-items" v-model="editTarget.properties.items" rows="8"
                  placeholder="List items (one per line)"></textarea>
              </div>
              <div>
                <label for="list-item-css">Item CSS</label>
                <textarea id="list-item-css" v-model="editTarget.properties.itemCSS" rows="8"
                  placeholder="List item CSS"></textarea>
              </div>
            </div>
            <div v-else-if="editTarget.type === 'button' || editTarget.type === 'anchor'" class="edit-form">
              <div>
                <label for="button-text">Display Text</label>
                <input id="button-text" v-model="editTarget.properties.textContent" placeholder="Display Text" />
              </div>
              <div v-if="editTarget.type === 'anchor'">
                <label for="button-link">Link</label>
                <input id="button-link" v-model="editTarget.properties.link" 
                  placeholder="URL" />
              </div>
            </div>
            <div v-else-if="editTarget.type === 'text'" class="edit-form">
              <div>
                <label for="text-text">Text</label>
                <textarea id="text-text" v-model="editTarget.properties.textContent" rows="4"
                  placeholder="Text Content"></textarea>
              </div>
            </div>
            <div v-else-if="editTarget.type === 'input' || editTarget.type === 'textarea'" class="edit-form">
              <div>
                <label for="input-value">Value</label>
                <input id="input-value" v-model="editTarget.properties.value" placeholder="Value" :type="(editTarget.type === 'textarea' || editTarget.properties.type === 'password') ? 'text' : editTarget.properties.type" />
              </div>
              <div v-if="editTarget.type === 'input'">
                <label for="input-type">Type</label>
                <select id="input-type" v-model="editTarget.properties.type">
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="password">Password</option>
                  <option value="email">Email</option>
                  <option value="tel">Phone</option>
                </select>
              </div>
            </div>
            <div>
              <label for="input-css">CSS</label>
              <textarea id="input-css" v-model="editTarget.css" placeholder="CSS" rows="8"></textarea>

          </div>
            <button @click="deleteEdit" class="delete-button">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
              </svg>
              Delete

            </button>

          </div>
          <div v-else-if="editTargetType === 'section'">
            <div>
              <label for="section-css">CSS</label>
            <textarea id="section-css" v-model="editTarget.css" placeholder="Section CSS" rows="8"></textarea>
          </div>
            <button @click="deleteEdit" class="delete-button">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
              </svg>
              Delete

            </button>
          </div>
        </div>

      </aside>
      <main class="editor-canvas" @dragover.prevent @drop="onCanvasDrop">
        <div class="canvas-container">
          <draggable v-if="!previewMode" :list="page.sections" group="sections" item-key="id" @change="onSectionReorder"
            class="draggable-container" handle=".drag-handle">
            <transition-group>
              <div v-for="section in page.sections" :key="section.id" style="width:100%;">
                <SectionComponent :section="section" :previewMode="previewMode" @delete-section="deleteSection"
                  @edit-section="editSection" @edit-element="editElement" @add-element-to-column="openElementDrawer" />
              </div>
            </transition-group>
          </draggable>
          <div v-if="previewMode">
            <div v-for="section in page.sections" :key="section.id" style="width:100%;">
              <SectionComponent :section="section" :previewMode="previewMode" />
            </div>
          </div>
          <div v-if="!previewMode && page.sections.length === 0" class="placeholder">
            <button @click="openSidebar('section')">Add Row</button>
          </div>
          <div v-if="!previewMode && page.sections.length > 0" class="add-row">
            <button @click="openSidebar('section')">Add Row</button>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>
<script>
import { VueDraggableNext } from "vue-draggable-next";
import SectionComponent from "@/components/SectionComponent.vue";
import PageService from "@/services/pageService.js";
export default {
  name: "Home",
  components: { draggable: VueDraggableNext, SectionComponent },
  data() {
    return {
      page: { id: "", sections: [] },
      previewMode: false,
      sidebarVisible: false,
      sidebarType: "",
      elementOptions: [
        { type: "text", name: "Paragraph" },
        { type: "heading", name: "Heading" },
        { type: "subheading", name: "Subheading" },
        { type: "image", name: "Image" },
        { type: "list", name: "List" },
        { type: "button", name: "Button" },
        { type: "anchor", name: "Link" },
        { type: "input", name: "Input" },
        { type: "textarea", name: "Textarea" },
        { type: "video", name: "Video" }
      ],
      editTarget: null,
      editTargetType: "",
      selectedSection: null,
      selectedColumnIndex: null
    };
  },
  mounted() {
    console.log(this.$route.params.projectId)
    const projectId = this.$route.params.projectId;
    if (projectId) {
      const stored = PageService.getPage(projectId);
      this.page = stored ? stored : { id: projectId, sections: [] };
    } else {
      this.page = { id: Date.now().toString(), sections: [] };
    }
  },
  methods: {
    savePage() {
      PageService.savePage(this.page);
      alert("Saved");
    },
    openSidebar(type) {
      if (this.previewMode) return;
      this.sidebarType = type;
      this.sidebarVisible = true;
    },
    closeSidebar() {
      this.sidebarVisible = false;
      this.sidebarType = "";
    },
    activatePreview() {
      this.closeSidebar();
      this.previewMode = true;
    },
    deactivatePreview() {
      this.previewMode = false;
    },
    addSection(cols) {
      const sectionId = Date.now().toString();
      const section = {
        id: sectionId,
        css: " border:1px solid var(--primary-color); position:relative;",
        columns: []
      };
      for (let i = 0; i < cols; i++) {
        section.columns.push({ id: sectionId + "-" + i, element: null });
      }
      this.page.sections.push(section);
      this.closeSidebar();
    },
    onCanvasDrop(event) {
      const sectionCols = event.dataTransfer.getData("addSection");
      if (sectionCols) {
        this.addSection(Number(sectionCols));
        return;
      }
      const elementType = event.dataTransfer.getData("addElement");
      if (elementType && this.selectedSection != null && this.selectedColumnIndex != null) {
        this.addElementToColumn(this.selectedSection, this.selectedColumnIndex, elementType);
        this.clearSelectedTarget();
      }
    },
    onDragStartSectionCard(event, n) {
      event.dataTransfer.setData("addSection", n);
    },
    onDragStartElementCard(event, type) {
      event.dataTransfer.setData("addElement", type);
    },
    openElementDrawer(section, colIndex) {
      this.selectedSection = section;
      this.selectedColumnIndex = colIndex;
      this.openSidebar("element");
    },
    confirmAddElement(type) {
      if (this.selectedSection != null && this.selectedColumnIndex != null) {
        this.addElementToColumn(this.selectedSection, this.selectedColumnIndex, type);
      }
      this.clearSelectedTarget();
    },
    clearSelectedTarget() {
      this.selectedSection = null;
      this.selectedColumnIndex = null;
    },
    addElementToColumn(section, colIndex, type) {
      const element = {
        id: Date.now().toString(),
        type: type,
        css: "width:100%; height:64px; padding:5px;",
        properties: {}
      };
      if (type === "text") {
        element.properties.textContent = "New Paragraph";
      } else if (type === "heading") {
        element.properties.textContent = "New Heading";
        element.properties.level = "h1";
      } else if (type === "subheading") {
        element.properties.textContent = "New Subheading";
        element.properties.level = "h2";
      } else if (type === "image") {
        element.properties.src = "https://via.placeholder.com/150";
        element.properties.alt = "Placeholder";
        element.properties.width = "";
        element.properties.height = "";
      } else if (type === "list") {
        element.properties.ordered = false;
        element.properties.items = "Item 1\nItem 2";
        element.css = "width:100%; padding:  16px;";
        element.properties.itemCSS = "";
      } else if (type === "button") {
        element.properties.textContent = "Click Me";
        element.variant = "button";
      } else if (type === "anchor") {
        element.properties.textContent = "Link Text";
        element.properties.link = "";
        element.variant = "anchor";
      } else if (type === "input") {
        element.properties.value = "";
        element.properties.type = "text";
      } else if (type === "textarea") {
        element.properties.value = "";
      } else if (type === "video") {
        element.properties.src = "";
        element.properties.controls = true;
        element.properties.autoplay = false;
      }
      section.columns[colIndex].element = element;
      this.closeSidebar();
    },
    addElementToSection(section) {
      this.selectedSection = section;
      this.selectedColumnIndex = 0;
      this.openSidebar("element");
    },
    handleAddElementToColumn(section, colIndex, type) {
      this.addElementToColumn(section, colIndex, type);
    },
    editSection(section) {
      this.editTarget = section;
      this.editTargetType = "section";
      this.openSidebar("edit");
    },
    editElement(element) {
      this.editTarget = element;
      this.editTargetType = "element";
      this.openSidebar("edit");
    },

    deleteEdit() {
      if (this.editTargetType === "section") {
        this.page.sections = this.page.sections.filter(s => s.id !== this.editTarget.id);
      } else if (this.editTargetType === "element") {
        this.page.sections.forEach(sec => {
          sec.columns.forEach(col => {
            if (col.element && col.element.id === this.editTarget.id) {
              col.element = null;
            }
          });
        });
      }
      this.closeSidebar();
    },
    deleteSection(section) {
      this.page.sections = this.page.sections.filter(s => s.id !== section.id);
    },
    onSectionReorder() { }
  }
};
</script>
<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
}

.editor-header {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  background-color: var(--primary-color);
  color: #fff;
  position: sticky;
  top: 0;
}

.editor-header button {
  background: #fff;
  border: none;
  padding: 8px 12px;
  margin-right: 4px;
  cursor: pointer;
}

.editor-body {
  display: flex;
  flex: 1;
}

.editor-sidebar {
  position: fixed;
  top: 52px;
  left: 0;
  height: 100vh;
  width: 300px;
  z-index: 999;
  background: #f0f8ff;
  padding: 15px;
  label {
      display: block;
      font-size: 14px;
      margin-bottom: 4px;
      
    }
  .edit-form {
    display: flex;
    flex-direction: column;
    gap:8px;
    margin-bottom: 10px;
    
  }
  input, textarea, select {
    width: 100%;
    padding: 5px;
    border: 1px solid black;
    border-radius: 4px;
    resize: vertical;
  }
  input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #000;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #000;
}

input[type="checkbox"]:checked::after {
  content: "";
  position: absolute;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;

    button {
      background-color: transparent;
    }
  }

  button {
    background-color: white;
    color: var(--font-color);
    border: none;

    &.delete-button {
      color: #a72828;
      display: block;
      margin-top: 16px;

      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 12px;
      svg {
        transform: scale(.75);
      }
    }
  }

  h3 {
    margin-bottom: 24px;
  }

  .card {
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  ;
}

.card {
  width: 80px;
  height: 80px;
  background: #fff;
  border: 1px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.card-content {
  font-size: 14px;
  text-align: center;
}

.editor-canvas {
  flex: 1;
  padding: 20px;
  background: #f0f0f0;
  min-height: 600px;
}

.canvas-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  min-height: calc(100vh - 124px);
}

.placeholder {
  background: #fff;
  padding: 50px;
  text-align: center;
  margin-bottom: 20px;
  button{
    background-color: var(--primary-color);
    color:var(--font-color);
    border: none;
    padding: 8px 12px;
    
  }
}

.add-row {
  text-align: center;
  margin-top: 20px;
  padding-bottom: 24px;
}

.add-row button {
  padding: 8px 12px;
  background: var(--primary-color);
  border: none;
  cursor: pointer;
}

.drop-zone {
  position: relative;
  min-height: 600px;
  width: 100%;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}
</style>
