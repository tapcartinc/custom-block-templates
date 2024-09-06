// * Config
const MOBILE_OS = {
    // The default link to use if the device isn't iOS or Android.
    // To hide the banner on non iOS/Android devices, set to null
    Default: 'iOS',
    iOS: 'iOS',
    Android: 'Android',
};

const CONFIG = {
    // Example with Facebook
    // https://apps.apple.com/us/app/facebook/id284882215
    [MOBILE_OS.iOS]: {
        // App Store ID
        appId: '284882215',
        // Name in App Store
        appName: 'facebook',
    },
    // Example with Facebook
    // https://play.google.com/store/apps/details?id=com.facebook.katana
    [MOBILE_OS.Android]: {
        // Play Store ID
        appId: 'com.facebook.katana',
    },
};
// * Config

// !! dev
// If this array contains any device IDs, the block will ONLY display for THOSE devices.
// If the array is empty, it will display for ALL devices.
const DEV_DEVICE_IDS = [];

const shouldHide = Boolean(
    DEV_DEVICE_IDS.length && !DEV_DEVICE_IDS.includes(Tapcart.variables.device.id)
);
// !! dev

const container = document.querySelector('#container');
const linkElement = document.querySelector('#link');

const determineMobileOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return MOBILE_OS.iOS;

    // Check for Android
    if (/android/i.test(userAgent)) return MOBILE_OS.Android;

    // Default to iOS for this block
    return MOBILE_OS.Default;
};

const links = {
    Android: (appId) => `https://play.google.com/store/apps/details?id=${appId}`,
    iOS: (appName, appId) => `https://apps.apple.com/app/${appName.toLowerCase()}/id${appId}`,
};

function main() {
    if (shouldHide) return;

    const mobileOS = determineMobileOS();

    const linkConfig = CONFIG[mobileOS];
    if (!linkConfig) return;

    const linkUrl = links[mobileOS](linkConfig.appName, linkConfig.appId);
    // This is critical for the link to work
    linkElement.target = '_blank';
    linkElement.href = linkUrl;

    container.classList.remove('hidden');
}

main();
