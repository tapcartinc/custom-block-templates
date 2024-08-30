# Inventory-Based Incentive

## Description

This Custom Block will display a custom message on the PDP based on the item's current stock quantity. A common use-case would be to display "Low Stock - Buy Soon!" by the **Add To Cart** button if there are less than 25 left of the currently selected variant.

> **Note:** In order to make this block work, ensure that your Storefront API token has **unauthenticated_read_product_inventory** access. Read more [here](https://shopify.dev/docs/api/usage/access-scopes).

## How this block works

1. You configure the block with your thresholds & Storefront API credentials.
2. The Custom Block retrieves variant quantities using the Storefront API.
3. When the variant's stock quantity is less than a threshold, the respective message is displayed. If no thresholds are crossed, the block is hidden.

## Setup Instructions

> Reach out to your Tapcart representative if you have any questions while configuring this Custom Block.

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on **Name your block**

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [index.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits

Configure your tiers (thresholds) using `THRESHOLDS` at the top of **index.js**. You can configure as many thresholds as you want. Keep in mind, the block will _always_ consider the smallest threshold amount first - order does not matter.

```JavaScript
// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
const STOREFRONT_TOKEN = 'YOUR-STOREFRONT-TOKEN';

const THRESHOLDS = [
    {
        // If the quantity available of the current variant is lower
        // than this amount, display the message.
        inventoryAmount: 50,
        message: 'Very Low Inventory! Order Soon.',
        color: '#FF4439',
    },
    {
        inventoryAmount: 100,
        message: 'Low Inventory! Order Soon.',
    },
];
// * Config
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="400" src="https://github.com/user-attachments/assets/3fd3504e-0632-4900-b37b-fa839523c825" alt="Inventory-Based Incentive Custom Block Demo"/>
