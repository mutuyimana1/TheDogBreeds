import { ArrowUpRight, Heart, MapPin } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "./CustomText";

interface Props {
  name: string;
  imageUri: string;
  distance: string;
  lifeSpan: string;    
  tagline: string;  
  breed_group: string;  
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

export default function PetCard({
  name,
  imageUri,
  distance,
  lifeSpan,
  tagline,
  breed_group,
  isFavorite,
  onPress,
  onFavoritePress,
}: Props) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      {/* If imageUri is empty, show a loading spinner placeholder */}
      {imageUri ? (
        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.bgImage}
          imageStyle={{ borderRadius: 32 }}
        >
          {/* Top Floating Heart Button */}
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.favBtn} onPress={onFavoritePress}>
              <Heart size={18} color={isFavorite ? "#FF3B30" : "#FFF"} />
            </TouchableOpacity>
          </View>

          {/* Text Overlays over layout */}
          <View style={styles.textContainer}>
            <CustomText variant="subtitle" color="#FFF" style={styles.title}>
              {name}
            </CustomText>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#FFF" />
              <CustomText variant="caption" color="#FFF">
                Origin: {distance}
              </CustomText>
            </View>
          </View>

          <View style={styles.glassFooter}>
            <View style={styles.textDataBlock}>
              <CustomText variant="bold" color="#FFF">
                Lifespan: {lifeSpan}
              </CustomText>
              <CustomText variant="caption" color="rgba(255,255,255,0.85)">
                Breed Group: {breed_group}
              </CustomText>
            </View>
            <TouchableOpacity style={styles.actionBtn}>
              <ArrowUpRight size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#E99B4B" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 340,
    marginBottom: 16,
    borderRadius: 32,
    backgroundColor: "#F5F5F5",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 340,
  },
  bgImage: { flex: 1, padding: 20, justifyContent: "space-between" },
  topRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  favBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { marginTop: 20 },
  title: { fontSize: 24, fontWeight: "bold", textTransform: "capitalize" },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  glassFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    padding: 16,
    borderRadius: 24,
  },
  textDataBlock: { flex: 1, marginRight: 8 }, 
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E99B4B",
    justifyContent: "center",
    alignItems: "center",
  },
});
