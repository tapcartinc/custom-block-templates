((document, scriptType, divId, callback) => {
    const scriptElement = document.createElement(scriptType);
    const divElement = document.createElement("div");
    divElement.id = divId;
  
    // Retrieve your instanceId and subdomain from the Zowie admin panel
    const subdomain = "your-subdomain";
    const instanceId = "xxxxxxxxxxxxxxxxxxxxxxxxx";
  
    const defaultMetadata = {
      firstName: Tapcart.variables.customer ? Tapcart.variables.customer.firstName : null,
      email: null
    };
  
    const initializeChatbot = (metadata) => {
      scriptElement.onload = () => callback(instanceId, metadata);
  
      if (scriptElement.readyState) {
        scriptElement.onreadystatechange = () => {
          if (scriptElement.readyState === "loaded" || scriptElement.readyState === "complete") {
            scriptElement.onreadystatechange = null;
            callback(instanceId, metadata);
          }
        };
      }
  
      scriptElement.src = `https://${subdomain}.chat.getzowie.com/web/embedded/chatbotize-entrypoint.min.js`;
      document.body.appendChild(scriptElement);
      document.body.appendChild(divElement);
    };
  
    const getCustomerIdentityAsync = () => {
      return new Promise((resolve) => {
        Tapcart.actions.getCustomerIdentity(null, {
          onSuccess: (res) => {
            const metadata = {
              firstName: res.customer.firstName,
              email: res.customer.email
            };
            resolve(metadata);
          },
        });
      });
    };
  
    (async () => {
      const metadata = await getCustomerIdentityAsync().catch(() => defaultMetadata);
      initializeChatbot(metadata);
    })();
  })(document, "script", "chatbotize", (instanceId, metadata) => {
    Chatbotize.init({
      nodeId: "chatbotize-widget",
      instanceId,
      headerVisible: false,
      metadata,
    });
  });