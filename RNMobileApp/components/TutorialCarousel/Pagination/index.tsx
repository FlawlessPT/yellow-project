import {TouchableOpacity, View, StyleSheet} from 'react-native';

interface PaginationProps {
  currentIndex: number;
  totalItems: number;
  goToFunc: (index: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentIndex,
  totalItems,
  goToFunc,
}) => {
  const renderBubbles = () => {
    const bubbles = [];

    for (let i = 0; i < totalItems; i++) {
      bubbles.push(
        <TouchableOpacity key={i} onPress={() => goToFunc(i)}>
          <View
            key={i}
            style={[
              styles.bubble,
              i === currentIndex ? styles.activeBubble : styles.inactiveBubble,
            ]}
          />
        </TouchableOpacity>,
      );
    }
    return bubbles;
  };
  return <View style={styles.bubbleContainer}>{renderBubbles()}</View>;
};

const styles = StyleSheet.create({
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bubble: {
    width: 5,
    height: 5,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'black',
  },
  activeBubble: {
    width: 4,
    height: 8,
    borderRadius: 0,
  },
  inactiveBubble: {
    opacity: 0.5,
  },
});
