import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <View style={styles.root}>
      <StatusBar style="auto" translucent={false} />
      <Stack
        screenOptions={{
          // headerStyle: { backgroundColor: '#212529' },
          // headerTintColor: '#212529',
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="breed/[id]" 
          options={{ 
            headerShown: false,
            animation: "slide_from_right"
          }} 
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#212529",
  },
});
