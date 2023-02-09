function skuFinder(product) {
    const tc = product;
    const found = tc.variants.find(element => element.id === tc.selectedVariant.id);
    console.log(found.sku);
    document.querySelector(".sku").innerText = found.sku;
}
skuFinder(Tapcart.variables.product)

Tapcart.registerEventHandler("product/updated", (data) => {
    const product = data.product;
    skuFinder(product)
});