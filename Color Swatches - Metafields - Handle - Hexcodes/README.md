# Color Swatching using Product Handle, Metafields and Hexcodes

## Description
This block shows an example on how to generate color swatches on the PDP.  Color swatching has two main elements:
1. Product Grouping
2. Swatch generating

In this example, we are using a combination of the PRDOUCT HANDLE, METAFIELDS, and HEXCODES to generate the color swatch with associated functionalities (i.e Tapcart openProduct action)

## How this block works
1. Product Grouping logic is implemented based off the METAFIELDS and PRODUCT HANDLES
2. The product handle is used as a base to find all related products based on the colors.available metafield value.  
3. After the product grouping is sanitized, the Shopify Storefront API is used to retrieve all products within the group.
4. Hexcodes found in the CSS are used to generate the color swatches
4. The open/product Tapcart function is used to create functionality on each swatch selection.  

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
4. Copy the JSON from the [variable-preview-values.json](#) file in this folder, and paste it in the Variable Preview Values text box in the editor (Located in the 'Settings' tab)

### 4. Make some code edits (No code edits are needed for this function to work out of box at the moment)  
Lines 1 & 2: Replace STORE NAME GOES HERE with your store name and STOREFRONT API TOKEN with your Shopify storefront api token.

Having trouble finding your store name?  If your Shopify URL is this: tapcart-boutique.myshopify.com, then your store name will be tapcart-boutique.  Reach out to your account manager or contact customblocks@tapcart.co if you have any questions!  

The code will need to be heavily modified to fit your needs. This is just an example/guide to help you on your way in generating color swatches!  

NOTE - You will need to add additional hexcodes to the CSS file if you introduce new colors into your product assortment.  

### 5. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`


## Block preview
You'll know your configuration was successful if your block is added, then dragged/dropped inside of the PDP and looks like this:

<img width="442" alt="Screenshot 2023-08-03 at 4 51 32 PM" src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/d2844b85-a554-4926-8c48-7af6d72d712c">
