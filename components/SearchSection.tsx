import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import SearchBar from "./SearchBar";
import CustomText from "./CustomText";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onViewAllPress?: () => void;
}

// 💡 Memoizing prevents unnecessary header re-renders when lists update
export const SearchSection = React.memo(({ value, onChangeText, onViewAllPress }: Props) => {
  return (
    <View style={styles.container}>
      {/* 🔍 Search Input Hooked Safely */}
      <SearchBar value={value} onChangeText={onChangeText} />

      {/* Categories Bar */}
      <View style={styles.sectionHeader}>
        <CustomText variant="subtitle">Categories</CustomText>
       
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { width: "100%" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
});
