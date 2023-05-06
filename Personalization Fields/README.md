# Personalization Fields (Add to Cart Line Item Attributes)

## Description
This block allows customers to input personalization text. This allows merchants to offer unique experiences on products to customers.

## How this block works
1. This block has 3 free form inputs for the end user to add. They are required by default.
2. The javascript captures the values passed inside of the fields once the submit button is clicked.
3. There is a custom message that updated "Added".
4. The message will revert to the regular "Add to Cart" text after 2 seconds.

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

- **[REQUIRED]** Line 4, 7, 19 (HTML) should be replace with your own names for the personalization fields

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS. Right now the default is set to circular-std

- `https://fonts.cdnfonts.com/css/circular-std`

## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="426" alt="personalization" src="https://user-images.githubusercontent.com/122114430/236593422-2d9ac60d-b776-4a39-add4-996bc6d04daf.png">



