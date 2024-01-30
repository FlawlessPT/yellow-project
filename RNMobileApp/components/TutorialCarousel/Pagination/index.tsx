// React and React Native
import React from 'react';
import {TouchableOpacity} from 'react-native';

// Styles
import {BubbleContainer} from '../styles';

// Assets
import SeenBubble from '@assets/icons/tutorial/seen-bubble.svg';
import UnseenBubble from '@assets/icons/tutorial/unseen-bubble.svg';
import ActiveBubble from '@assets/icons/tutorial/active-bubble.svg';

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
          {i === currentIndex ? (
            <ActiveBubble width={14} height={14} />
          ) : i <= currentIndex ? (
            <SeenBubble width={8} height={8} />
          ) : (
            <UnseenBubble width={8} height={8} />
          )}
        </TouchableOpacity>,
      );
    }
    return bubbles;
  };
  return <BubbleContainer>{renderBubbles()}</BubbleContainer>;
};
