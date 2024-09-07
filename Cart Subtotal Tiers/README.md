# Cart Subtotal Tiers

<img width="450" src="https://github.com/user-attachments/assets/bdfc9494-0316-4ca0-a9f6-c3b2d616b230" alt="Cart Subtotal Tiers - Multi Threshold - Reached a few tiers"/>

## Description

If you award discounts, free shipping, or cart items to your customers based on their cart's subtotal, this block serves as a visual representation of their progress through your custom tiers. This block supports all cases from simple single-tier ones, to complicated multi-tier flows with cart item gifts.

For example, your tiers may be:

-   $50+ - Free Shipping
-   $75+ - Free Random Gift
-   $150+ - Free Hat (added to cart)

## How this block works

1. You configure the block with your tiers.
2. The block renders the progress bar & info, reacting to any changes in the cart.
3. For tiers with `addToCart` functionality, the block removes/adds items to the cart according to which tiers have been reached.

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

Configure your tiers (thresholds) using `THRESHOLDS` at the top of **index.js**. You can configure as many tiers as you want.

```JavaScript
// * Config
const THRESHOLDS = [

];
// * Config
```

Example:

```JavaScript
const THRESHOLDS = [
    {
        amount: 50,
        title: 'Free Shipping',
    },
    {
        amount: 75,
        title: 'Free Random Gift',
    },
    {
        amount: 150,
        title: 'Free Hat',
        // If you'd like an item to be added to the cart, you must include
        // the Product ID & Variant ID here
        addToCart: {
            productId: '123129879871239',
            variantId: '543895934875563',
        }
    },
]
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

### 6. Make color/font adjustments

The `:root` property at the top of **styles.css** allows for the quick-editing of swatch sizes & the font size.

```CSS
:root {
    --fontSize: 0.95rem;
    --primary: rgb(0, 33, 59);
    --secondary: white;
}
```

## Block preview

You'll know your configuration was successful if your block renders in the editor:

### With a single threshold

<img width="450" src="https://github.com/user-attachments/assets/1e1899f7-d1f7-455c-a8a0-53583e88b684" alt="Cart Subtotal Tiers - Single Threshold - Progress"/>

<br/>

<img width="450" src="https://github.com/user-attachments/assets/2155ad83-f78c-4623-8094-36868e6e7c96" alt="Cart Subtotal Tiers - Single Threshold - Complete"/>

### With multiple thresholds

<img width="450" src="https://github.com/user-attachments/assets/f2cd2307-0913-43c2-8725-54f2151aa539" alt="Cart Subtotal Tiers - Multi Threshold - Progress"/>

<br/>

<img width="450" src="https://github.com/user-attachments/assets/bdfc9494-0316-4ca0-a9f6-c3b2d616b230" alt="Cart Subtotal Tiers - Multi Threshold - Reached a few tiers"/>

<br/>

<img width="450" src="https://github.com/user-attachments/assets/9c1a59d7-5c2b-4b5f-adae-69cbf83ee2fa" alt="Cart Subtotal Tiers - Multi Threshold - Complete"/>
