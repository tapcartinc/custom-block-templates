# Shipping Protection Upsell (Monster ShipProtect)

## Description

Add this block to your Tapcart app to integrate [Monster ShipProtect](https://apps.shopify.com/shipping-protection) seamlessly into your app's cart experience.

When displayed, automatically enables & adds the Shipping Protection item to the cart.

The user can remove the item from the cart either by switching the toggle off, or removing the item manually. The toggle/checkbox will reflect manual removals from the cart.

> **Note:** Due to integration difficulties, the item price on the widget itself only displays for customers using your Shopify shop's base currency (e.g. **USD**).

## How this block works

1. Spoofs the `window` object a bit to mimic your Shopify site's environment.
2. Injects the ShipProtect script into the Custom Block.

## Setup Instructions

> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block.

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 3. Add your shop URL

Edit the following bit of code at the top of **script.js** to match your **myshopify** URL:

```JavaScript
// * Config
const MY_SHOPIFY_URL = 'YOUR-SHOP-ID.myshopify.com';
// * Config
```

### 4. Add a custom font

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

## Block preview

You'll know your configuration was successful if your block looks like this:

<img src="https://imgur.com/cb731ba1-4232-4914-bdef-ea566a962bdd" alt="ShipProtect widget"/>
