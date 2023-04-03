# Store Locator

## Description
This block allows customers to find a store near their current geolocation.
**[REQUIRED]** A developer will need to make updates for this code to work in production. This primarily serves as inpiration for your own stores locator.

## How this block works
1. This block will ask a user to enable geolocation settings
2. If permitted it will take their current coordinates and run a lookup
3. By comparing 3 static store locations and the current location, it will determine the store with the shortest distance
4. The "store nearest you" output will be display at the very top section
5. The other 2 stores will be removed from the user interface as it displays within the preview within the Custom Block

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

## Block preview
All store locations will display in the preview, but will filter the nearest store location once permission is granted.
![StoreLocator](https://user-images.githubusercontent.com/122114430/229633132-caf49367-8b55-4a54-9d2f-47111201c2c1.png)

<img width="421" alt="ClosestStore" src="https://user-images.githubusercontent.com/122114430/229633748-ee509054-1fdc-41e7-bc61-4af46ca0c5ff.png">

