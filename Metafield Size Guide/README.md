# Size Guide Using Shopify Metafields

## Description

Using Shopify Metafields, either set manually or using a tool like [Accentuate](https://apps.shopify.com/accentuate), this Custom Block allows you to display size information in different units.

The user selects which unit to view the size chart in, and the corresponding chart displays. Hiding the chart can be done by de-selecting the unit option.

## How this block works

1. The block is configured with your metafield names to use to hydrate the size guide.
2. A unit switcher is generated, and the raw HTML from the corresponding metafield is rendered.

## Setup Instructions

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [scripts.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits

Configure this Custom Block with the `CONFIG` object at the top of **index.js**. Ensure that the metafields are exposed to the Shopify Storefront API and enabled through Tapcart (see [this walkthrough](https://help.tapcart.com/hc/en-us/articles/8699625283859-Enabling-Metafields)).

```JavaScript
// * Config
const CONFIG = {
  // { namespace: string; name: string; }
  title: {
    namespace: "product_size_guide",
    name: "title",
  },
  // A map options & metafield properties to retrieve their content
  // { [optionName: string]: { namespace: string; name: string; } }
  options: {
    CM: {
      namespace: "product_size_guide",
      name: "product_size_guide_cm",
    },
    IN: {
      namespace: "product_size_guide",
      name: "product_size_guide_in",
    },
  },
};
// * Config
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="300" src="https://github.com/user-attachments/assets/3fcda67e-ff5a-422a-ae18-858a045849de" alt="Size Guide Custom Block"/>

<img width="300" src="https://github.com/user-attachments/assets/57457351-ad3f-4758-addc-830ca629b15d" alt="Size Guide Custom Block - Expanded"/>
