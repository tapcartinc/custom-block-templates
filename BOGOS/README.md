# BOGOS - Cart Message (optional)

## What is BOGOS
BOGOS is a powerful app to boost sales for your Shopify Store with promotions, including Free Gifts With Purchase, Discounts, Bundles and many more.

## Description
BOGOS supports Tapcart users by helping them create and run sales promotions on both their mobile and online stores, which will improve the conversion rate and average order value.

## How the blocks work
1. These 2 blocks are REQUIRED and necessary for the offers to work
- BOGOS CORE: Drag it to Home page
- BOGOS - Gift slider: Create a block-based custom screen and drag the Gift Slider block into it.  THEN, create a Banner that links to the custom screen.  Add this banner to the Tapcart cart so users can click.  

2. These 2 blocks are OPTIONAL

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block for each of the BOGOS blocks
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block' 

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor
4. Copy the JSON from the [variable-preview-values.json](#) file in this folder, and paste it in the Variable Preview Values text box in the editor (Located in the 'Settings' tab)

### 3. Make some code edits (No code edits are needed for this function to work out of box at the moment)  
- **[REQUIRED]** Line 4 (in JS of each block) - add your Shopify domain
- **[REQUIRED]** Line 7 (in JS of each block) - add your API Key


### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`



