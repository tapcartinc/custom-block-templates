# Metafields

## Description
This block allows merchants to incorporate Shopify Metafields. This could include content, markup, or any number of ways in which you decide to utilize the data you're storing.
- **[REQUIRED]** It is imperative that you setup and enable metafields to your storefront before walking through this exercise: https://help.shopify.com/en/manual/custom-data/metafields

## How this block works
1. A div is created in the markup in order to display the information from your metafield
2. Inside of the javascript there is a variables using the Tapcart variable to get the metafield values
3. That variable is then pushed to the div that was defined inside of the div
4. Your metafield data can be exposed to the user-interface

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block. Make sure that the metafields are enabled to the Storefront: https://help.shopify.com/en/manual/custom-data/metafields

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor
4. Copy the JSON from the [variable-preview-values.json](#) file in this folder, and paste it in the Variable Preview Values text box in the editor (Located in the 'Settings' tab)

### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 

- **[REQUIRED]** Line 1 (JAVASCRIPT) should be replaced by personalized metafield name

The following suggestions should be considered to make this block more dynamic for your use-case.

- Inside of the Preview Settings Pane lives (JSON) and should be replaced by your own metafield definition. Example if your metafield namespace and key are marketing.content then be sure to replace that information on lines 31-37:

     "metafields": {
        "myNamespace1": {
            "myKey1" : "myValue1"
        },
        "myNamespace2": {
            "myKey2" : "myValue2"
        }

     "metafields": {
        "myNamespace1": {
            "myKey1" : "myValue1"
        },
        "marketing": {
            "content" : "Ipsum Lorem..."
        },      

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block preview looks like this:

<img width="419" alt="meta" src="https://user-images.githubusercontent.com/122114430/232090291-093f65f8-f128-4e97-a935-1fc657ca30f1.png">


