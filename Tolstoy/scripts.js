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
  const tolstoyElement = document.createElement('tolstoy-block');
  const blockType = isPDPBlock ? 'pdp-carousel' : 'video-page';

  tolstoyElement.setAttribute('data-publish-id', publishId);
  tolstoyElement.setAttribute('data-block-type', blockType);

  if (!isPDPBlock) {
    tolstoyElement.setAttribute('data-nav-type', dataNavType);
  }

  document.body.appendChild(tolstoyElement);
}

function createTolstoyBlock() {
  const script = document.createElement('script');
  script.type = 'module';
  script.defer = true;
  script.src = 'https://widget.gotolstoy.com/we/widget.js';
  script.setAttribute('data-app-key', tolstoyAppKey);

  document.head.appendChild(script);
}

renderTolstoyHTMLelement();
createTolstoyBlock();