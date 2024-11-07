# FastSimon Personal Recommendations

## Overview
Fast Simon is a conversion optimization platform designed to boost conversion rates, increase Average Order Value (AOV), and enhance overall revenues. Personal Recommendations is an AI-powered widget that tailors product suggestions based on individual shopper behavior and preferences. This feature provides a personalized shopping experience, optimizing product recommendations for users.

## How It Works
The mechanism behind this custom block is designed to seamlessly integrate with your online store and improve user engagement. Here's a step-by-step breakdown of how it operates:

1. **Product Identification**: The custom block first identifies the unique product ID on the Product Detail Page (PDP) that the customer is currently viewing.

2. **FastSimon SDK Integration**: It then initiates a request to the FastSimon JavaScript SDK, which is integrated with your e-commerce platform.

3. **Recommendation Retrieval**: The FastSimon SDK processes the request and returns a curated list of recommended products that are visually similar to the one currently being viewed.

4. **User-Friendly Experience**: Customers can effortlessly explore these recommended products by simply clicking on them, eliminating the need for manual searches or navigating back to the main menu.

## Installation and Configuration

To set up FastSimon Product Personal Recommendations, follow these steps:

1. **Create a Custom Block**: Begin by creating a new Custom Block within your e-commerce platform.

2. **Access the Custom Block Editor**: Visit [Tapcart's Custom Block Editor](https://app.tapcart.com/custom-blocks) to get started.

3. **Transfer HTML, CSS, and JavaScript**:
   - Copy the content of the `index.html` file provided in this folder and paste it into the HTML tab in the Custom Block Editor.
   - Copy the CSS code from the `styles.css` file and paste it into the CSS tab.
   - Similarly, copy the JavaScript code from the `script.js` file and paste it into the JS tab.

4. **Customization Required**: Before your custom block can function correctly, make the following critical code edits:
   - **[REQUIRED]** Lines 1 and 2: Replace `const uuid = "{{Storefront UUID}}"` and `const storeID = "{{Storefront Store ID}}"` with your actual UUID and Store ID. You can find this information at [https://dashboard.instantsearchplus.com/settings](https://dashboard.instantsearchplus.com/settings).
   - Line 3: Customize the number of suggestions you prefer to display based on your store's needs.

FastSimon Product Personal Recommendations will seamlessly integrate into your e-commerce platform, providing an exceptional shopping experience for your customers, and helping them discover visually similar products effortlessly.