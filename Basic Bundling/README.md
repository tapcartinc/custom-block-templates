# Basic Bundling Block

## Description
This block allows customers to add multiple products to the cart, with a single press of a button. Customer's can then receive a discount for adding a bundle to their cart through the use of Shopify Scripts that target line item attributes.

## How this block works
1. Uses [addToCart](https://docs.tapcart.com/docs/app-actions) App Action to add products to the cart with line item attributes included
2. A custom Shopify script will then need to check for the occurance of the included line item attributes, and issue a discount to the cart if they are present
3. Customer can then checkout or continue to browse products

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
2. Copy the HTML from [index.html](#) file in this folder, and paste it in the HTML tab in the editor
3. Copy the CSS from [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
4. Copy the Javascript from [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 3. Make some optional code edits
The following suggestions are worth considering to make this block more dynamic for your use-case

- Instead of hardcoding products, could instead make an API reqest to another service to obtain products to bundle. The [product.id](https://docs.tapcart.com/docs/variables) variable could be used as a basis for doing so if this block is placed on a product page.
- Optionally, instead of using an API to conditionally render the products for the bundle, you could add a conditional statement to the block that evaluates on the [product.id](https://docs.tapcart.com/docs/variables) to determine the products to bundle.
- Line 2 (HTML) should be edited to display an expected discount code
- Line 12 (HTML) should be edited to display your product information
- Line 13 (HTML) should be edited to display your product information
- Line 24 (HTML) should be edited to display your product information
- Line 25 (HTML) should be edited to display your product information
- Line 3-28 (JS) should be updated to reflect your specifc implementation fo the `addToCart` App Action
- CSS in general should be updated to reflect our brand

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `https://assets.website-files.com/616f0a7a027baaf59a43390b/62144e9b947056d34a2cb292_Termina-Demi.woff2`

### 5. If making this block conditional based on a given product, then add test values to the block's [Variable Preview Values](https://docs.tapcart.com/docs/variables)
- Specifically make note to set values for any `product` variables you use in your block

## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="402" alt="Block Preview" src="https://user-images.githubusercontent.com/15990327/202594948-b1b0ac76-7b9a-4864-9d27-913782422c5a.png">

