var zendeskApiKey = 'ZENDESK API KEY';

// Function to dynamically add the script with a given API key
function addZendeskScript(apiKey) {

    var script = document.createElement('script');

    script.id = 'ze-snippet';

    script.src = `https://static.zdassets.com/ekr/snippet.js?key=${apiKey}`;

    // Add an event listener to ensure the code runs after the script is loaded
    script.onload = function() {
        
        // Initialize and configure Zendesk
        zE("messenger", "open");

        zE("messenger:on", "close", () => {
            zE("messenger", "open");
        });
    };

    document.body.appendChild(script);
}


addZendeskScript(zendeskApiKey);



