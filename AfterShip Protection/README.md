# AfterShip Protection

## Description

This block displays an option for customers on cart page, allow them easily add protection to their order.

## How this block works

1. Block check cart page subtotal for calculating the price for protection
2. Customer can then add/remove protection, block will add/remove corresponding AfterShip Protection item into cart
3. From here, customer can keep shopping or process checkout

## Setup Instructions

> Copy and Paste this in the Custom Block and make any necessary changes needed

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Import the following libraries

No libraries are needed for this block to work out of box.

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [scripts.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits

The following lines of code in the custom block will need to be edited for the block to work as expected.

- **[REQUIRED]** Complete the setup on your [AfterShip account](https://admin.aftership.com/protection?utm_source=tapcart&utm_medium=custom+block+template)
- **[REQUIRED]** Custom block SDK version should higher than v1.5
- **[REQUIRED]** Lines 3 (HTML) should be replace with subdomain of your shopify store permanent_domain. E.g. {{subdomain}}.myshopify.com

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

## Block preview

<img src="https://assets.am-static.com/aftership-protection/tapcart/images/708dab69f5cd406fe2b99d421992f43d" alt="AfterShip Protection custom block preview" width="350"/>