import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DiaryListScreen } from "./src/screens/DiaryListScreen";
import { DiaryCreateScreen } from "./src/screens/DiaryCreateScreen";
import { DiaryDetailScreen } from "./src/screens/DiaryDetailScreen";
import { DiaryEditScreen } from "./src/screens/DiaryEditScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DiaryList"
        screenOptions={{
          headerStyle: { backgroundColor: "#F0F4F8" },
          headerTitleStyle: { color: "#525252" },
          headerTintColor: "#525252",
          headerTitle: "Home",
          headerBackTitle: "Back",
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
