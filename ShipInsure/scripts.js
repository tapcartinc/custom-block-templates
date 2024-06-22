var merchant = {
	shopify_id: 'Shopify ID',
};

async function getVault() {
	if (window.tapcartVault) {
		return window.tapcartVault;
	}
	const vault = await Tapcart.actions.vault.initialize("shipinsure", "global");
	window.tapcartVault = vault;
	return vault;
}

async function processOptOut() {
	const vault = await getVault();
	const customerCheck = (await vault.get('customer_toggled_widget')) !== 'yes';
	const merchantCheck = window.ShipInsure.merchantConfig.opt_in_out === 'out';
	if (merchantCheck && customerCheck) {
		addShipInsureToCart();
		setShipInsureCheckboxStatus(true);
	}
};

function setShipInsureCheckboxStatus(value) {
	const checkbox = getShipInsureCheckbox();
	checkbox.checked = value;
}

function getErrorString(err) {
	return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

function showToastWithLog(...args) {
	console.log("@ShipInsure: ", ...args);
}

function showShipInsureLog(...args) {
	console.log("@ShipInsure: ", ...args);
}

function showToast(message, type='success') {
}

function showShipInsureWidget() {
	const widget = document.querySelector(".si-container");
	if (widget) {
		widget.style.display = 'block';
	}
}

function hideShipInsureWidget() {
	const widget = document.querySelector(".si-container");
	if (widget) {
		widget.style.display = 'none';
	}
}

async function loadShipInsureMerchantConfig() {
	var url = "https://api.shipinsure.io/v1/merchants/config?include_product=true&shopify_id=" + merchant.shopify_id;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to load merchant configuration from API');
	}
	const merchantConfig = await response.json();
	merchantConfig['shipinsure_product'] = merchantConfig['shipinsure_product'];
	const product = merchantConfig['shipinsure_product'];
	product.id = String(product.id);
	product.variants = product.variants.map((variant) => {
		const [, , range] = variant.sku.split("_");
		const [_min, _max] = range.split("-").map((value) => parseInt(value));
		return {
			...variant,
			_min,
			_max,
			id: String(variant.id),
			price: Number(variant.price),
			product_id: String(variant.product_id),
		};
	});
	return merchantConfig;
}

const updateVisualQuote = () => {
	const siVariant = getShipInsureVariantBasedOnCartSubtotal();
	if (!siVariant) {
		setShipInsureCheckboxStatus(false);
		showToast("We are unable to protect this order $" + getSubtotal(), 'error');
		return;
	}
	const quoteValue = siVariant.price;
	const msg = quoteValue ? `$${parseFloat(quoteValue.toFixed(2))}` : '';
	const amountTag = document.getElementById("shipinsure-amount");

	if (amountTag) {
			amountTag.innerHTML = msg;
	}
};

function getCart() {
	return Tapcart.variables.cart;
}

function isCartEmpty() {
	const cart = getCart();
	if (cart.items.length === 0)
		return true;
	return false;
}

function getShipInsureCheckbox() {
	return document.getElementsByClassName("switch-input")[0];
}

function getShipInsureVariants() {
	return window.ShipInsure.siProduct.variants;
}

function getSubtotal() {
	const cart = getCart();
	let { subtotal } = cart;
	const siVariant = findShipInsureItemInCart();
	if (siVariant) {
		subtotal -= siVariant.price;
	}
	return subtotal;
}

function getShipInsureVariantBasedOnCartSubtotal() {
	const subtotal = getSubtotal();
	const siVariants = getShipInsureVariants();
	const idealVariant = siVariants.find(variant => variant._min <= subtotal && subtotal < variant._max);
	return idealVariant;
}

function hasMultipleShipInsureItemsInCart() {
	const cart = getCart();
	const siItems = cart.items.filter(item => item.productId === window.ShipInsure.siProduct.id);
	return siItems.length > 1 || siItems[0]?.quantity > 1;
}

function findShipInsureItemInCart() {
	const cart = getCart();
	let siItem = cart.items.find(item => item.productId === window.ShipInsure.siProduct.id);
	if (siItem) {
		const siVariant = window.ShipInsure.siProduct.variants.find(variant => variant.id === siItem.variantId);
		siItem = {
			...siItem,
			price: siVariant.price
		};
	}
	return siItem;
}

function findAllShipInsureItemsInCart() {
	const cart = getCart();
	const siItems = cart.items.filter(item => item.productId === window.ShipInsure.siProduct.id);
	return siItems;
}

function isShipInsureVariant(variantId) {
	const siVariants = getShipInsureVariants();
	return !!siVariants.find(variant => variant.id === variantId);
}

function addShipInsureToCart() {
	const siItem = findShipInsureItemInCart();
	const siVariant = getShipInsureVariantBasedOnCartSubtotal();
	try {
		if (siItem) {
			if (siItem.variantId !== siVariant?.id || hasMultipleShipInsureItemsInCart()) {
				removeShipInsureFromCart();	
			} else {
				return;
			}
		}
	} catch (err) {
		showToast("Something went wrong while removing ShipInsure item");
	}
	try {
		if (siVariant) {
			Tapcart.actions.addToCart({
				lineItems: [
					{
						variantId: siVariant.id,
						quantity: 1
					}
				]
			});
			showToast('ShipInsure successfully added: ' + siVariant.price);
		} else {
			setShipInsureCheckboxStatus(false);
			showToast("ShipInsure Variant not found for $" + getSubtotal(), "error");
		}
	} catch (err) {
		showToast("Something went wrong while removing ShipInsure item: " + siVariant.id, "error");
	}
}

function removeShipInsureFromCart() {
	const siItems = findAllShipInsureItemsInCart();
	if (!siItems.length)
		return;
	Tapcart.actions.removeFromCart({
		lineItems: siItems
	});
}

function handleDynamicCartUpdate() {
	const siItem = findShipInsureItemInCart();
	if (siItem) {
		addShipInsureToCart();
		setShipInsureCheckboxStatus(true);
	} else {
		removeShipInsureFromCart();
		setShipInsureCheckboxStatus(false);
	}
	updateVisualQuote();
	
	const siVariant = getShipInsureVariantBasedOnCartSubtotal();
	if (siVariant) {
		showShipInsureWidget();
	} else {
		hideShipInsureWidget();
	}
}

function setupEventHandlers() {
	Tapcart.registerEventHandler("cart/updated", (eventData) => {
		showToast("Cart is updated with $" + getSubtotal());
		Tapcart.variables = {
			...Tapcart.variables,
			...eventData
		};
		handleDynamicCartUpdate();
	});

	const checkbox = getShipInsureCheckbox();
	checkbox.addEventListener("change", async function() {
		const vault = await getVault();
		await vault.set('customer_toggled_widget', 'yes');
		if (this.checked) {
			addShipInsureToCart();
		} else {
			removeShipInsureFromCart();
		}
	});
}

async function initializeTapcart() {
	// Defines a new global ShipInsure object
	window.ShipInsure = {};

	// Loads merchant configuration from ShipInsure API
	const merchantConfig = await loadShipInsureMerchantConfig();
	window.ShipInsure.merchantConfig = merchantConfig;
	window.ShipInsure.siProduct = merchantConfig['shipinsure_product'];

	// Setup cart events and widget toggle event
	setupEventHandlers();

	// Displays initial ShipInsure quote price
	updateVisualQuote();

	// Process OptInOut
	processOptOut();
}

initializeTapcart();