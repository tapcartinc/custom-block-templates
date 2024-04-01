# EcoCart 
EcoCart is a sustainability software solution provider that aims to make e-commerce less harmful to the environment. It calculates e-commerce brands’ ecological footprints through machine learning and enables customers to offset the emissions of their orders through front-end experiences.

# Integrating EcoCart Within Your Tapcart App

1. Click on Custom Blocks => Launch Blocks Editor - Edit the title to be "EcoCart - Checkout Widget" 

2. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the custom block code editor

3. Edit the title to be "EcoCart-Checkout Widget"

4. In the script, replace [shop_name] with your "unique_name.myshopify.com" Shopify URL. 

`<script src="https://widget.ecocart.tools/ecocart.js?shop_name=[shop_name]" defer></script> <eco-tapcart-checkout-widget style="padding: 15px; display: block;"></eco-tapcart-checkout-widget> `

5. On the right side of the code editor, click Settings, scroll to the bottom and ensure Custom Block SDK Version is set to v1.5 - Click Save 

6. Navigate to the App Studio header section and look under "my blocks" to find your EcoCart widget. You can then drag and drop to the desired location in your cart or checkout page. 