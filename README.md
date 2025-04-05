# webweaver
[![Deploy on Render](https://img.shields.io/badge/Deploy-Render-blue)](https://webweaver-28s4.onrender.com)  
[![Node version](https://img.shields.io/badge/Node->20-brightgreen)](https://nodejs.org/)

WebWeaver is a user-friendly website builder built on Vue.js, designed to streamline the website creation process. With an intuitive drag-and-drop interface, customizable components, and a real-time preview mode, WebWeaver empowers users to quickly design and launch modern, responsive websites without extensive coding knowledge.

## Live Demo

View the live application at: [https://webweaver-28s4.onrender.com](https://webweaver-28s4.onrender.com)

## Features

- **Drag-and-Drop Interface:**  
  Easily rearrange sections and elements with a robust drag-and-drop system built on [vue-draggable-next](https://www.npmjs.com/package/vue-draggable-next).

- **Customizable Sections and Elements:**  
  Create rows with 1–6 columns and add a variety of elements including:
  - **Text:** Paragraphs rendered as `<p>` tags.
  - **Headings/Subheadings:** Choose HTML heading levels (H1–H6) for primary titles and subheadings.
  - **Images:** Specify URL, width, height, and alt text.
  - **Lists:** Create ordered or unordered lists with customizable list items and individual item styling.
  - **Buttons and Links:** Toggle between a button and an anchor tag.
  - **Input & Textarea:** Form inputs with configurable types.
  - **Video:** Add videos with options for controls and autoplay.

- **Preview:**  
  Toggle preview mode to see a fully interactive, production-ready version of your website with no editing controls visible.

- **Persistent Storage & CI/CD Pipeline:**  
  Save your project to localStorage and leverage Render's CI/CD pipeline to automatically redeploy on every push to GitHub.

## Prerequisites

- **Node.js:** v20 or higher  
  [Download Node.js](https://nodejs.org/)

## Running Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/HitendraSinghRathore/webweaver.git
   cd webweaver
   ```
2. **Checkout the Main Branch:**
   ```bash
   git checkout main
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Start the Development Server:**
   ```bash
   npm run serve
   ```
5. **Open in Browser: Open your browser and navigate to** [localhost:8080](http://localhost:8080)

## Build for production

To compile and minify for production:
```bash
npm run build
```
This will generate the production-ready files in the `dist` directory.

## Deployment on Render

**Sign Up & Connect GitHub:**

1.  Create an account on [Render](https://render.com/).
2.  Connect your GitHub account from the Render dashboard.

**Create a New Static Site:**

1.  Click the **New** button.
2.  Select **Static Site**.
3.  Choose your repository.
4.  Select the main branch (typically `main`).

**Configure Build Settings:**

* **Build Command:**
    ```bash
    npm install && npm run build
    ```
* **Publish Directory:**
    ```
    dist
    ```

**Automatic Deploys:**

* Enable **Auto-deploy** so that every push to your GitHub repository triggers a rebuild and redeployment.

Once deployed, the live site is available at [https://webweaver-28s4.onrender.com](https://webweaver-28s4.onrender.com).

## Screenshots and Demo

[Watch the Demo Video](https://github.com/HitendraSinghRathore/webweaver/blob/main/src/assets/demo.mp4?raw=true)

![Screenshot of WebWeaver](https://github.com/HitendraSinghRathore/webweaver/blob/main/src/assets/image1.png)
---
![Screenshot of WebWeaver](https://github.com/HitendraSinghRathore/webweaver/blob/main/src/assets/image2.png)
---
![Screenshot of WebWeaver](https://github.com/HitendraSinghRathore/webweaver/blob/main/src/assets/image3.png)
---
![Screenshot of WebWeaver](https://github.com/HitendraSinghRathore/webweaver/blob/main/src/assets/image4.png)
---
![Screenshot of WebWeaver](https://github.com/HitendraSinghRathore/webweaver/blob/main/src/assets/image5.png)
---
![Screenshot of WebWeaver](https://github.com/HitendraSinghRathore/webweaver/blob/main/src/assets/image6.png)
---


## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License
This project is licensed under the MIT License.

