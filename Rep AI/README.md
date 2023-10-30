# Rep AI Chat block

## Description
Rep AI is an advanced AI Concierge, powered by ChatGPT, designed to enhance customer engagement and boost sales.

The integration of Rep AI with Tapcart provides a seamless shopping experience for customers. By embedding the AI chatbot within the Tapcart mobile app interface, customers receive real-time assistance, enhancing their shopping journey and encouraging repeat purchases.


## How this block works
- The block will embed Rep AI’s sales assistance chat capabilities to help customers get answers to product-related questions.

## Setup Instructions
> Reach out to your Tapcart Account Manager if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected.

- **[REQUIRED]** 
- Line 2 (JavaScript File) replace {{Account Key}} with the value provided by Rep AI
- We do recommend to set Custom Block SDK Version to v1.4. Some features will not work for older versions. 
To set the SDK version for a custom block, you need to access the custom block code editor, navigate to Settings, and scroll down to select your preferred SDK version


## Block preview
You'll know your configuration was successful if your video renders in the editor:

When collapsed:

<img width="348" alt="Block Preview" src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/bae3c722-a08b-44dc-971c-696e72092b0d">

When user clicks chat bubble:

<img width="348" alt="Block Preview" src="https://github.com/Tapcart-Templates/custom-block-templates/assets/77694650/34419392-c4ad-423c-939a-0dc7af1c135f">