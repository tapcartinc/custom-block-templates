<img height="55" alt="Tapcart_DX_LogoWhite" src="https://user-images.githubusercontent.com/15990327/204726832-88b6d8d5-767b-4cf4-8167-584f28081a77.png">

# Gorgias Chat Block

## Description
This block allows customers to interact with an embedded customer support chat thread powered by Gorgias - a leading customer success management tool, built for eCommerce. This block is best placed on a stand alone page given it contains scrolllable content, and various page controls.

## How this block works
1. Block uses your Gorgias Application ID + a Gorgias install script to initialize the experience
2. From here, customers can use the chat just as they would on the website
3. As the chat grows, the content becomes scrollable, so this block should be the only item included on the page when used

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from [index.html](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Gorgias%20Chat/index.html) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from [styles.css](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Gorgias%20Chat/styles.css) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from [script.js](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/Gorgias%20Chat/scripts.js) file in this folder, and paste it in the JS tab in the editor

### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected.

- **[REQUIRED]** Line 27 (JS) should be updated to include your Gorgias Application ID: *applicationId* = `12345`

## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="348" alt="Block Preview" src="https://user-images.githubusercontent.com/15990327/204728006-37f19bbb-63bd-4f7a-9468-e80f5fb313bb.png">



