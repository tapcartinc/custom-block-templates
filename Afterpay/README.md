# Afterpay

## Description
This block displays the afterpay logo, and informs customers of the after pay pricing option which is the price divided by an evenly distributed number of payments and this example being 4 payments.

## How this block works
1. Block checks for the product price dynamically
2. Then passes the given price to a function which divides it by 4 with 2 decimal places
3. This is then passed to the div inside of the HTML markup
4. From here, customer can decide on the payment options during checkout

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
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 

- **[REQUIRED]** Lines 9 and 10 (Javascript) can be updated depending on the number of divisible payments you offer your customers.

### 5. Add a custom font (Optional)
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.


