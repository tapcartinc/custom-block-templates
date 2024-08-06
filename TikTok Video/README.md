<img height="55" alt="TikTok Logo" src="https://static.vecteezy.com/system/resources/previews/023/986/561/non_2x/tiktok-logo-tiktok-logo-transparent-tiktok-icon-transparent-free-free-png.png">

# Embedded TikTok Video Block

## Description

This block allows customers to watch an embedded TikTok video from within your mobile app.

## How this block works

Uses a TikTok script to render an `<iframe>` with the video & its controls.

## Setup Instructions

Reach out to your Tapcart representative if you have any questions while configuring this Custom Block.

### 1. Create a new Custom Block

1. Start [here](https://app.tapcart.com/custom-blocks) to create a new Custom Block
2. Give it a name by clicking on 'Name your block'

### 2. Copy this template's HTML, CSS, and JS over to the Custom Block Editor

1. Copy the HTML from [index.html](https://github.com/Tapcart-Templates/custom-block-templates/edit/main/TikTok%20Video/index.html) file in this folder, and paste it in the HTML tab in the editor

### 3. Make some code edits

Line 2 & Line 3 (HTML) need to be updated with the URL & ID of the TikTok video you wish to display:

```HTML
<blockquote
    cite="YOUR-VIDEO-URL"
    data-video-id="YOUR-VIDEO-ID"
    class="tiktok-embed"
    style="max-width: 605px; min-width: 325px">
    <section></section>
</blockquote>
<script async src="https://www.tiktok.com/embed.js"></script>
```

The Video ID can be obtained from the video URL. For example, if the URL is **tiktok.com/@scout2015/video/6718335390845095173**, the video ID is **6718335390845095173**

## Block preview

You'll know your configuration was successful if your video renders in the editor:

<img width="403" alt="Screenshot 2022-12-05 at 11 18 45 PM" src="https://user-images.githubusercontent.com/15990327/205846338-368cea39-5224-4dc7-929a-096b39570d5e.png">
