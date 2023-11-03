# PDP Quantity Selector

## Description
This is an Add to Cart replacement block designed to implement a quantity selector within the Product Display Page (PDP). Users have the option to input their desired quantity manually or manipulate quantity levels using the integrated controls (+ or -).  

## How this block works
1. A div is created in the html to display the quantity and quantity controls.  
2. Inside of the javascript file, there are various functions that provide function to the controls and add to cart abilities.  

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block. Make sure that the metafields are enabled to the Storefront: https://help.shopify.com/en/manual/custom-data/metafields

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 3. Make some code edits
No code edits are required to power this block.  
    

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block preview looks like this:

<img width="419" alt="block preview" src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/3f9aeb15-9e13-44c5-bb31-fcface356eeb">


