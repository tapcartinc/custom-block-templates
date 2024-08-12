# Highlighted Collections

Display a set of collection names & their icons, grouped potentially by brand, theme, color, etc.

Each collection button leads to its respective in-app collection page.

## Setup Instructions

> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block

2. Name the block "Purple Dot Preorder Button"

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some configuration edits

Add your MyShopify URL, [Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/getting-started) token, and list of IDs for the collections you'd like to display.

```JavaScript
// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
const STOREFRONT_TOKEN = 'YOUR-STOREFRONT-TOKEN';

const HEADER_TEXT = 'Some header text';
const COLLECTION_IDS = [];
// * Config
```

Colors & sizing can be edited via `:root` at the top of **styles.css**.

## Block preview

You'll know your configuration was successful if your block is added, configured, then dragged/dropped inside of a page and looks like this:

![Collection Highlights Preview](https://github.com/user-attachments/assets/4d6a8385-bdb4-496c-b6a7-26074cd44ad1)
