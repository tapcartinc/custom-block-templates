# Klayvio Back in Stock

## Description
This custom block integrates a Klaviyo Back in Stock functionality into the add-to-cart replacement block.

## How this block works
1. The block checks to see if the selected variant's isAvailable property is set to true or false
2. If the isAvailable value is false, then the custom block will display the Notify me button.
3. The block allows the user to input their email address.  
4. The email is sent to the Klayvio Back in Stock endpoint for processing.
  

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

- **[REQUIRED]** Line 1 (JavaScript) should be replaced by your Klayvio key -  "YOUR KLAYVIO KEY HERE"

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.



