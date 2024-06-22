const url = "https://api.nosto.com/v1/graphql";
const slotId = "slot-id";
const token = "api-token";
const encodedToken = btoa(`:${token}`);
const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${encodedToken}`,
};

function clickProduct(id) {
  Tapcart.actions.openProduct({
    productId: id,
  });
}

const sessionBody = JSON.stringify({
  query: `mutation { newSession }`,
});
let singleRow = false;
fetch(url, {
  method: "POST",
  headers: headers,
  body: sessionBody,
})
  .then((response) => response.json())
  .then((data) => {
    const sessionId = data.data.newSession;

    let cartItems = Tapcart.variables.cart.items.map((item) => {
      return {
        productId: item.productId,
        priceCurrencyCode: Tapcart.variables.cart.currency,
        quantity: item.quantity,
      };
    }); 
    
    const cartItemsFormatted = cartItems.map(item => `{ productId: "${item.productId}", priceCurrencyCode: "${item.priceCurrencyCode}", quantity: ${item.quantity} }`).join(', ');

    const productsBody = JSON.stringify({
      query: `mutation {
                updateSession(
                  by: BY_CID
                  id: "${sessionId}"
                  params: {
                    event: { type: VIEWED_PAGE, target: "cart" }
                    cart: { items: [${cartItemsFormatted}] }
                  }
                ) {
                  pages {
                    forCartPage(
                      params: {
                        isPreview: false
                        imageVersion: VERSION_8_400_400
                        slotIds: ["${slotId}"]
                      }
                      value: 100
                    ) {
                      divId
                      resultId
                      primary {
                        productId
                        name
                        imageUrl
                        price
                      }
                    }
                  }
                }
              }`,
      });

    return fetch(url, {
      method: "POST",
      headers: headers,
      body: productsBody,
    });
  })
  .then((response) => response.json())
  .then((data) => {
    const productsFinal =
      data?.data?.updateSession?.pages?.forCartPage[0].primary;
    const row1 = document.createElement("div");
    row1.classList.add("row");
    productsFinal.forEach((product, i) => {
      const rawPriceString = product.price;
      const placeholder = document.createElement("div");
      placeholder.classList.add("product-card");
      placeholder.innerHTML = `
        <div onclick="clickProduct('${product.productId}')">
          <img src='${product.imageUrl}' alt='Product 1'>
          <p>$${rawPriceString}</p>
          <p class="productName">${product.name}</h3>
        </div>`;
      let row = row1;
      //let row = singleRow
      row.appendChild(placeholder);
    });
    const carousel = document.querySelector("#product-carousel");
    carousel.appendChild(row1);
  })
  .catch((error) => console.error("Error:", error));
