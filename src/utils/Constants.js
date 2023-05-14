import Constants from 'expo-constants';

export const admobConfig = {
  appId: Constants.manifest?.extra?.APP_ID,
  bannerId: Constants.manifest?.extra?.BANNER_ID,
  testIphoneDeviceId: Constants.manifest?.extra?.TEST_IPHONE_DEVISE_ID,
  testIpadDeviceId: Constants.manifest?.extra?.TEST_IPAD_DEVISE_ID,
};