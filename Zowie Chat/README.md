# Zowie AI Chat

## What is Zowie
Zowie is an AI-powered customer experience platform that helps businesses deliver exceptional support and resolve issues efficiently. With Zowie's automated chatbots and human-in-the-loop approach, companies can provide 24/7 support, reduce response times, and increase customer satisfaction.

## Zowie x Tapcart
Zowie's AI chat integration with Tapcart enhances Shopify stores by enabling a seamless chat experience within the app, offering 24/7 support and improving customer satisfaction through efficient issue resolution.  Any Shopify store that has the Zowie integration will now be able to access the chat window within the app.

## Setup Instructions
> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block

### 1. Create a new Custom Block
1. In Shopify, go to Apps > Tapcart
2. Under App Studio, go to Product Detail.
3. Under Custom Blocks select Launch Blocks Editor and call it Zowie Chat.
4. Select, ‘edit’ and then launch the editor that will bring up your HTML, CSS, and JS tabs. Populate the following within each tab

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor


### 3. Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 
- <span style="color: yellow">**[REQUIRED]**</span> (line 7) JAVASCRIPT - replace your-subdomain with your subdomain retrieved from the Zowie admin panel
- <span style="color: yellow">**[REQUIRED]**</span> (line 8) JAVASCRIPT - replace with your instanceId retrieved from the Zowie admin panel

### 4. Create a Multi-Page Chat tab

1. Navigate to the Tapcart app's dashboard App Studio > Home
2. Toggle on Multi-Page support and select "Add a Section", give it a name like "Chat" or "Zowie Chat".

<img width="100%" alt="Tapart app" src="https://github.com/tapcartinc/custom-block-templates/assets/77694650/4e40e118-c483-4383-aca3-71d282c5d846">

3. Drag the Zowie custom block into the app.

4. Done! 

Alternatively, you can create a block-based custom screen to pull in the chat experience:

### 4a. Create a Block-Based Custom Screen within the Tapcart dashboard
1. Navigate to the Tapcart app's dashboard App Studio > Custom Screen
2. Select Build a Block-Based Screen

<img width="100%" alt="Tapart app" src="https://github.com/tapcartinc/custom-block-templates/assets/77694650/514a4e94-5869-4d35-bcbd-7930b723b2ce">

3. Next, give the custom screen a title.  Something like "Chat" or "Zowie Chat"
    - You can toggle to display the title or not.  

4. Drag the Zowie custom block into the section that says "Drag and Drop your block here"

5. Determine how you want to render your chat within the app.  
    - You can create a link within the side navigation menu or bottom navigaiton bar


## How this block works
Your users interact with Zowie in-app, by opening chat and typing their question. They get their chat widget experience as a custom block.


## Block preview
You'll know your configuration was successful if your block looks like this:

<p align="center">
  <img width="40%" alt="Tapcart app" src="https://github.com/tapcartinc/custom-block-templates/assets/77694650/748ca29e-4d26-4b06-a8d7-fa1d576d59e0">
</p>