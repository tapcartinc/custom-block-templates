function handleCartUpdate () {
  let progress;
  let cartTotal = Tapcart.variables?.cart?.subtotal;
  const currencyCode = Tapcart.variables?.cart?.currency;
  
  const currencyCodeSign = {
    USD: "$",
    CAD: "$",
    GBP: "£",
    EUR: "€",
  };

  const currencyCodeAmount = {
    USD: 60,
    CAD: 70,
    GBP: 40,
    EUR: 50,
  };
  
  var remainingAmount = 0;
  
    if (
      currencyCode == "USD" ||
      currencyCode == "CAD" ||
      currencyCode == "GBP" ||
      currencyCode == "EUR"
    ) {
      document.querySelector(
        ".final-amount"
      ).innerHTML = `${currencyCodeSign[currencyCode]}${currencyCodeAmount[currencyCode]}`;
      remainingAmount = currencyCodeAmount[currencyCode] - cartTotal;
      if (cartTotal > currencyCodeAmount[currencyCode]) {
        document.querySelector("#progress").style.width = "100%";
        document.querySelector(
          ".free-shipping-text"
        ).innerHTML = `YOUR BAG QUALIFIES FOR FREE SHIPPING`;
      } else {
        progress = (cartTotal / currencyCodeAmount[currencyCode]) * 100;
        document.querySelector("#progress").style.width = progress + "%";
        document.querySelector(".free-shipping-text").innerHTML = `YOU ARE ${
          currencyCodeSign[currencyCode]
        }${remainingAmount.toFixed(2)} AWAY FROM FREE SHIPPING`;
      }
    } else document.querySelector(".shipping-main-tracker").style.display = "none";
    Tapcart.actions.showToast({
      type: "success",
      message: 'Event occurred: "cart/updated"',
    });
    
  }
  
  handleCartUpdate()
  Tapcart.registerEventHandler("cart/updated", handleCartUpdate)
  