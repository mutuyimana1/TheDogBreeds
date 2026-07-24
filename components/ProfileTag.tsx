import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { COLORS } from '../constants/theme';

interface Props {
  label: string;
  value: string;
}

export default function ProfileTag({ label, value }: Props) {
  return (
    <View style={styles.container}>
      <CustomText variant="caption" color={COLORS.textMuted}>{label}</CustomText>
      <CustomText variant="bold" style={styles.valueText}>{value}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8F0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 80,
    flex: 1,
    marginHorizontal: 4,
  },
  valueText: { marginTop: 4, fontSize: 14, color: COLORS.textDark },
});
