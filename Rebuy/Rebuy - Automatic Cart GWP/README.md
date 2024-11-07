<img height="55" alt="ReBuy Logo" src="https://user-images.githubusercontent.com/15990327/205843090-3bdf1e11-7ffe-4120-a658-a815b40ccabc.png">

# Rebuy Automatic GWP in Tapcart app Cart

## What is Rebuy
Rebuy is a personalization engine for Shopify stores to be able to easily customize the shopping experience. This Gift with Purchase feature is one of many products that we have for our customers. This allows a merchant to be able to define rules in which a free gift will be added or removed from the cart depending on what the shopper has in their cart or if they have exceeded a certain cart subtotal. 

## Why Rebuy + Tapcart?
The Rebuy block will allow merchants to use the same or similar functionality that Rebuy provides for the web within the Tapcart ecosystem. 

## Description
This custom block automatically adds a Gift With Purchase (GWP) product to the customer's cart based on the rules set up in the Rebuy dashboard. It operates invisibly, with no user interface, working seamlessly in the background to enhance the shopping experience.

## How this block works
1. Setup in Admin Dashboard: Create a meaningful data source with a unique ID in the admin dashboard of the rebuy system.

2. Configuration in Custom Block Editor: Access the Custom Block editor in the Tapcart dashboard and configure JavaScript files with variables for data source ID and API key.

3. Establish Rules: Define rules within the Custom Block to determine when gifts are added or removed based on conditions such as cart subtotal.

4. Integration: Integrate the Custom Block seamlessly into the cart screen, allowing it to monitor cart contents and respond to predefined rules.

5. Flexibility and Dynamic Response: Ensure flexibility by limiting the number of gifts per customer and adjusting rules according to merchant preferences. The system dynamically responds to changes in cart contents, maintaining consistency with established rules.

## Rebuy Integration Setup Instructions
1. Access Rebuy Admin Settings: Log in to the Rebuy admin dashboard and navigate to the settings for Data Sources.

2. Create a New Data Source: Create a new Data Source specifically for defining rules related to the gift to be added. For example, the rule could be "If cart subtotal is greater than $50.00, then add a free sample product".

3. Retrieve Data Source ID: After creating the Data Source, locate and note down the ID associated with it. This ID will be used to power the gift addition functionality.

4. Update JavaScript Code: In the Custom Block editor or JavaScript file, locate the constant variable named "dataSourceID". Paste the previously noted Data Source ID into this variable.

5. Obtain Public API Key: Retrieve the public API key from the Rebuy admin dashboard. This key is needed to authenticate and access the Rebuy API.

6. Update Custom Block JavaScript Code: In the JavaScript file, find the variable named "apiKey" located at the top. Paste the public API key obtained from the Rebuy admin into this variable.


## Custom Block Setup Instructions
> Reach out to Custom Blocks support (customblocks@tapcart.co) if you have any questions while configuring this Custom Block.  

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block

2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
To import, copy each library below, and paste it in the 'Import Libraries' dropdown in the 'Settings' tab of the [Custom Blocks Editor.](https://app.tapcart.com/custom-blocks).

1. Copy the HTML from [index.html]() file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from [styles.css]() file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from [script.js]() file in this folder, and paste it in the JS tab in the editor

### 3. Make some code edits
- **[REQUIRED]** Line 3 (Javascript file) should be replaced by your ReBuy API key.  Replace YOUR_API_KEY with your API Key
- **[REQUIRED]** Line 6 (Javascript file) should be replaced by your ReBuy data source ID.  Replace YOUR_DATA_SOURCE_ID with your API Key

### 4. Add test values to the block's Variable Preview Values
This block is required to use the following variable:
- `cart.subtotal`

To preview this block as expected, a value will need to be assigned for each required variable included in the block. To do this, add a relevant value for `cart.subtotal` by editing the 'Variable Preview Values' JSON in the 'Settings' tab of the [Custom Blocks Editor](https://ap.tapcart.com/custom-blocks).

## Considerations:
Merchants have the option to either discount the item or create a new item marked at $0.00. This item can be hidden but remains available for purchase through the online store.

A custom add to cart button can be created to restrict users from buying the $0.00 GWP product in the Tapart app. 