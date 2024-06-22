# OrderProtection

## What is OrderProtection
OrderProtection provides protection and insurance for online orders.  With OrderProtection, you can shop with confidence knowing that your purchases are safeguarded against loss, theft, or damage. In the event of an issue, OrderProtection offers reimbursement or replacement of items, extended warranty coverage, and free shipping and returns. This service provides an added layer of security and peace of mind for online shoppers.

## OrderProtection x Tapcart
Easily add Order Protection to your app and offer guaranteed delivery to your most loyal customers. Deploy our lightweight widget through Tapcart's Custom Blocks, fast.

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. In Shopify, go to Apps > Tapcart
2. Under App Studio, go to Cart.
3. Under Custom Blocks select Launch Blocks Editor and call it Order Protection.
4. Select, ‘edit’ and then launch the editor that will bring up your HTML, CSS, and JS tabs. Populate the following within each tab

<img width="900" alt="Tapart app" src="https://github.com/tapcartinc/custom-block-templates/assets/77694650/b6e86d2c-212e-40b1-b052-467c918e4f99">


### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor


### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 
- <span style="color: yellow">**[REQUIRED]**</span> Custom Blocks SDK version should be v1.5 or above.  To update the version go to the Custom block code editor.  In the right navigation under Settings, scroll all the way to the bottom past the Variable Preview Values until you see the Set Custom Block SDK version section. Click the dropdown and select v1.5.
- <span style="color: yellow">**[REQUIRED]**</span> Line 6 (JAVASCRIPT) should be replaced by your store's name.

### 4. Update Tapcart dashboard settings
1. In Tapcart Settings (tab to the right of Integrations), do the following:
2. In Store Settings toggle off Quick Add Products
3. In Cart & Checkout and toggle off Navigate customers to checkout.
4. At the bottom of the screen, hit the Save & update button.

### 5. Update the OrderProtection product in Shopify
1. In the left navigation of Shopify (not Tapcart), go to Products > Search and Filter (CTRL/CMD + F) > Product vendor > Click “Order Protection”
2. Once filtered,, click on Order Protection and click on the three dots in the right navigation Publishing section to bring up a Manage sales channel flyout. Make sure Online Store, Tapcart - Mobile App, and Checkout Blocks are checked and then hit Done.

### 6. Drag the OrderProtection custom block into the Tapcart app
1. Finally, under Apps, search and click Tapcart - Mobile App. In the left navigation and under the App Studio > Home toggle to Custom Block and drag the Order Protection block into the page builder to add it to your store, confirm you want to add the block and save. Then hit preview your app in the top right hand corner of the page. Add an item to the cart.

All done! Order Protection widget is now enabled in cart and checkout.

## How this block works
- Once setup, Order Protection will be added to all cart instances within your Tapcart app.
- Customers will be able to file/edit claims per your normal store settings once an order confirmation email has been sent.


## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="1000" alt="Final results" src="https://github.com/tapcartinc/custom-block-templates/assets/77694650/c1b458dd-ce5b-41ff-9e2e-0759beb9bef7">

