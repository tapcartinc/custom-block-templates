# App Store/Play Store Deep Link

Link straight from your Tapcart mobile app to the listing page of another app in the App Store/Play Store. The custom block automatically detects the user's operating system, and generates the appropriate link.

Upon clicking the link, the user is seamlessly taken to the App Store or Play Store depending on their OS.

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

Configure the Custom Block with the objects at the top of **index.js**. Follow the comments for help filling out the data.

```JavaScript
// * Config
const MOBILE_OS = {
    // The default link to use if the device isn't iOS or Android.
    // To hide the banner on non iOS/Android devices, set to null
    Default: 'iOS',
    iOS: 'iOS',
    Android: 'Android',
};

const CONFIG = {
    // Example with Facebook
    // https://apps.apple.com/us/app/facebook/id284882215
    [MOBILE_OS.iOS]: {
        // App Store ID
        appId: '284882215',
        // Name in App Store
        appName: 'facebook',
    },
    // Example with Facebook
    // https://play.google.com/store/apps/details?id=com.facebook.katana
    [MOBILE_OS.Android]: {
        // Play Store ID
        appId: 'com.facebook.katana',
    },
};
// * Config
```

Finally, add your content by replacing `<!-- YOUR-CLICKABLE-CONTENT-HERE -->` in the HTML.

```HTML
<div id="container" class="hidden">
    <a id="link">
        <!-- YOUR-CLICKABLE-CONTENT-HERE -->
    </a>
</div>
```

```HTML
<div id="container" class="hidden">
    <a id="link">
        Click to install the Facebook app.
    </a>
</div>
```
