# Zendesk Chat Widget

## Description

Configure your [Web Widget](https://www.zendesk.com/embeddables/web-widget/) through your Zendesk admin portal, then seamlessly integrate it into your app with this Custom Block.

## Setup Instructions

> Reach out to your Tapcart representative if you have any questions while configuring this Custom Block.

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [index.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits

Provide your Zendesk handle, and optionally modify the title text at the top of **index.js**:

```JavaScript
// * Config
const ZENDESK_HANDLE = 'YOUR-ZENDESK-HOST.zendesk.com';
const TITLE = 'FAQs & Support';
// * Config
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="350" src="https://github.com/user-attachments/assets/b55a52de-d905-471a-90f1-94070c6fdd0d" alt="Collections Swiper Custom Block Demo"/>
