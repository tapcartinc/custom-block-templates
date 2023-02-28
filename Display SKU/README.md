# Display Sku

## Description
This block allows customers to add a SKU value to their product detail page.
This block takes advantage of Tapcart variables, which are built-in inputs for getting context on the user: https://docs.tapcart.com/docs/variables

## How this block works
1. A skuFinder() function is triggered when the Product Detail Page is rendered
2. It retreives the SKU (Stock Keeping Unit) of the selected variant using .find() on the variants array
3. The SKU value is then displayed inside the HTML "sku" div class
4. Additionally there is a Tapcart event handler that updates the selected variant dynamically when product info changes

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Import any required Libaries (No libraries are needed for this function to work out of box at the moment)
In the future should you need to important libraries go to the 'Import Libraries' dropdown in the 'Settings' tab of the [Custom Blocks Editor.](https://app.tapcart.com/custom-blocks).

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor
4. Copy the JSON from the [variable-preview-values.json](#) file in this folder, and paste it in the Variable Preview Values text box in the editor (Located in the 'Settings' tab)

### 4. Make some code edits (No code edits are needed for this function to work out of box at the moment)  
This function will work out of box as is


### 5. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`


## Block preview
You'll know your configuration was successful if your block is added, then dragged/dropped inside of the PDP and looks like this:

![sku](https://user-images.githubusercontent.com/122114430/217879992-03d12337-cf29-40f5-89a2-43c90a65c229.png)


