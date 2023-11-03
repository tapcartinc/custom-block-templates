function injectLyveComWidgetScript() {
  var scriptElement = document.createElement('script')
  scriptElement.src = 'https://dashboard.lyvecom.com/widget/widget.js'
  scriptElement.onload = function () {
    LyveComWidget.mount({
      account: 'LYVECOM API KEY',
      lng: 'en',
      position: 'left',
      positionLeft: '0',
      positionBottom: '0',
      fullScreen: true,
    })
  }

  document.head.appendChild(scriptElement)
}

// Call the function to inject the script
injectLyveComWidgetScript()

// block-vendor:lyvecom
// block-type:live-streaming