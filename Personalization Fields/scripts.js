// Tapcart Variables
var selectedVariantId = Tapcart.variables.product.selectedVariant.id;

// Tapcart Register Event Handler
Tapcart.registerEventHandler("product/updated", (data) => {
    let selectedVariantId = data.product.selectedVariant.id;
});

// Add to Cart Function
function addToCart() {
    const vId = Tapcart.variables.product.selectedVariant.id;
    console.log(vId);
    const ringSize = document.querySelector("#ringSizeInput").value;
    console.log(ringSize);
    const initials = document.querySelector("#initialsInput").value;
    console.log(initials);
    const name = document.querySelector("#nameInput").value;
    console.log(name);
    Tapcart.actions.addToCart({
        lineItems: [
            {
                quantity: 1,
                variantId: vId,
                attributes: [
                    {
                        key: "Ring Size",
                        value: ringSize,
                    },
                    {
                        key: "Initials",
                        value: initials,
                    },
                    {
                        key: "Name",
                        value: name,
                    },
                ],
            },
        ],
    });
    document.querySelector(".add-to-cart").innerText = "Added!";
    document.querySelector(".add-to-cart").disabled = true;
    setTimeout(() => {
        document.querySelector(".add-to-cart").innerText = "Add to cart";
        document.querySelector(".add-to-cart").disabled = false;
    }, 2000);
}
