// React and React Native
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Hooks
import useTheme from '@hooks/theme/useTheme';

type PaginationProps = {
  length: number;
  currentIndex: number;
};

const Pagination = ({ length, currentIndex }: PaginationProps) => {
  const { theme } = useTheme();
  return (
    <View style={styles.paginationContainer}>
      {Array(length)
        .fill(0)
        .map((_, i) => (
          <View
            key={i}
            style={[
              styles.pagination,
              { backgroundColor: currentIndex === i ? theme.colors.primary : theme.colors.neutral700 },
            ]}
          />
        ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 32,
    paddingTop: 46,
  },
  pagination: {
    height: 6,
    width: 32,
    borderRadius: 6,
  },
});
