import React, { useContext } from "react";
import { Platform, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { admobConfig } from "../utils/Constants";

interface Props {
  size: BannerAdSize;
}

export default function MyAdmob(props: Props) {
  // テスト用のID
  // 実機テスト時に誤ってタップしたりすると、広告の配信停止をされたりするため、テスト時はこちらを設定する
  const testUnitId = TestIds.BANNER;

  // 実際に広告配信する際のID
  // 広告ユニット（バナー）を作成した際に表示されたものを設定する
  const adUnitID = Platform.select({
    ios: "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy",
    android: "ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy",
  });
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingBottom: insets.bottom }}>
      <BannerAd
        {...props}
        // ここの環境変数が{}になっていることが原因でエラーになっている
        unitId={admobConfig.bannerId}
        // requestOptions={{ requestNonPersonalizedAdsOnly: !!nonPersonalizedOnly }}
      />
    </View>
  );
}
