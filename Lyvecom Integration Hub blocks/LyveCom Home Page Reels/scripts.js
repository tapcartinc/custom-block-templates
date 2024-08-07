const carouselId = '<INPUT CAROUSEL ID HERE>';

function injectLyveComWidgetScript() {
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://dashboard.lyvecom.com/widget/widget.js';
    // Call mountCarouselComponent() when the script is loaded
    scriptElement.onload = function() {
        LyveComWidget.mountCarouselComponent({
            carouselID: carouselId,
            parentElement: '.lyvecom_carousel--component',
            carousel: true,
            lng: 'en'
        });
    };

      window.document.addEventListener('FullLyveComOpen', () => {
      document.getElementById('lyvecom').style.height = `calc(${Tapcart.variables.device.windowHeight || 750}px - 80px)`
      Tapcart.actions.scrollToBlockTop()
    })

   window.document.addEventListener('FullLyveComClosed', () => {
      document.getElementById('lyvecom').style.height = 'auto'
    })

    document.head.appendChild(scriptElement);
}
// Call the function to inject the script
injectLyveComWidgetScript();