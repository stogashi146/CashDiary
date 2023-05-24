export default ({ config }) => ({
  ...config,
  "expo": {
    "name": "CashDiary",
    "slug": "CashDiary",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#F1F8C3"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "buildNumber": "4",
      "supportsTablet": true,
      "bundleIdentifier": "CashDiary"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.stogashi146.CashDiary"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-dev-client"
    ],
    "extra": {
      APP_ID: process.env.APP_ID || null,
      BANNER_ID: process.env.BANNER_ID || null,
      TEST_IPHONE_DEVISE_ID: process.env.TEST_IPHONE_DEVISE_ID || null,
      TEST_IPAD_DEVISE_ID: process.env.TEST_IPAD_DEVISE_ID || null,
      "eas": {
        "projectId": "37bd0bdd-9fcf-4920-9eb6-e0719abf55c9"
      }
    }
  }
});
