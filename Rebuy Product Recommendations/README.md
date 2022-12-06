# Rebuy Product Recommendations

## Description
This block allows customers to receive product recomendations at the bottom of product details pages. Customers can then add recommended product directly to their cart from this block.

## How this block works
1. Block checks Rebuy for recommended products for the current product page
2. Recommended products are returned via the Rebuy API and are presented to the user
3. Customer can then add recommended products to the cart 
4. From here, customer can keep shopping or go to the cart to checkout

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Import the following libraries
To import, copy each library below, and paste it in the 'Import Libraries' dropdown in the 'Settings' tab of the [Custom Blocks Editor.](https://app.tapcart.com/custom-blocks).

- `loremipsum.js`
- `loremipsum.js`
- `loremipsum.js`

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
2. Copy the HTML from [index.html](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Rebuy%20Product%20Recommendations/index.html) file in this folder, and paste it in the HTML tab in the editor
3. Copy the CSS from [styles.css](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Rebuy%20Product%20Recommendations/styles.css) file in this folder, and paste it in the CSS tab in the editor
4. Copy the Javascript from [script.js](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Rebuy%20Product%20Recommendations/scripts.js) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. The template also contains comments within the block that point out other optional edits to consider.

- **[REQUIRED]** Line 23 (HTML) should be replaced by your API key

### 5. Add a custom font
Import the Tapcart font, or a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks). If using the Tapcart font (below), it will work upon pasting. If using a custom font link, the reference to the font will need to be updated in the CSS tab in the editor.

- `fontlink.com`

### 6. Add test values to the block's Variable Preview Values
This block leverages the following variables:
- `variable.property`

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="402" alt="Block Preview" src="https://user-images.githubusercontent.com/15990327/202594948-b1b0ac76-7b9a-4864-9d27-913782422c5a.png">

