import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { COLORS } from '../constants/theme';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
}

export default function SearchBar({ value, onChangeText, onFilterPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Search size={20} color={COLORS.textMuted} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search by name..."
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
        <SlidersHorizontal size={20} color={COLORS.textDark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 16 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.inputBg, paddingHorizontal: 16, height: 50, borderRadius: 25, borderWidth: 1, borderColor: COLORS.border },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15 },
  filterBtn: { width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.cardBg },
});
