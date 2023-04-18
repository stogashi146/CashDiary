import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { DiaryListScreen } from "./src/screens/DiaryListScreen";
import { DiaryCreateScreen } from "./src/screens/DiaryCreateScreen";
import { DiaryDetailScreen } from "./src/screens/DiaryDetailScreen";
import { DiaryEditScreen } from "./src/screens/DiaryEditScreen";
import { useInitDatabase } from "./src/hooks/useInitDatabase";
import { useFetchDiary } from "./src/hooks/useFetchDiary";
import { useEffect } from "react";
import { deleteAllDiary, deleteAllTable } from "./src/utils/DatabaseUtils";

const Stack = createStackNavigator();

export default function App() {
  const { createdSuccess, error } = useInitDatabase();

  if (error) {
    console.log("Error: " + error);
  }
  useEffect(() => {
    // deleteAllDiary();
    // deleteAllTable();
  }, []);

  return (
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
        <Stack.Screen name="DiaryList" component={DiaryListScreen} />
        <Stack.Screen name="DiaryCreate" component={DiaryCreateScreen} />
        <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
        <Stack.Screen name="DiaryEdit" component={DiaryEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
