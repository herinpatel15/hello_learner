import { ThemeProvider } from "@/context/themeContext";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/onBoarding" />
      </Stack>
    </ThemeProvider>
  );
}
