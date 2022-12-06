<img height="55" alt="ReBuy Logo" src="https://user-images.githubusercontent.com/15990327/205843090-3bdf1e11-7ffe-4120-a658-a815b40ccabc.png">

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

- `JsBarcode`
- `Font Awesome`

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
2. Copy the HTML from [index.html](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Rebuy%20Product%20Recommendations/index.html) file in this folder, and paste it in the HTML tab in the editor
3. Copy the CSS from [styles.css](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Rebuy%20Product%20Recommendations/styles.css) file in this folder, and paste it in the CSS tab in the editor
4. Copy the Javascript from [script.js](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Rebuy%20Product%20Recommendations/scripts.js) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. The template also contains comments within the block that point out other optional edits to consider.

- **[REQUIRED]** Line 23 (HTML) should be replaced by your API key

### 5. Add test values to the block's Variable Preview Values
This block is required to use the following variable:
- `product.id`

To preview this block as expected, a value will need to be assigned for each required variable included in the block. To do this, add a relevant value for `product.id` by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block looks like this:
<img width="397" alt="Screenshot 2022-12-05 at 10 54 24 PM" src="https://user-images.githubusercontent.com/15990327/205842139-40e906e6-7f41-47b8-8076-874e19e75445.png">

