// Get the price from the HTML element with the class "get-price"
var price = document.querySelector(".get-price").innerHTML;

// Log the price to the console
console.log(price);

// Define a function that divides a given price by 4 and returns the result rounded to 2 decimal places
function divideByFour(price) {
  const transformedPrice = price / 4;
  return transformedPrice.toFixed(2);
}

// Log the result of the divideByFour function to the console
console.log(divideByFour(price));

// Update the HTML element with the class "display-price" with the divided price
document.querySelector(".display-price").innerHTML = divideByFour(price);
