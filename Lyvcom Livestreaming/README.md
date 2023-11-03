# Lyvecom Livestreaming

## Description
LyveCom is a dedicated Video Commerce platform designed to transform static product pages into interactive, shoppable video experiences. By infusing the Tapcart app with dynamic, engaging videos or livestreams, LyveCom empowers marketers and influencer managers to captivate their audience, resulting in heightened on-site engagement and increased conversions.

The LyveCom + Tapcart integration provides a seamless avenue for e-commerce brands to extend the power of livestreaming and shoppable video into their mobile storefronts. By leveraging the dynamic nature of LyveCom's platform in tandem with Tapcart's mobile app builder, brands can elevate the mobile shopping experience, making product discovery via video both engaging and immediately actionable.


## How this block works
1. A div is created in the html file to render the video
2. Inside of the javascript there is a function that pulls in the Lyvcom script and mounts it to the custom block.  


## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block. Make sure that the metafields are enabled to the Storefront: https://help.shopify.com/en/manual/custom-data/metafields

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 

- **[REQUIRED]** Line 6 (JAVASCRIPT) should be replaced by your LyveCom API key

- Lines 8-10 (JAVASCRIPT) - Adjust these values to ensure that the custom window height is correctly set to optimize the display and functionality of the video within the app.


### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Block preview
Within the Tapcart-built mobile app, LyveCom's shoppable video experiences seamlessly integrate, offering the following interactions:

https://www.youtube.com/watch?v=P49m7EfXU9o


## Considerations 
Internet Connectivity (When streaming): To enjoy a buffer-free video streaming experience, a stable internet connection is recommended. Users with slower connections might experience some buffering.

## Frequently Asked Questions
https://www.lyvecom.com/livestream