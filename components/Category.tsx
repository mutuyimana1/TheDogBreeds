import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { COLORS } from '../constants/theme';

interface Props {
  label: string;
  imageUri?: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
}

export default function Category({ label, isActive, onPress }: Props) {
  return (
    <TouchableOpacity 
      style={[styles.pill, isActive ? styles.activePill : styles.inactivePill]} 
      onPress={onPress}
    >
      <CustomText variant="caption" color={isActive ? '#FFF' : COLORS.textMuted} style={styles.labelText}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 24, 
    marginRight: 4 
  },
  activePill: { backgroundColor: COLORS.primary },
  inactivePill: { backgroundColor: COLORS.primaryLight },
  labelText: { 
    fontWeight: '600', 
    textAlign: 'center', 
    marginTop: 0 
  },
});
