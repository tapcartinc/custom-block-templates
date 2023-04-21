# Currently Not In Stock

## Description
This block allows customers to know if a product or selected variant is on backorder. This template uses the Shopify storefront api in order to pull this information in order to display in the user-interface. To learn more check out the Shopify API documentation: https://shopify.dev/docs/api/storefront/2023-01/objects/ProductVariant#field-productvariant-currentlynotinstock -> "Whether a product is out of stock but still available for purchase (used for backorders)."

<img width="842" alt="in_stock" src="https://user-images.githubusercontent.com/122114430/233744828-fcc2dc29-992f-4cb4-ae2c-db32c5cb900e.png">


## How this block works
1. Block will take the merchants storefront configuration credentials. (make sure they're scoped to read only)
2. This page will create a network request, and pull down the ProductVariant.currentlyNotInStock boolean values
3. If the product is out of stock it will display a message that states: Preorder: Expected Delivery 3-4 Weeks
4. In addition this template offers a replacement Preorder Add to Cart replacement example

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

- **[REQUIRED]** Line 27 and 31 (JAVASCRIPT) should be replaced by your store settings. You should also update the JSON selected variant id with an out of stock/backorder item if you'd like to test the template inside of the custom block preview screen.

If you have no need for replacing the add to cart button, you can remove lines 57-65 of the (JAVASCRIPT) and remove line 3 from the (HTML).

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`

### 5. Add test values to the block's Variable Preview Values
This block leverages the following variables:
- `variable.property`

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="419" alt="currentlyNotInStock" src="https://user-images.githubusercontent.com/122114430/233744769-4a4ae298-b28d-4643-a0af-31528fabe96b.png">


