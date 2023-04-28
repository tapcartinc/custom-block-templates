# Junip Reviews

## Description
This block allows customers to view reviews from the Junip platform. Leading to better conversion rates on product detail pages.

## How this block works
1. Block checks for junip store credentials
2. Looks for the product id
3. The junip source code then renders the related reviews

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor
4. Copy the JSON from the [variable-preview-values.json](#) file in this folder, and paste it in the Variable Preview Values text box in the editor (Located in the 'Settings' tab)

### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 

- **[REQUIRED]** Line 2 (HTML) should be replaced by your API key -> data-store-key="Your-Key-Goes-Here"

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`

### 5. Add test values to the block's Variable Preview Values
This block leverages the following variables:
- `product.id`

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block looks like this:


