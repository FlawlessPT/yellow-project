// React and React Native
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View, Image } from 'react-native';

// Styles
import {
  CarrouselContainer,
  ContentContainer,
  ImageContainer,
  MainContainer,
  PaginationContainer,
  TopBar,
} from './styles';

// Components
import { Pagination } from './Pagination';
import { Button, Label } from '@components';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Assets
// import Chevron from '@assets/icons/chevron-left.svg';

// External Libs
import { useNavigation } from '@react-navigation/native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

export type TutorialData = {
  url: string;
};

type TutorialCarouselProps = {
  autoPlay?: boolean;
  loop?: boolean;
  data: TutorialData[];
};

export const TutorialCarousel: React.FC<TutorialCarouselProps> = ({
  autoPlay = false,
  loop = false,
  data,
}) => {
  const { theme } = useTheme();

  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(0);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  let ref = React.useRef<ICarouselInstance>(null);
  ref = React.createRef();

  const goBack = () => {
    if (ref.current?.getCurrentIndex() !== 0) {
      ref.current?.prev();
    }
    setIsLast(false);
  };

  const goForward = () => {
    if (ref.current?.getCurrentIndex() !== data.length) {
      ref.current?.next();
    }
    setIsFirst(false);
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    ref.current?.scrollTo({ index: index });
  };

  useEffect(() => {
    if (ref.current?.getCurrentIndex() === 0) {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }

    if (ref.current?.getCurrentIndex() === data.length - 1) {
      setIsLast(true);
    } else {
      setIsLast(false);
    }
    setCurrentIndex(ref.current?.getCurrentIndex() || 0);
  }, [currentIndex]);

  return (
    <MainContainer>
      <ContentContainer>
        <TopBar>
          <TouchableOpacity onPress={goBack}>
            {/* {!isFirst && <Chevron width={24} height={24} />} */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Label text="common.skip" type="h5" color={theme.colors.disabled} />
          </TouchableOpacity>
        </TopBar>
        <CarrouselContainer>
          <Carousel
            key={data.length}
            width={screenWidth}
            autoPlay={autoPlay}
            loop={loop}
            data={data}
            scrollAnimationDuration={300}
            ref={ref}
            onSnapToItem={() => setCurrentIndex(ref.current?.getCurrentIndex())}
            renderItem={({ item, index }) => (
              <ImageContainer>
                <Image
                  style={{ width: screenWidth - 48, height: screenHeight }}
                  resizeMode="center"
                  source={
                    typeof item.url === 'string' ? { uri: item.url } : item.url
                  }
                />
              </ImageContainer>
            )}
          />
        </CarrouselContainer>
        <PaginationContainer>
          <Pagination
            currentIndex={currentIndex as number}
            totalItems={data.length}
            goToFunc={index => goTo(index)}
          />
          {/* To do: change this to the correct button. */}
          <Button text={' > '} onPressButton={goForward} />
        </PaginationContainer>
      </ContentContainer>
    </MainContainer>
  );
};
