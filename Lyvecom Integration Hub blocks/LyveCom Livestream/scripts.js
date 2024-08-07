let accountId = '<INPUT YOUR ACCOUNT ID HERE>'


function injectLyveComWidgetScript() {
    var scriptElement = document.createElement('script')
    scriptElement.src = 'https://dashboard.lyvecom.com/widget/widget.js'
    scriptElement.onload = function () {
      LyveComWidget.mount({
        account: accountId,
        lng: 'en',
        position: 'left',
        positionLeft: '0',
        positionBottom: '0',
        fullScreen: true,
      })
   }
  
    document.getElementById('lyvecom-stream').style.height = 
  `calc(${Tapcart.variables.device.windowHeight || 750}px)`
  
    document.head.appendChild(scriptElement)
  }
  
  // Call the function to inject the script
  injectLyveComWidgetScript()
  
  // block-vendor:lyvecom
  // block-type:live-streaming