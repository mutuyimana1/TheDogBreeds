import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface Props {
  children: React.ReactNode;
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'bold';
  color?: string;
  style?: TextStyle;
}

export default function CustomText({ children, variant = 'body', color, style }: Props) {
  return (
    <Text style={[styles.text, styles[variant], color ? { color } : null, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: { color: COLORS.textDark },
  title: { fontSize: 26, fontWeight: 'bold', lineHeight: 32 },
  subtitle: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 14, color: COLORS.textMuted },
  caption: { fontSize: 12, color: COLORS.textMuted },
  bold: { fontSize: 14, fontWeight: 'bold' },
});
