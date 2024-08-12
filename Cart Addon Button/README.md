# Cart Addon Button

This block is tied to a particular **Variant ID**, configured by you.

Once the addon button is clicked, your item is added to the user's cart, and the button disappears. If the user removes the item from their cart, the button will re-appear. If the user already has the item in their cart, the button will not appear at all.

## Potential use-cases

-   Shipping protection
-   Gift wrapping/boxes
-   Product-level warranty/insurance
-   (+) Autographed by creator
-   etc.

## How this block works

1. Renders a button with your custom icon & text.
2. Reacts to user-clicks & changes to the cart.

## Setup Instructions

> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the CSS from the [index.js](#) file in this folder, and paste it in the CSS tab in the editor

### 3. Add a custom font

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

See [FontLink](https://fontlink.com).

### 4. Make some code edits

The following lines of code at the top of the Custom Block's JavaScript will need to be edited for the block to work as expected:

```JavaScript
// * Config
const ICON_URL = 'https://cdn-icons-png.flaticon.com/512/2759/2759804.png';
const BUTTON_TEXT = 'Add Gift Wrapping';

// The variant ID to observe (which item will be added to the cart)
const VARIANT_ID = 1234567890;
// * Config
```

## Block preview

You'll know your configuration was successful if your block looks like this:

<img src="https://github.com/user-attachments/assets/9011fc94-b41e-4ad3-865a-0938c65ef64b" alt="Block preview" width="400"/>
