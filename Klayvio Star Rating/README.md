# Klaviyo Star Rating

## Description

What is Klaviyo Star Rating?

Klaviyo's Star Rating widget is designed to display the average star rating for a product based on customer reviews. It does not display the actual text of the reviews.

Klaviyo’s newest offering is a product reviews solution that helps brands collect, analyze, and display customer reviews. Our vision is to give merchants all the data in our platform so they can drive more revenue with everything they do with us - email, push, SMS, and now reviews. 

Why Klaviyo Reviews + Tapcart? 
Klaviyo already has a strong relationship and an existing integration with Tapcart. Reviews is one of our newer product offerings, and is quickly growing within the Shopify ecosystem. Today, we have over 7,000 active merchants using us just 6 months since launch. 

How to Connect Klaviyo Reviews + Tapcart? 
https://www.tapcart.com/integrations/klaviyo 


## How this block works

1. The block is positioned on the Product Detail Page (PDP) of the app. Its purpose is to display the star rating widget for a specific product.

2. When a product page is loaded, the widget makes an API call to Klaviyo. This call uses the product ID and product title as data attributes to fetch the relevant reviews for that specific product.

3. Klaviyo's API responds with the review data for the product. The widget then calculates the average star rating based on these reviews.

4. The calculated average star rating is then populated into a div with a specific class on the block. This div is updated dynamically to display the star rating on the product page.

5. The star rating widget is now visible to users visiting the product page, providing them with an average rating based on customer reviews. This helps potential customers make informed decisions about their purchases.

## Setup Instructions

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Import the following libraries

No libraries are needed for this block to work out of box.

### 3. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [scripts.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits

The following lines of code in the custom block will need to be edited for the block to work as expected.

- **[REQUIRED]** Lines 1 (JavaScript) insert your Klaviyo company ID between the quotation marks.

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.
