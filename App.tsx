import React, { useState } from "react";
import "expo-dev-client";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { DiaryListScreen } from "./src/screens/DiaryListScreen";
import { DiaryCreateScreen } from "./src/screens/DiaryCreateScreen";
import { DiaryDetailScreen } from "./src/screens/DiaryDetailScreen";
import { DiaryEditScreen } from "./src/screens/DiaryEditScreen";
import { useInitDatabase } from "./src/hooks/useInitDatabase";
// import { useFetchDiary } from "./src/hooks/useFetchDiary";
import { useEffect } from "react";
import {
  deleteAllDiaryAndBalance,
  deleteAllTable,
} from "./src/utils/DatabaseUtils";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  AdsConsent,
  AdsConsentDebugGeography,
  AdsConsentStatus,
  BannerAdSize,
} from "react-native-google-mobile-ads";
import MyAdmob from "./src/components/MyAdmob";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  const { createdSuccess, error } = useInitDatabase();
  // トラッキング可否を保持する。これをContextなどに持たせて他の画面でも利用する
  // ※ trueでトラッキングしない。falseでトラッキングする
  const [nonPersonalizedOnly, setNonPersonalizedOnly] = useState(true);
  // const navigation = useNavigation();

  if (error) {
    console.log("Error: " + error);
  }
  useEffect(() => {
    // deleteAllDiaryAndBalance();
    // deleteAllTable();
  }, []);

  useEffect(() => {
    // ATTとGDPRの同意状態を取得
    AdsConsent.requestInfoUpdate({
      debugGeography: AdsConsentDebugGeography.EEA, // EU圏としてテストする設定
      testDeviceIdentifiers: ["TEST-DEVICE-HASHED-ID"],
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

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      {/* <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      > */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="DiaryList"
          screenOptions={{
            headerStyle: { backgroundColor: "#F0F4F8" },
            headerTitleStyle: { color: "#525252" },
            headerTintColor: "#525252",
            headerTitle: "CashDiary",
            headerBackTitle: "Back",
            headerBackTitleStyle: { color: "#525252", fontSize: 16 },
            // iOSとAndroidで遷移時のアニメーションを統一
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name="DiaryList"
            component={DiaryListScreen}
            options={{
              headerLeft: () => null, // 戻るボタンを非表示にする
            }}
          />
          <Stack.Screen name="DiaryCreate" component={DiaryCreateScreen} />
          <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
          <Stack.Screen name="DiaryEdit" component={DiaryEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <View > */}
      <MyAdmob size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
      {/* </View> */}
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
