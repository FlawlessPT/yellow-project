// React and React Native
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View, Image} from 'react-native';

// Components
import Button from '@components/Button';
import Label from '@components/Label';
import {Pagination} from './Pagination';

// Styles
import {
  CarrouselContainer,
  ContentContainer,
  ImageContainer,
  MainContainer,
  PaginationContainer,
  TopBar,
} from './styles';

// External Libs
import {useTranslation} from 'react-i18next';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {useNavigation} from '@react-navigation/native';

// Assets
import Chevron from '@assets/icons/chevron-left.svg';

// Theme
import theme from '@theme';

export interface TutorialData {
  url: string;
}

interface TutorialCarouselProps {
  autoPlay?: boolean;
  loop?: boolean;
  data: TutorialData[];
}

export const TutorialCarousel: React.FC<TutorialCarouselProps> = ({
  autoPlay = false,
  loop = false,
  data,
}) => {
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(0);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const navigation = useNavigation();

  const {t} = useTranslation();

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
    ref.current?.scrollTo({index: index});
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
            {!isFirst && <Chevron width={24} height={24} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Label
              text="common.skip"
              size={16}
              color={theme.colors.neutral.n400}
            />
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
            renderItem={({item, index}) => (
              <ImageContainer>
                <Image
                  style={{width: screenWidth - 48, height: screenHeight}}
                  resizeMode="center"
                  source={
                    typeof item.url === 'string' ? {uri: item.url} : item.url
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
