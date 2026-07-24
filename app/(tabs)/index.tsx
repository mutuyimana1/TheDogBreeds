import React, { useEffect, useCallback } from "react";
import { FlatList, ScrollView, StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Bell, PawPrint } from "lucide-react-native";

import Category from "@/components/Category";
import CustomText from "@/components/CustomText";
import PetCard from "@/components/PetCard";
import { SearchSection } from "@/components/SearchSection"; 
import { COLORS } from "@/constants/theme";
import { useDogStore } from "@/store/dogStore"; 

export default function AppScreen() {
  const router = useRouter();

  const { 
    filteredBreeds, 
    categories, 
    activeCategory, 
    searchQuery, 
    loading, 
    fetchBreeds,
    setSearchQuery, 
    setActiveCategory 
  } = useDogStore();

  useEffect(() => {
    fetchBreeds(); 
  }, []);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, [setSearchQuery]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" translucent={false} backgroundColor={COLORS.background} />
      
      {loading && filteredBreeds.length === 0 ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.centeredLoader} />
      ) : (
        <FlatList
          data={filteredBreeds.slice(0, 5)}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              {/* Header Block */}
              <View style={styles.header}>
                <View>
                  <CustomText variant="title" style={styles.title}>
                    The Dog
                  </CustomText>
                  <CustomText variant="title" color={COLORS.primary}>
                    The Ultimate Dog Breed Explorer
                  </CustomText>
                </View>
                {/* <TouchableOpacity style={styles.bellBtn}>
                  <Bell size={22} color={COLORS.textDark} />
                  <View style={styles.badge} />
                </TouchableOpacity> */}
              </View>

              {/* Search Section */}
              <SearchSection 
                value={searchQuery} 
                onChangeText={handleSearchChange} 
                onViewAllPress={() => console.log('View all pressed')}
              />

              {/* Categories Scrollable Bar */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
                style={styles.categoriesScroll}
              >
                <Category
                  label="All"
                  icon={<PawPrint size={22} color={activeCategory === 'All' ? '#FFF' : COLORS.primary} />}
                  isActive={activeCategory === "All"}
                  onPress={() => setActiveCategory("All")}
                />

                {categories.map((cat) => (
                  <Category
                    key={cat.id}
                    label={cat.name}
                    isActive={activeCategory === cat.name}
                    onPress={() => setActiveCategory(cat.name)}
                  />
                ))}
              </ScrollView>
            </View>
          }
          
          ListEmptyComponent={
            <CustomText style={styles.emptyText}>No breeds found matching selections.</CustomText>
          }
          renderItem={({ item }) => (
            <PetCard
              name={item.name}
              distance={item.origin || "Global"}
              imageUri={item.image?.url || "https://unsplash.com"}
              lifeSpan={`${item.life_span || "10-15"} Yrs`}
              tagline={item.description || item.temperament || "Alert, loyal, active, and friendly native companion breed profile."}
              breed_group={item.breed_group || "Mixed Breed"}
              isFavorite={false}
              onPress={() => 
                router.push({
                  pathname: "/breed/[id]",
                  params: { id: item.id.toString() }
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
  title:{paddingBottom: 10 },
  listContainer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  centeredLoader: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { textAlign: 'center', marginTop: 40, color: COLORS.textMuted },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  bellBtn: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.cardBg },
  badge: { position: "absolute", top: 12, right: 14, width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF3B30" },
  categoriesScroll: { marginBottom: 16 },
  categoriesList: { gap: 12, paddingBottom: 8 },
});
