# Carousel

## Description
This block allows customers to view a carousel on product detail pages.
**[REQUIRED]** A developer will need to make updates for this code to work in production. 
This primarily serves as inpiration to add to your PDP.

## How this block works
1. This block uses static HTML to display and image, product title, price, compare at price.
2. This is styles so that it can scroll smoothly for a hand swipe to the right and left
3. In order for this code to open and display products, you'll need to at Tapcart Actions. See documentation

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor

### 3. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `@import url('https://fonts.cdnfonts.com/css/circular-std');`

## Block preview