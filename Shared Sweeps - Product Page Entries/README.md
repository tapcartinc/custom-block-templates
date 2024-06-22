# Shared Sweeps

## Overview

Shared Sweeps is a feature that enables store owners to run sweepstakes, granting entries based on the value of customer orders. This feature is designed to enhance customer engagement and incentivize purchases. It offers exclusive deals that are only available to Tapcart users. The key components of Shared Sweeps include:

- Custom Entries Multiplier: This allows store owners to multiply the number of entries a customer receives based on their order value.
- Checkout Bonus Entries: Customers can earn additional entries when they complete a purchase, providing an extra incentive to finalize their orders.
- Product Bonus Entries: This feature awards extra entries when customers purchase specific products.
- Order Bonus Entries: Customers can earn bonus entries based on the total value of their order, encouraging larger purchases.

## How Does a User Interact with the Shared Sweeps integration in-app?
The user can view the number of entries and current multiplier displayed below product price on the Product Detail Page

## Setup Instructions

1. **Create a new Custom Block**
   - Create a new custom block by navigating to the Tapcart Dashboard > App Studio > Product Details > Custom tab > Launch Editor
   - Give it a name by clicking on 'Name your block'.  Example: Product Page Entries

2. **Copy this template's HTML, CSS, and JS over to the Custom Block Editor**:

   - Copy the content of the `index.html` file provided in this folder and paste it into the HTML tab in the Custom Block Editor.
   - Copy the CSS code from the `styles.css` file and paste it into the CSS tab.
   - Similarly, copy the JavaScript code from the `script.js` file and paste it into the JS tab.

3. **Make some required code edits**:
   - **[REQUIRED]** Line 1 in JavaScript (JS): Access Token - Change ‘XXXXXXXXXXXXXXXXXXXXX’ with your Storefront Access Token.
      - Get your storefront access token by going to Shopify Admin > Apps and Sales Channels > Develop Apps
   - **[REQUIRED]** Line 2 in JS: Shopify Store URL - Change  ‘yourstore.myshopify.com’ with your your Shopify store URL

   - Line 7 in JS - Enable/Disable Multiplier - change ‘y’ to ‘n’ to disable the current multiplier.
   - Line 9 in JS - Enable/Disable Icon - change ‘n’ to ‘y’ to show the ticket icon.
   - Line 12 in JS - Multiplier Background Color - change ‘green’ to the desired background color by name or hex code
   - Line 13 in JS - Multiplier Font Color - change ‘white’ to the desired background color by name or hex code

   ![JavaScript Code](https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/44255d33-ee4c-4027-89b5-b1a360d58461)

4. **Configure the Custom Block Settings**: Before your custom block can function correctly, make the following critical code edits:
   - Set Import Libraries to Font Awesome

   ![Font Awesome setting](https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/c7525cef-8e6e-4068-9a42-a3853fb586bb)

   - Set the Custom Block SDK Version to 1.7 in the code editor

   ![Code editor SDK setting](https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/c963a6d4-868a-4646-9d6b-d8d55fc5f388)

## Final product

Your SharedSweeps PDP block should look like this once you've implemented the feature correctly

<!--html-->
<img src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/e93d6cb2-3a55-4778-a6b3-7ad9e1a969b8" width="300">
<!--endhtml-->

