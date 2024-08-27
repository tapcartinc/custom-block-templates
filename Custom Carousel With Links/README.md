# Custom Carousel With Links

## Description

Use this responsive carousel to design slides with a custom background image, title, and details. These slides can have as many buttons as you want that link to either an external URL (will open in-app browser) or a collection.

The carousel can be enabled with "auto-scroll" to automatically swipe to the next slide if the user hasn't interacted with the carousel within a duration specified by you (e.g. 5 seconds).

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

Configure the Custom Block with the `CAROUSEL` object at the top of **index.js**. Make adjustments to auto-scrolling settings with `AUTO_SCROLLING_ENABLED` & `AUTO_SCROLL_INTERVAL_SECONDS`.

```JavaScript
// * Config
const AUTO_SCROLLING_ENABLED = true;
const AUTO_SCROLL_INTERVAL_SECONDS = 5;

const CAROUSEL = [
    {
        title: 'Top suits this month',
        details: 'Professional suits, casual suits, and more',
        imageUrl:
            'https://w0.peakpx.com/wallpaper/958/331/HD-wallpaper-men-in-suits-suit-clothes-black-tie-clothing-graphy-men-white-style.jpg',
        buttons: [
            {
                text: 'See Top 10',
                collectionId: '123456789',
            },
            {
                text: 'Read the Blog',
                url: 'https://www.blog.yourdomain.com/article/90876',
            },
        ],
    },
    {
        title: 'Built different',
        details: "With a variety of styles & colors, we've got you covered more than the rest",
        imageUrl:
            'https://www.gentlemansguru.com/wp-content/uploads/2022/07/Mens-Suits-Color-and-What-They-Mean-Banner-from-Gentlemansguru.com_.jpg',
        buttons: [
            {
                text: 'Shop Colorful Suits',
                collectionId: '223456789',
            },
            {
                text: 'Shop Progressive Suits',
                collectionId: '323456789',
            },
        ],
    },
];
// * Config
```

### 5. Add a custom font (Optional)

Import a custom font to conform to your App's design system by pasting a font link in the 'Import Fonts' field in the 'Settings' tab of the [Custom Blocks Editor](https://app.tapcart.com/custom-blocks). From here, the font will need to be referenced using `font-family` in your CSS.

### 6. Make color/font adjustments

The `:root` property at the top of **styles.css** contains some easily modifiable variables related to color/sizing.

```CSS
:root {
    --aspectRatio: 24/9;
    --titleFontSize: 1.25em;
    --detailsFontSize: 0.75em;
    --buttonFontSize: 0.75em;
    --primaryColor: white;
    --secondaryColor: black;
    --dotColor: grey;
}
```

## Block preview

You'll know your configuration was successful if your block renders in the editor:

<img width="350" src="https://github.com/user-attachments/assets/ef44f36f-0bb0-42eb-8703-272ce883443b" alt="Custom Carousel Custom Block Demo"/>
