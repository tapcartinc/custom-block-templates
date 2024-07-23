# ShipInsure

## What is ShipInsure
ShipInsure is a service designed for both merchants and their customers. We streamline the resolution process for customers when their deliveries do not go as planned. Customers can purchase our service by adding a ShipInsure product to their cart or 

## Integration x Tapcart
Loyal customers who use a brand’s app should enjoy the same seamless experience and full feature access they get on the website. ShipInsure aims to enhance this experience by partnering with TapCart. By integrating ShipInsure with TapCart, merchants can easily drag and drop a block onto the Cart page, allowing customers to add extra coverage to their orders with ease.

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. In Shopify, go to Apps > Tapcart
2. Under App Studio, go to Cart.
3. Under Custom Blocks select Launch Blocks Editor and call it ShipInsure
4. Select, ‘edit’ and then launch the editor that will bring up your HTML, CSS, and JS tabs. Populate the following within each tab

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor


### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 
- <span style="color: yellow">**[REQUIRED]**</span> (line 2) JAVASCRIPT - Replace 'Shopify ID' with your Shopify ID

### 3. Add the ShipInsure custom block to your Tapcart cart

1. In the Tapcart dashboard got to App Studio > Cart
2. Drag your custom block in either the top or bottom position in the cart.  


## How this block works
The User simply toggles on or off the switch on the thin banner-style block that says Shipping Protection.  This will either add a ShipInsure product to the cart or remove it.  

## Considerations
Merchants have the ability to configure the widget to be Opt-In or Opt-Out.
Opt-In means that the customer will have to toggle the switch on to have coverage
Opt-Out means that the coverage will automatically be added and the customer must toggle off to decline (remove the product from the cart)

## Block preview
You'll know your configuration was successful if your block looks like this:

<div align=center>
  <img width="40%" style="margin-right: 3rem;"alt="Tapcart app" src="https://github.com/tapcartinc/custom-block-templates/assets/77694650/61b79cea-5b7a-4caa-99bc-68e17373e298">
</div>



