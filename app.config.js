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
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
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
    },
    "react-native-google-mobile-ads": {
      "ios_app_id": process.env.APP_ID,
      "android_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx",
      "delay_app_measurement_init": true,
      "user_tracking_usage_description": "許可することで、より関連性の高い広告を表示することができるようになります。",
    }
  }
});
