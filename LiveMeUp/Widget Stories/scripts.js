fetch(`https://api.livemeup.io/ssr/blocks/playlists/products/${Tapcart.variables.product.id}`).then((content) => {
  return content.text(); 
}).then(text => {
  const parentDiv = document.querySelector("#root");
  const range = document.createRange();
  range.selectNode(parentDiv);
  const documentFragment = range.createContextualFragment(text); 
  parentDiv.append(documentFragment);  
 });