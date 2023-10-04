# Featured Product Banner Block

## Description
This block catches a user's attention, and promotes a singular product. From there, a user can add it to the cart, view the product, or view its full collection.

## How this block works
1. Uses [addToCart](https://docs.tapcart.com/docs/app-actions) App Action to add the product
2. Uses [openProduct](https://docs.tapcart.com/docs/app-actions) App Action to navigate a user to the product page
3. Uses [openCollection](https://docs.tapcart.com/docs/app-actions) App Action to navigate the user to the product's collection page

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from [index.html](https://github.com/Tapcart-Templates/custom-block-templates/blob/main/Featured%20Product%20Homepage%20Banner/index.html) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from [styles.css](https://github.com/Tapcart-Templates/custom-block-templates/blob/main/Featured%20Product%20Homepage%20Banner/styles.css) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from [script.js](https://github.com/Tapcart-Templates/custom-block-templates/blob/main/Featured%20Product%20Homepage%20Banner/scripts.js) file in this folder, and paste it in the JS tab in the editor

### 3. Make some code edits
The following items should be edited to make this block fit your use-case:

- Line 2 (HTML) should be edited to display your product image
- Line 3 (HTML) should be edited to display your header
- Line 4 (HTML) should be edited to display your product information as expected
- Lines 2-21 (JS) should be updated to reflect your specifc implementation of the `openCollection`, `openProduct`, and `addToCart` App Actions
- CSS in general should be updated to reflect our brand

### 4. Add a custom font
Import a custom font to conform to your app's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referrenced using `font-family` in your CSS.

- `https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap`

## Block preview
You'll know your configuration was successful if your block looks like this:

<img width="398" alt="Screenshot 2022-11-25 at 9 59 11 PM" src="https://user-images.githubusercontent.com/15990327/204074638-afc7edf6-c40a-4a55-b3d0-ce92bb4edad4.png">

