# Color Swatching using Product Variants

## Description
This block shows an example on how to generate color swatches on the PDP.  Color swatching has two main elements:
1. Product Grouping
2. Swatch generating

In this example, we are using a product's variants to generate the color swatch with associated functionalities (i.e Tapcart openProduct action)

## How this block works
1. Product Grouping logic is implemented based off the product's list of variants.
2. The code utilizes the product's color options to determine the available color choices.  
3. The code iterates through the variants, extracting one product for each color. These products serve as the source for the openProduct Tapcart action.
4. CSS classes generate the colors, with the CSS properties containing values in either hexcode or image URL format.

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Import any required Libaries (No libraries are needed for this function to work out of box at the moment)
In the future should you need to important libraries go to the 'Import Libraries' dropdown in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks).

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits (No code edits are needed for this function to work out of box at the moment)  

The code will require slight adjustments to match your specific requirements. For instance, if your product variant titles differ from those presented in this code example, you will need to make modifications to the code block between lines 37 and 46.

This is just an example/guide to help you on your way in generating color swatches!  

### 5. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`


## Block preview
You'll know your configuration was successful if your block is added, then dragged/dropped inside of the PDP and looks like this:

<img width="403" alt="Color Swatch example" src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/3fd5af3d-4d0a-4306-a4e4-ed45e7c89da9">

