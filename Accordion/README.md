# Accordion

## Description

Display an interactive accordion with your custom HTML as the content. Integrate product descriptions, size charts, shipping info, video embeddings, and more into this Custom Block.

## Setup Instructions

> Reach out to your Tapcart representative if you have any questions while configuring this Custom Block.

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [index.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits

Configure the Custom Block with your custom `TITLE` and `CONTENT` (seen at the top of **index.js**).

```JavaScript
// * Config
const TITLE = 'Product Details';
const CONTENT = Tapcart.variables.product?.description;
// * Config
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

### 6. Make color/font adjustments

Change the font color with the root property at the top of **index.css**, and make any additional CSS adjustments per your custom HTML (added via `CONTENT`).

```CSS
:root {
    --fontColor: black;
}
```

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="350" src="https://github.com/user-attachments/assets/3f502408-28f6-4eb7-9bff-12058e751491" alt="Accordion Custom Block Demo"/>

<img width="350" src="https://github.com/user-attachments/assets/c28c2647-840e-4c26-bb76-5aed84c19fd0" alt="Accordion Custom Block Demo - Expanded"/>
