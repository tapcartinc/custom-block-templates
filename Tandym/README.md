# {Tandym}

## What is Tandym?
Tandym is a payments app that powers a merchant-branded wallet. When customers adopt Tandym, they get access to either a credit card or pay-by-bank product that carries extra rewards and perks at the brand.

## Tandym x Tapcart
Tandym can be used alongside (or instead of) traditional loyalty programs. It’s a great way to add more sizzle to the program while improving the ROI (as payments processed through Tandym are 1% or less). Additionally, Tandym programs can have app-specific incentives attached to them which can help drive adoption of the Tapcart app.


## Setup Instructions
Integrations are available to all Tapcart Enterprise customers with Custom Block enabled. Additionally, stores need to have installed our two apps and launched their Tandym program.

For stores with live Tandym programs, follow the steps below to unlock full functionality in your Tapcart-powered app.

### Step 1: Rewards Overview Page (ROP) or Program About Page (PAP)
The ROP is only applicable when there is a tender-neutral integration in place with Yotpo, Loyalty Lion, etc. This page helps a customer understand the holistic rewards offering (tender neutral + Tandym).

Tandym hosts this page in Webflow, and the content gets populated in Tapcart via a BLOCK-BASED CUSTOM SCREEN. Launch the Custom Block builder and paste the following snippets.


1. In Shopify, go to Apps > Tapcart
2. Under App Studio, go to Custom Screens.
3. Choose "Block-Based" custom screen and then name your screen.
4. Choose "Launch Blocks Editor" and name your block.
5. You will see your HTML, CSS, and JS tabs. Populate the following within each tab:

Copy this template's HTML, CSS, and JS over to the Custom Block Editor
1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [script.js](#) file in this folder, and paste it in the JS tab in the editor

#### Make some code edits
The following lines of code in the custom block will need to be edited for the block to work as expected. 
- <span style="color: yellow">**[REQUIRED]**</span><span> Line 3 in JS tab - Retrieve your Shopify store name from your Tandym account manager (e.g "tandym")</span>
- <span style="color: yellow">**[REQUIRED]**</span><span> Line 4 in JS tab - Text for the Manage Account button (e.g Manage Account)</span>
- <span style="color: yellow">**[REQUIRED]**</span><span> Line 5 in JS tab - Text for the My Rewards button (e.g My Rewards)</span>


> Reach out to your Tapcart rep if you have any questions while configuring this Custom Block or Custom Screen

The ROP should populate in the block like in the example below.

<img src="https://github.com/user-attachments/assets/5aae7502-6b69-416a-8c2e-aa530347b4c7" />

### Step 2: Program About Page (PAP)

The PAP describes information specific to the Tandym program at the brand. Customers can also apply / sign-up for an account directly from this page.

Tandym hosts this page in Webflow, and the content gets populated in Tapcart via a web-based custom screen. Configure per the screenshot below, using the web page link specific to your PAP.

https://www.bytandym.com/merchant/program-name?tapcart=true

<img src="https://github.com/user-attachments/assets/5ec2fd8c-7afd-4d63-9654-bc2ff72a6c1f"/>


### Step 3: On-site Messaging (OSM)
#### PDP and Cart
The Tandym program gets merchandised on every PDP and in the cart. We do this in Tapcart using a custom block. The images are hosted by Tandym.

Create a custom block in both the Product Detail and Cart sections of the Tapcart dashboard. Paste the following code snippets for both.

#### Cart
Similar to the PDP, we merchandise Tandym in the cart using a custom block.

### Step 4: Logged-in Account Experience
We have a link-out for logged-in customers who want to service their Tandym account directly from your app. To enable this, navigate to the Account section of the Tapcart dashboard.

Create a new link with “Manage Program Name. Use the link https://bytandym.com/app.

<img src="https://github.com/user-attachments/assets/48f4d9d1-145c-4a10-bb7e-50fa2d51d91c"/>

### Step 5: Checkout
Integration at checkout is handled natively by Shopify, both with the payment selector and the dynamic rewards widget that displays the order discount. There is no additional configuration needed.
