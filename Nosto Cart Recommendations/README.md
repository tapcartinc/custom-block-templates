# Product Recommendations (SearchSpring API)

## Description
This block allows customers to fetch nosto cart recommendations configured in the Nosto Dashboard. It is typically used to power product carousels in cart.

## How this block works
1. Gets the product recommendations for Cart from Nosto API.
2. Makes a request to the Nosto API using the slot id.
3. Gets a list of products.
4. Displays the list of products as a carousel.

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'


### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor


### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 
- Custom Blocks SDK version should be 1.1v or above.
- **[REQUIRED]** Line 2 (JAVASCRIPT) should be replaced by the cart recommendations slot id from Nosto Dashboard.
- **[REQUIRED]** Line 3 (JAVASCRIPT) should be replaced by the API access key from Nosto Dashboard.

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.


## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="466" alt="Screenshot 2023-11-27 at 3 24 38 PM" src="https://github.com/Tapcart-Templates/custom-block-templates/assets/17016704/41be72fc-cea0-4369-94bf-2d4a34f66f05">

