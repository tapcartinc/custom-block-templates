# Shared Sweeps

## Overview

Shared Sweeps is a feature that enables store owners to run sweepstakes, granting entries based on the value of customer orders. This feature is designed to enhance customer engagement and incentivize purchases. It offers exclusive deals that are only available to Tapcart users. The key components of Shared Sweeps include:

Custom Entries Multiplier: This allows store owners to multiply the number of entries a customer receives based on their order value.
Checkout Bonus Entries: Customers can earn additional entries when they complete a purchase, providing an extra incentive to finalize their orders.
Product Bonus Entries: This feature awards extra entries when customers purchase specific products.
Order Bonus Entries: Customers can earn bonus entries based on the total value of their order, encouraging larger purchases.

## Description

This feature enables customers to display the total number of entries and the current multiplier 
for a collection of products. Each product will display the total entries based on its price, and 
products will be shown in a two-column grid format

## How this block works

1. This block uses HTML, CSS and Javascript to display a list of products within a 
collection.
2. You have the option to enable/disable:
   - Ticket Icon
   - Current Multiplier
3. You have the option to change the Current Multiplier background and font color to match
your branding.
4. Default configuration:
   - Number of products = 8
   - Collection hande = all
   - Ticket Icon = disabled
   - Current Multiplier = enabled
   - Current Multiplier = 1X
   - Current Multiplier Background = green
   - Current Multiplier Text = white


## Installation and Configuration

1. Create a new Custom Block
    - Create a new custom block by navigating to the Tapcart Dashboard > App Studio > Product Details > Custom tab > Launch Editor
   - Give it a name by clicking on 'Name your block'.  Example: Product Grid Entries

2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
   - Copy the HTML from the index.html file in this folder, and paste it in the HTML 
tab in the editor
   - Copy the CSS from the styles.css file in this folder, and paste it in the CSS tab in 
the editor
   - Copy the Javascript from the script.js file in this folder, and paste it in the JS tab 
in the editor
3. Make some required code edits
   - **[REQUIRED]** Line 3 in JavaScript (JS): Access Token - Change ‘XXXXXXXXXXXXXXXXXXXXX’ with your Storefront 
Access Token.
      - Get your storefront access token by going to Shopify Admin > Apps and 
Sales Channels > Develop Apps
   - **[REQUIRED]** Line 5 in JS: Shopify Store URL - Change  ‘yourstore.myshopify.com’ with your your Shopify 
store URL

   - Line 7 in JS: Product Collection - Change ‘all’ with the collection handle of your choice.
   - Line 9 in JS: Product Count - Change ‘8’ with the number of products you want to display.
   - Line 13 in JS: Enable/Disable Icon - change ‘n’ to ‘y’ to show the ticket icon.
   - Line 15 in JS: Enable/Disable Multiplier - change ‘y’ to ‘n’ to disable the current multiplier.
   - Line 17 in JS: Multiplier Background Color - change ‘green’ to the desired background color by 
name or hex code
   - Line 19 in JS: Multiplier Font Color - change ‘white’ to the desired background color by name or

   <!-- raw HTML -->
   <img src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/88588865-c344-44ad-aa57-71331400d8c2" width="700">
   <!-- end raw HTML -->


4. Configure the Custom Block Settings
   - Set Import Libraries to Font Awesome
   - SetCustom Block SDK Version to 1.7

<!-- raw HTML -->
<div style="display: flex; justify-content: space-between; margin-left: 1rem; margin-bottom: 2rem;">
   <img src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/db451f91-554f-46b1-902a-ede6c3818bb7" width="290">
   <img src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/8dfca882-b971-45d7-b544-34a5506c970c" width="290">
   </br>
</div>
<!-- end raw HTML -->

Block Preview

After successful implementation, your block will display as shown. Each product card will be interactive, directing you to the respective Product Detail Page (PDP) upon clicking..

<!-- raw HTML -->
   <img src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/842bbc28-f550-42c5-860d-ad021bdcb40d" width="290">

<!-- end raw HTML -->

