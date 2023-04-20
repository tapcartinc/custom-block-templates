# Alphabetical Dropdown

## Description
This block allows customers display any kind of content in the product detail pages. It's a shell for alphabetical content but can be updated in a number of ways to support your needs. One idea is to work with the metafields templates in order to merge the two and display relevant content to your product. 

## How this block works
1. This displays 5 categories with content listed alphabetically
2. When a user clicks on a given section it will drop down to focus on the details of the content.
3. Customer can then learn more and make any decisions or be informed about status, information, or any general content.
4. As recommended you can place static info or you something like a metafield or tapcart variables to display dynamic content.

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

- **[OPTIONAL]** Lines 3 and 5 (HTML) will give you a field for udpates to the Title and Content sections.

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block looks like this:

![dropdown_closed](https://user-images.githubusercontent.com/122114430/233478635-f8c46b80-14ee-4c93-9934-6e7796951286.png)

![dropdown_open](https://user-images.githubusercontent.com/122114430/233478653-3d597ff3-5e7a-4a36-8879-09f17c60eed7.png)

