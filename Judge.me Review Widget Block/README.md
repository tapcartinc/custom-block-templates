# Judge.me Review Widget Block

## Description
This block allows customers pull reviews into their Product Detail Page. Leading to testimonials and further product proof of quality.

## How this block works
1. Adds a Div to the HTML markup
2. Uses the Judge.me Content Distribution Network to reach their own servers
3. Reviews are then poulated
4. You can choose to customize style from with CSS files

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. !!IMPORTANT!! Enable Platform-independent Review Widgets from Shopify Admin 
1. Go to your JudgeMe app in Shopify Admin
2. In your JudgeMe app go to Settings > Integrations > Developers > Platform-independent Review Widgets
3. Enable the toggle.  

<img src="/Judge.me Review Widget Block/assets/Screenshot 2023-05-16 at 3.27.57 PM.png" alt="Alt Text" width="300" height="200">

### 2. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 

- **[REQUIRED]** Line 1 (JAVASCRIPT)) should be replaced by your DOMAIN

- **[REQUIRED]** Line 2 (JAVASCRIPT) should be replaced by your PUBLIC TOKEN

### 4. Add a custom font
Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `fontlink.com`

To preview this block as expected, a value will need to be assigned for each variable included in the block. To do this, add a relevant value for each variable by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks).

## Block preview
You'll know your configuration was successful if your block looks like this:

![reviews](https://user-images.githubusercontent.com/122114430/217679435-55c14587-6a58-46f4-a126-7fefc822c276.png)

