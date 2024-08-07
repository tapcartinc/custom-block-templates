let accountId = '<INPUT YOUR ACCOUNT ID HERE>'

function injectLyveComWidgetScript() {
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://dashboard.lyvecom.com/widget/widget.js';
    // Call LyveComWidget mount when the script is loaded
    scriptElement.onload = function() {
        LyveComWidget.mountEventPage({
            account: accountId,
            parentElement: '#lyvecom_event--page',
            lng: 'en'
        });
    };

 window.document.addEventListener('FullLyveComOpen', () => {
      Tapcart.actions.scrollToBlockTop()
      document.getElementById('lyvecom').style.height = `calc(${Tapcart.variables.device.windowHeight || 750}px - 80px)`

})

window.document.addEventListener('FullLyveComClosed', () => {
      document.getElementById('lyvecom').style.height = 'auto'
    })

document.head.appendChild(scriptElement);
}

// Call the function to inject the script
injectLyveComWidgetScript();