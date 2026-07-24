import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { ChevronRight } from "lucide-react-native"; 
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const WELCOME_SEEN_KEY = "thedog-welcome-seen";

export default function WelcomeScreen() {
  const [isChecking, setIsChecking] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    const checkLaunchState = async () => {
      try {
        const savedValue = await AsyncStorage.getItem(WELCOME_SEEN_KEY);
        setHasSeenWelcome(savedValue === "true");
      } catch {
        setHasSeenWelcome(false);
      } finally {
        setIsChecking(false);
      }
    };
    checkLaunchState();
  }, []);

  const handleContinue = async () => {
    await AsyncStorage.setItem(WELCOME_SEEN_KEY, "true");
    router.replace("/(tabs)");
  };

  if (isChecking) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E99B4B" />
      </View>
    );
  }

  if (hasSeenWelcome) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={styles.root}>
      <View style={styles.orangeHeader}>
        <SafeAreaView edges={["top"]} style={styles.brandContainer}>
          <Text style={styles.brandTitle}>Welcome</Text>
          <Text style={styles.brandTitle}>to Dog Breeds</Text>
        </SafeAreaView>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fHww",
          }}
          style={styles.heroImage}
        />
      </View>
      <View style={styles.curveCard}>
        <View style={styles.textBlock}>
          <Text style={styles.headline}>Take care of</Text>
          <Text style={styles.headline}>Your pet's health</Text>

          <Text style={styles.subtext}>
            Discover the wonderful world{"\n"}{" "}
            <Text style={styles.highlightText}>of dog breeds!</Text>
          </Text>
        </View>

        <Pressable style={styles.getStartedBtn} onPress={handleContinue}>
          <View style={styles.iconCircle}>
            <ChevronRight size={20} color="#E99B4B" strokeWidth={3} />
          </View>
          <Text style={styles.btnLabel}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#E99B4B" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  orangeHeader: { height: "52%", position: "relative" },
  brandContainer: { paddingHorizontal: 32, paddingTop: 24 },
  brandTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFF",
    lineHeight: 46,
  },
  heroImage: {
    alignSelf: "center",
    width: width * 0.72,
    height: width * 0.72,
    resizeMode: "contain",
    borderRadius: width * 0.36,
  },
  curveCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 36,
    paddingTop: 50,
    paddingBottom: 45,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBlock: { alignItems: "center", width: "100%" },
  headline: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1A1A",
    textAlign: "center",
    lineHeight: 38,
  },
  subtext: {
    fontSize: 14,
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: 24,
    lineHeight: 22,
    fontWeight: "500",
  },
  highlightText: { color: "#E99B4B", fontWeight: "600" },
  getStartedBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E99B4B",
    width: "100%",
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 8,
    shadowColor: "#E99B4B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  btnLabel: {
    flex: 1,
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginRight: 44,
  },
});
