import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ChevronLeft,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Phone,
} from "lucide-react-native";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import CustomText from "../../components/CustomText";
import ProfileTag from "../../components/ProfileTag";
import { COLORS } from "../../constants/theme";
import { useDogStore } from "../../store/dogStore";

const { width } = Dimensions.get("window");

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { breeds, selectedBreedImages, fetchBreedImages } = useDogStore();

  // Find matching dog item locally
  const dog = breeds.find((b) => b.id.toString() === id);

  useEffect(() => {
    if (dog) {
      fetchBreedImages(dog.id);
    }
  }, [id]);

  if (!dog) {
    return (
      <CustomText style={styles.centerText}>Dog profile not found</CustomText>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" translucent />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {/* Main dynamic profile image from API payload */}
          <Image source={{ uri: dog.image?.url }} style={styles.heroImage} />

          <View style={styles.navBar}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color="#FFF" />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.iconBtn}>
              <MoreHorizontal size={24} color="#FFF" />
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.titleRow}>
            <View style={styles.titleInfo}>
              <CustomText variant="title" style={styles.petName}>
                {dog.name}
              </CustomText>
              <View style={styles.locationRow}>
                <MapPin size={14} color={COLORS.textMuted} />
                <CustomText variant="body" style={styles.distanceText}>
                  Origin: {dog.origin || "Global Breed"}
                </CustomText>
              </View>
            </View>
            
            
            {dog.breed_group && (
              <View style={styles.groupBadge}>
                <CustomText variant="bold" color={COLORS.primary} style={styles.groupText}>
                  {dog.breed_group}
                </CustomText>
              </View>
            )}
          </View>

          {/* Primary Purpose Card Layout */}
          {dog.bred_for && (
            <View style={styles.purposeCard}>
              <View style={styles.pawIconContainer}>
                <Image 
                  source={{ uri: "https://flaticon.com" }} 
                  style={styles.pawIcon} 
                />
              </View>
              <View style={styles.ownerDetails}>
                <CustomText variant="bold">Primary Purpose</CustomText>
                <CustomText variant="caption" style={styles.purposeText}>
                  {dog.bred_for}
                </CustomText>
              </View>
              <View style={styles.actionIcons}>
                <TouchableOpacity style={styles.msgBtn}>
                  <MessageSquare size={18} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.callBtn}>
                  <Phone size={18} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Dynamic Profile Metrics Slider Row */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.tagsContainer}
          >
            <ProfileTag label="Lifespan" value={`${dog.life_span} Yrs`} />
            <ProfileTag
              label="Weight"
              value={dog.weight?.metric ? `${dog.weight.metric} kg` : "N/A"}
            />
            {dog.height?.metric && (
              <ProfileTag
                label="Height"
                value={`${dog.height.metric} cm`}
              />
            )}
          </ScrollView>

          {/* Description Section from Payload */}
          {dog.description && (
            <View style={styles.descriptionContainer}>
              <CustomText variant="subtitle" style={styles.sectionTitle}>
                About the Breed
              </CustomText>
              <CustomText variant="body" style={styles.descriptionText}>
                {dog.description}
              </CustomText>
            </View>
          )}

          {/* History Section from Payload */}
          {dog.history && (
            <View style={styles.descriptionContainer}>
              <CustomText variant="subtitle" style={styles.sectionTitle}>
                History & Heritage
              </CustomText>
              <CustomText variant="body" style={styles.descriptionText}>
                {dog.history}
              </CustomText>
            </View>
          )}

          {/* Temperament Section from Payload */}
          {dog.temperament && (
            <View style={styles.descriptionContainer}>
              <CustomText variant="subtitle" style={styles.sectionTitle}>
                Temperament
              </CustomText>
              <CustomText variant="body" style={styles.descriptionText}>
                {dog.temperament}
              </CustomText>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.adoptButton} onPress={() => router.back()}>
          <CustomText style={styles.adoptText}>Go back</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFF" },
  scrollContent: { paddingBottom: 120 },
  centerText: { textAlign: "center", marginTop: 50 },
  imageContainer: { width: width, height: 420, position: "relative" },
  heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
  navBar: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentCard: {
    marginTop: -30,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  titleInfo: { flex: 1 },
  petName: { fontSize: 28, fontWeight: "bold", color: COLORS.textDark },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  distanceText: { fontSize: 14, color: COLORS.textMuted },
  groupBadge: {
    backgroundColor: "#FFF2E2",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  groupText: { fontSize: 13, textTransform: "capitalize" },
  purposeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFEAD2",
    borderRadius: 24,
    padding: 14,
    marginTop: 24,
    backgroundColor: "#FFFDFB",
  },
  pawIconContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FFEAD2", justifyContent: "center", alignItems: "center" },
  pawIcon: { width: 24, height: 24, resizeMode: "contain" },
  ownerDetails: { flex: 1, marginLeft: 12, paddingRight: 6 },
  purposeText: { fontSize: 13, marginTop: 2, color: COLORS.textDark },
  actionIcons: { flexDirection: "row", gap: 8 },
  msgBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  callBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  tagsContainer: { flexDirection: "row", marginTop: 24, gap: 4, paddingRight: 20 },
  descriptionContainer: { marginTop: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  descriptionText: { lineHeight: 22, color: COLORS.textMuted, fontSize: 15 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 12,
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  adoptButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  adoptText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
