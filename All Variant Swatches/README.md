# Grouped Product Swatch

## Description

If you have products with any number of variants & options (1+ options), this Custom Block will render all options on your PDP.

## Setup Instructions

> Reach out to your Tapcart representative if you have any questions while configuring this Custom Block.

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [index.js](#) file in this folder, and paste it in the JS tab in the editor

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

### 6. Make color/font adjustments

The `:root` property at the top of **styles.css** allows for the quick-editing of swatch sizes & the font size.

```CSS
:root {
    --swatchOutline: lightgrey;
    --selectedSwatchOutline: black;
}
```

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="350" src="https://github.com/user-attachments/assets/67ba6ab7-ff93-4557-a393-686aeb377cac" alt="All Variant Swatches Custom Block Demo"/>
