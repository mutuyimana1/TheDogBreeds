import { create } from 'zustand';

export interface DogBreed {
  id: number;
  name: string;
  description?: string;
  life_span?: string;
  origin?: string;
  weight?: { metric: string };
  image?: { url: string };
  breed_group?: string;
  bred_for?: string;
  height?: { metric: string };
  temperament?: string;
  history?: string;
}

interface DogCategory {
  id: string; 
  name: string;
  imageUri?: string; 
}

interface DogState {
  breeds: DogBreed[];
  categories: DogCategory[];
  filteredBreeds: DogBreed[];
  selectedBreedImages: string[];
  activeCategory: string;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchBreeds: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (categoryName: string) => void;
  fetchBreedImages: (breedId: number) => Promise<void>;
}

const API_KEY = process.env.EXPO_PUBLIC_API_KEY?.trim().replace(/;$/, "");
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL?.trim().replace(/;$/, "");

export const useDogStore = create<DogState>((set, get) => ({
  breeds: [],
  filteredBreeds: [],
  categories: [],
  selectedBreedImages: [],
  activeCategory: 'All',
  searchQuery: '',
  loading: false,
  error: null,

  fetchBreeds: async () => {
   
    if (!BASE_URL) {
      console.warn("⚠️ EXPO_PUBLIC_BASE_URL is not defined! Check your .env file setup.");
      set({ error: 'Configuration Error: Missing API Base URL', loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/breeds`, {
        headers: API_KEY ? { 'x-api-key': API_KEY } : {}
      });
      const data: DogBreed[] = await response.json();
      
      const uniqueGroups = Array.from(
        new Set(
          data
            .map((b) => b.breed_group?.trim())
            .filter((group): group is string => !!group && group.length > 0)
        )
      );

      const collectedCats: DogCategory[] = uniqueGroups.map((group, index) => ({
        id: `cat-${index}`,
        name: group,
      }));
      
      set({ 
        breeds: data, 
        filteredBreeds: data, 
        categories: collectedCats,
        loading: false 
      });
    } catch (err) {
      set({ error: 'Failed to load dog breeds', loading: false });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    const { breeds, activeCategory } = get();

    const matches = breeds.filter((dog) => {
      const matchesSearch = dog.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === 'All' || dog.breed_group === activeCategory;
      return matchesSearch && matchesCategory;
    });

    set({ filteredBreeds: matches });
  },

  setActiveCategory: (categoryName: string) => {
    const { breeds, searchQuery } = get();
    set({ activeCategory: categoryName });

    const matches = breeds.filter((dog) => {
      const matchesSearch = dog.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryName === 'All' || dog.breed_group === categoryName;
      return matchesSearch && matchesCategory;
    });

    set({ filteredBreeds: matches });
  },

  fetchBreedImages: async (breedId: number) => {
    if (!BASE_URL) return;

    set({ loading: true, selectedBreedImages: [] });
    try {
      const response = await fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&limit=5`, {
        headers: API_KEY ? { 'x-api-key': API_KEY } : {}
      });
      const data = await response.json();
      const urls = data.map((img: { url: string }) => img.url);
      set({ selectedBreedImages: urls, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch gallery images', loading: false });
    }
  }
}));
