import Category from "@/components/Category";
import PetCard from "@/components/PetCard";
import { SearchSection } from "@/components/SearchSection";
import { COLORS } from "@/constants/theme";
import { useDogStore } from "@/store/dogStore";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PawPrint } from "lucide-react-native";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dog() {
  const {
    filteredBreeds,
    loading,
    searchQuery,
    fetchBreeds,
    setSearchQuery,
    categories,
    activeCategory,
    setActiveCategory,
  } = useDogStore();

  useEffect(() => {
    fetchBreeds();
  }, []);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
    },
    [setSearchQuery],
  );

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        style="dark"
        translucent={false}
        backgroundColor={COLORS.background}
      />

      {loading && filteredBreeds.length === 0 ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={styles.centeredLoader}
        />
      ) : (
        <FlatList
          data={filteredBreeds}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
      
          ListHeaderComponent={
            <View>
              {/* Reusable Search Section */}
              <SearchSection
                value={searchQuery}
                onChangeText={handleSearchChange}
                onViewAllPress={() => console.log("View all pressed")}
              />

              {/* Scrollable Categories List */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
                style={styles.categoriesScroll}
              >
                <Category
                  label="All"
                  icon={
                    <PawPrint
                      size={22}
                      color={activeCategory === "All" ? "#FFF" : COLORS.primary}
                    />
                  }
                  isActive={activeCategory === "All"}
                  onPress={() => setActiveCategory("All")}
                />

                {categories.map((cat) => (
                  <Category
                    key={cat.id}
                    label={cat.name}
                    imageUri={cat.imageUri}
                    
                    isActive={activeCategory === cat.name}
                    onPress={() => setActiveCategory(cat.name)}
                  />
                ))}
              </ScrollView>
            </View>
          }
          
          ListEmptyComponent={
            <View style={styles.centeredLoader}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          }
          
          renderItem={({ item }) => (
            <PetCard
              name={item.name}
              distance={item.origin || "Global"}
              imageUri={item.image?.url || "https://unsplash.com"}
              lifeSpan={`${item.life_span || "10-15"} Yrs`}
              breed_group={item.breed_group || "Mixed Breed"}
              tagline={
                item.description ||
                item.temperament ||
                "Elegant, alert and intelligent active companion breed profile."
              }
              isFavorite={false}
              onPress={() =>
                router.push({
                  pathname: "/breed/[id]",
                  params: { id: item.id.toString() },
                })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  listContainer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  centeredLoader: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 40 },
  categoriesScroll: { marginBottom: 16 },
  categoriesList: { gap: 12, paddingBottom: 8 },
});
