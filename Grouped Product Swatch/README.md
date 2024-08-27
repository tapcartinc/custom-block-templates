# Grouped Product Swatch

## Description

If you group your products by using collections, this Custom Block can be set up to swatch through color, size, or other variation options at the product-level. Whether collection handles are stored in metafields, tags, or variants, this block will still work for you!

## How this block works

1. Grab the currently selected product's group collection handle
2. Retrieve all products in the group collection
3. Render an option for each product in the collection

## Setup Instructions

> Reach out to your Tapcart representative if you have any questions while configuring this Custom Block.

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [index.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits

Begin configuring the Custom Block by adding your Shopify URL & [Storefront API](https://shopify.dev/docs/api/storefront) token.

The `getCollectionHandle()` function is used when retrieving the collection tied to a certain product, while `getSelectedOptionName()` grabs the option name from the product object.

```JavaScript
// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
const STOREFRONT_TOKEN = 'YOUR-STOREFRONT-TOKEN';

// The title to display above the swatches. E.g. "Color"
const OPTION_TITLE = 'Color';

const util = {
    // Your own custom logic for retrieving the handle to the collection grouping the
    // products (e.g. one collection of the same shoe product, but different colors)
    getCollectionHandle: (product) => product.metafields?.color_info?.colors_collection_handle,
    // Your own custom logic for grabbing a given product's corresponding option (e.g. Black)
    getSelectedOptionName: (product) => product.metafields?.color_info?.product_color,
};
// * Config
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

### 6. Make color/font adjustments

The `:root` property at the top of **styles.css** allows for the quick-editing of swatch sizes & the font size.

```CSS
:root {
    --size: 60px;
    --fontSize: 0.95rem;
}
```

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="350" src="https://github.com/user-attachments/assets/58ced804-cebf-4165-b7b6-24f4abeef8b0" alt="Grouped Product Swatch Custom Block Demo"/>
