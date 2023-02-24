(function() {
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true; 
    script.onload = function(){
       GorgiasChat.init().then(function () {
           
            GorgiasChat.on('widget:opened', function () {
                var timer = setInterval(function () {
                    var chatWindowHead = document.querySelector('#gorgias-chat-container')?.querySelector('#chat-window')?.contentWindow.document.querySelector('head');
                    if (![...chatWindowHead?.children].some(x => x.getAttribute("data-emotion"))) {
                        return;
                    }
                    clearInterval(timer); 

                    var chatStyle = document.createElement('style');
                    chatStyle.textContent = '.buttons-wrapper {display: none !important}'; // Hide x button
                    chatWindowHead.appendChild(chatStyle);
                }, 50);
            })

         GorgiasChat.open();

        })
    };
    // Update the applicationId below
    script.src = 'https://config.gorgias.chat/gorgias-chat-bundle-loader.js?applicationId=22050';
    document.querySelector('body').appendChild(script);
})();

document.getElementById("chatbot").style.height = Tapcart.variables.device.windowHeight + "px";

// block-vendor:gorgias
// block-type:chatbot
