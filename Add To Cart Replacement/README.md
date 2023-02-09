# Add To Cart Clone

## Description
This block allows customers to replace the native add to cart button.
**[REQUIRED]** A developer will need to make updates for this code to work in production.

## How this block works
1. When viewing an item on the product detail page the submit button will be present
2. The button is clicked, and the Tapacart "addToCart" action is processed
3. Line item attributes will need to be declared and defined in order to be pushed to the cart
4. You can also determine any necessary rules and conditions based on things like inventory for example

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Import Libararies 
To import, copy each library below, and paste it in the 'Import Libraries' dropdown in the 'Settings' tab of the [Custom Blocks Editor.](https://app.tapcart.com/custom-blocks).

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor
4. Copy the JSON from the [variable-preview-values.json](#) file in this folder, and paste it in the Variable Preview Values text box in the editor (Located in the 'Settings' tab)

### 4. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 

- **[REQUIRED]** Line 11, 29, 36 (JAVASCRIPT) should be commented out or removed if you don't intend to use IF/ELSE conditions

### 5. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`

### 6. Add test values to the block's Variable Preview Values
This block leverages the following Variables and App Actions:
- (https://docs.tapcart.com/docs/app-actions)

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block looks like this:

Success:

https://user-images.githubusercontent.com/122114430/217638400-781c808b-0438-4342-9645-e8a2397755e7.mp4



Error:

https://user-images.githubusercontent.com/122114430/217639132-a47b3cb3-0a8b-4f05-9987-842d2ddb1e0a.mp4










