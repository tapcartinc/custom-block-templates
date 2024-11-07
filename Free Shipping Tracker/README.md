# Free Shipping Tracker (Cart)

## Description
This block allows customers to see a free shipping progress bar in cart. 

## How this block works
1. Uses Tapcart.variables.cart.subtotal to fetch cart total to check against the target amount set by merchants.
2. Once the cart total exceeds or equates the target amount, users would be prompt that their order qualifies for free shipping.

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from [index.html](https://github.com/Tapcart-Templates/custom-block-templates-internal-dev/blob/main/Shipping%20Tracker/index.html) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from [styles.css](https://github.com/Tapcart-Templates/custom-block-templates-internal-dev/blob/main/Shipping%20Tracker/styles.css) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from [script.js](https://github.com/Tapcart-Templates/custom-block-templates-internal-dev/blob/main/Shipping%20Tracker/scripts.js) file in this folder, and paste it in the JS tab in the editor

### 3. Make some required code edits
The following suggestions should be considered to make this block more dynamic for your use-case:

- Line 6 (JS) should be edited to assign all the currencies you want to provide free shipping tracker for.
- Line 13 (JS) should be edited to assign target amount for each currency.
- Line 22 (JS) should be edited to only display tracker for currencies selected on line 6.
- CSS in general should be updated to reflect your brand

### 4. Add a custom font
Import a custom font to conform to your app's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.


## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="463" alt="Screenshot 2023-10-06 at 4 46 42 AM" src="https://github.com/Tapcart-Templates/custom-block-templates-internal-dev/assets/17016704/5da83f41-2936-4934-bd04-96b28120ad2d">

<img width="458" alt="Screenshot 2023-10-06 at 4 46 57 AM" src="https://github.com/Tapcart-Templates/custom-block-templates-internal-dev/assets/17016704/b404967f-fde1-411f-a779-c47766ceab28">

