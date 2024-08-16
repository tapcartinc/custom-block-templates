# Collections Swiper

## Description

Display an unlimited number of collections on this swiping carousel. Collections are represented with custom images and titles along with their Collection ID. When a user clicks an image, they are brought to the corresponding collection's page.

The block will play an auto-scroll animation to show the user that the carousel is scrollable. Once the user scrolls on their own, the animation will stop.

## Setup Instructions

> Reach out to your Tapcart representative if you have any questions while configuring this Custom Block.

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from the [index.html](#) file in this folder, and paste it in the HTML tab in the editor
2. Copy the CSS from the [styles.css](#) file in this folder, and paste it in the CSS tab in the editor
3. Copy the Javascript from the [index.js](#) file in this folder, and paste it in the JS tab in the editor

### 4. Make some code edits

Configure the Custom Block with the `CONFIGURATION` object at the top of **index.js**.

```JavaScript
// * Config
const CONFIGURATION = {
    header: "See what's hot",
    collections: [
        {
            title: 'Latest Equipment Stock',
            collectionId: 123456789,
            image: 'https://cultmtl.com/wp-content/uploads/2023/05/EFBF4B5C-2829-4B45-9326-5EA930E3A2E4.jpeg',
        },
        {
            title: 'Unisex Running Tops',
            collectionId: 78901234,
            image: 'https://www.austinfitmagazine.com/wp-content/uploads/2023/05/Sustainable-Athleisure-1-scaled.jpg',
        },
        {
            title: 'Yoga Gear',
            collectionId: 65428355677,
            image: 'https://i.insider.com/620a868cfc23d1001804c8cb?width=800&format=jpeg&auto=webp',
        },
        {
            title: 'Baseball Shoes',
            collectionId: 5439875643,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3sGErClpfKwi7J0Z56ZxTlbf6YthpyRXZqN0U7t_KGdhLsSj-sSzFztdP_cvrkzWFRM&usqp=CAU',
        },
    ],
};
// * Config
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

### 6. Make color/font adjustments

The `:root` property at the top of **styles.css** contains some easily modifiable variables related to color/sizing.

```CSS
:root {
    --height: 250px;
    --gap: 5px;
    --headerFontSize: 1.5em;
    --fontSize: 1em;
    --fontColor: #444444;
    --previewScrollDistance: -350%;
}
```

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="350" src="https://github.com/user-attachments/assets/37290297-ade9-482d-a7a8-072143108747" alt="Collections Swiper Custom Block Demo"/>
