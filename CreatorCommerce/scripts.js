document.querySelector("#cc-iframe-container").style.height = `${
    Tapcart.variables.device.windowHeight - 60
  }px`;
  
  let mobileCalledLoad = false;
  let iframeCalledLoaded = false;
  
  const theme = {
    primaryColor: "red",
    borderRadius: "4px",
    buttonMaxWidth: "200px",
  };
  
  window.addEventListener(
    "message",
    (event) => {
      iframeCalledLoaded = event.data.iframeLoaded;
    },
    false
  );
  
  const mobileCalledLoadChecker = setInterval(() => {
    if (Tapcart.isInitialized) {
      mobileCalledLoad = true;
      // call post message and start the website
  
      if (iframeCalledLoaded) {
        clearInterval(mobileCalledLoadChecker);
      } else {
        bridgeCcIframe();
      }
    }
  }, 1000);
  
  const bridgeCcIframe = () => {
    document
      .getElementById("cc-iframe")
      .contentWindow.postMessage(
        {
          sender: "cc-iframe",
          type: "onLoad",
          data: { ...Tapcart.variables, theme },
        },
        "*"
      );
  };
  