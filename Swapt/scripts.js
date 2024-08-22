function createQrCode(email) {
    // Define your API endpoint and parameters
    const apiKey = "YOUR API KEY HERE"; // Replace with your actual API key
    const baseCode = "YOUR BASE CODE HERE"; // Replace with your actual base code ID e.g. "15c99835-2e54-11ef-a9e9-bf823ae00281"
    const apiEndpoint = `https://api.swapt.link?api_key=${apiKey}&base_code=${baseCode}&email=${email}`;
    const img = new Image();
    img.src = apiEndpoint;
    img.alt = "QR Code";
    img.onload = function () {
      // Display the QR code
      const qrContainer = document.getElementById("qr-container");
      qrContainer.innerHTML = ""; // Clear loading message
      qrContainer.appendChild(img);
    };
  }
  
  function loadQRCode() {
    if (window?.Tapcart?.isInitialized) {
      window.Tapcart.actions.getCustomerIdentity(null, {
        onSuccess: (res) => {
          console.log("getCustomerIdentity success", res);
         createQrCode(res?.email);
        },
      });
    } else {
      console.log("Error");
    }
  }
  
  