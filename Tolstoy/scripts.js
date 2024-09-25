const publishId = 'xxxxxxxxxxxx';
const tolstoyAppKey = 'TOLSTOY_APP_KEY';

const isPDPBlock = false;
const typeOfNavigation = 'Side Navigation'; // Options: 'Side Navigation', 'Bottom Navigation'
const locationOfNavigationLink = 'Home page top bar'; // Options: 'Home page top bar', 'Navigation item'

// Mapping to determine dataNavType based on locationOfNavigationLink and typeOfNavigation
const navigationMapping = {
  'Home page top bar': {
    'Side Navigation': 'header',
    'Bottom Navigation': 'header-and-bottom-navbar',
  },
  'Navigation item': {
    'Side Navigation': 'custom-screen',
    'Bottom Navigation': 'custom-screen-and-bottom-navbar',
  },
};

const dataNavType = navigationMapping[locationOfNavigationLink][typeOfNavigation] || '';

function renderTolstoyHTMLelement() {
    // Determine element type and attributes based on block type
    const elementType = isPDPBlock ? 'tolstoy-carousel' : 'tolstoy-block';
    const blockType = isPDPBlock ? 'pdp-carousel' : 'video-page';
  
    // Create the appropriate Tolstoy element
    const tolstoyElement = document.createElement(elementType);
  
    // Add common attributes
    tolstoyElement.setAttribute('data-publish-id', publishId);
    tolstoyElement.setAttribute('data-block-type', blockType);
    
    // Handle PDP block-specific settings
    if (isPDPBlock) {
      tolstoyElement.setAttribute('data-product-id', Tapcart.variables.product.id);
    } else {
      tolstoyElement.id = 'tolstoy-tv-container';
      tolstoyElement.setAttribute('data-nav-type', dataNavType);
    }
  
    // Add appropriate class based on block type
    tolstoyElement.classList.add(isPDPBlock ? 'tolstoy-carousel' : 'tolstoy-video-page');
  
    // Append the Tolstoy element to the DOM
    document.body.appendChild(tolstoyElement);
  }
  

function createTolstoyBlock() {
  
  const script = document.createElement('script');
  script.type = 'module';
  script.defer = true;
  script.src = 'https://widget.gotolstoy.com/we/widget.js';
  script.setAttribute('data-app-key', tolstoyAppKey);

  // Wait for the script to load before rendering the tolstoy-block
  script.onload = () => {
    renderTolstoyHTMLelement();
  };

  document.head.appendChild(script);
}

createTolstoyBlock();
