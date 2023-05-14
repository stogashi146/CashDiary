import { useEffect, useState } from "react";
import {
  AdsConsent,
  AdsConsentDebugGeography,
  AdsConsentStatus,
} from "react-native-google-mobile-ads";
import { admobConfig } from "../utils/Constants";

export const AdMob = () => {
  // トラッキング可否を保持する。これをContextなどに持たせて他の画面でも利用する
  // ※ trueでトラッキングしない。falseでトラッキングする
  const [nonPersonalizedOnly, setNonPersonalizedOnly] = useState(true);

  useEffect(() => {
    // ATTとGDPRの同意状態を取得
    AdsConsent.requestInfoUpdate({
      debugGeography: AdsConsentDebugGeography.EEA, // EU圏としてテストする設定
      testDeviceIdentifiers: [
        admobConfig.testIphoneDeviceId,
        admobConfig.testIpadDeviceId,
      ],
    }).then(async (consentInfo) => {
      let status = consentInfo.status;
      if (
        consentInfo.isConsentFormAvailable &&
        status === AdsConsentStatus.REQUIRED
      ) {
        // 同意状態が必要な場合はダイアログを表示する
        const result = await AdsConsent.showForm();
        status = result.status;
      }

      if (
        consentInfo.status === AdsConsentStatus.OBTAINED ||
        status === AdsConsentStatus.OBTAINED
      ) {
        // 同意が取得できた場合はNonPersonalizedOnlyをfalseにする(トラッキング取得する)
        setNonPersonalizedOnly(false);
      }
    });
  }, []);
};
