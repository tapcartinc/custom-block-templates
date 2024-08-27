# ShopPay PDP Integration

## Description

Place this Custom Block on your PDP to display the ShopPay installment for the selected variant.

The number of installments can be hard-configured, while it is assumed that there is zero interest.

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

If the number of installments your shop supports differs from **4**, the banner can be changed through `NUMBER_OF_INSTALLMENTS` (seen at the top of **index.js**).

```JavaScript
// * Config
const NUMBER_OF_INSTALLMENTS = 4;
// * Config
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="350" src="https://github.com/user-attachments/assets/7d067afb-c5e0-4814-97f7-d000253ddee9" alt="ShopPay PDP Integration Demo"/>
