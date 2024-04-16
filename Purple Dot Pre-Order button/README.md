# Purple Dot - Pre Order button for the Product Detail Page

## What is Purple Dot?
Purple Dot takes the headache out of pre-order operations – so that modern eCommerce can always be selling. Purple Dot enables FTC compliant pre-orders.

## Why Partner + Tapcart? 
Hundreds of brands sell more by selling earlier with Purple Dot on the web and want to do the same on Tapcart.

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block

2. Name the block "Purple Dot Preorder Button"

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor
4. Copy the JSON from the [variable-preview-values.json](#) file in this folder, and paste it in the Variable Preview Values text box in the editor (Located in the 'Settings' tab)

### 4. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 

- **[REQUIRED]** Line 3 - If you want Purple Dot only enabled for a specific set of currencies then edit the `supportedCurrencies` array with the currency codes you want to enable Purple Dot for.

- **[REQUIRED]** Line 5 - Replace <YOUR_API_KEY> with your Purple Dot API key.  Your API key can be found on the integration page on the Purple Dot merchant portal

Step 3: Replace the Add to Cart block on with the custom block code  block “Purple Dot Preorder Button” and conditionally tag the custom block with the product tag ‘purple-dot-has-variant-on-preorder’
> The Purple Dot Preorder Button custom block will only appear on products that have the product tag "purple-dot-has-variant-on-preorder". 

> Your Tapcart rep might need to adjust your app settings to allow for the replacement of your native Add to Cart button. 

Step 4: Update the styles in styles.css file for the selector `.button` to match the native button’s look and feel


## Got Questions? 
Email Tapcart Custom Block support at customblocks@tapcart.co