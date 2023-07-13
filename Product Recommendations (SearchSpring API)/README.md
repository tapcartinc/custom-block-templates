# Product Recommendations (SearchSpring API)

## Description
This block allows customers to fetch personalized recommendations configured in the Searchspring Management Console. It is typically used to power product carousels on pdps.

## How this block works
1. Gets the current product on pdp using Tapcart variables.
2. Makes a request to the SearchSpring API using the product id.
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

- **[REQUIRED]** Lines 2 (JAVASCRIPT) should be replaced by your side Id provided by Search Spring.

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.


## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="406" alt="searchspring-prod" src="https://github.com/Tapcart-Templates/custom-block-templates-internal-dev/assets/17016704/d3ccb7b2-9b27-4050-bf48-771bcf8d461f">


