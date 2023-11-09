import * as React from 'react';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {Pagination} from './Pagination';

export interface TutorialData {
  title: string;
  subtitle: string;
  source: string;
}

interface TutorialCarouselProps {
  autoPlay?: boolean;
  loop?: boolean;
  data: TutorialData[];
  getStartedButtonAction: () => void;
}

export const TutorialCarousel: React.FC<TutorialCarouselProps> = ({
  autoPlay = false,
  loop = false,
  data,
  getStartedButtonAction,
}) => {
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const screenWidth = Dimensions.get('window').width;
  const {t} = useTranslation();

  let ref = React.useRef<ICarouselInstance>(null);
  ref = React.createRef();

  const goBack = () => {
    if (ref.current?.getCurrentIndex() != 0) {
      ref.current?.prev();
    }
    setIsLast(false);
  };

  const goForward = () => {
    if (ref.current?.getCurrentIndex() != data.length) {
      ref.current?.next();
    }
    setIsFirst(false);
  };

  const goToLast = () => {
    ref.current?.scrollTo({index: data.length - 1});
    setIsLast(true);
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    ref.current?.scrollTo({index: index});
  };

  useEffect(() => {
    if (ref.current?.getCurrentIndex() == 0) {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }

    if (ref.current?.getCurrentIndex() == data.length - 1) {
      setIsLast(true);
    } else {
      setIsLast(false);
    }
    setCurrentIndex(ref.current?.getCurrentIndex() || 0);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.carousel}>
        <Carousel
          key={data.length}
          width={screenWidth - 48}
          autoPlay={autoPlay}
          loop={loop}
          data={data}
          scrollAnimationDuration={300}
          ref={ref}
          onSnapToItem={() => setCurrentIndex(ref.current?.getCurrentIndex())}
          renderItem={({item, index}) => (
            <View style={styles.carousel}>
              <Image
                style={{width: screenWidth - 48, height: screenWidth / 2}}
                resizeMode="contain"
                source={
                  typeof item.source === 'string'
                    ? {uri: item.source}
                    : item.source
                }
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          )}
        />
      </View>
      {!isLast && (
        <>
          <Pagination
            currentIndex={currentIndex}
            totalItems={data.length}
            goToFunc={index => goTo(index)}
          />
        </>
      )}
      {isLast ? (
        <>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => getStartedButtonAction()}>
            <Text style={styles.getStartedButtonTitle}>
              {t('tutorial.getStartedButton')}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => (isFirst ? goToLast() : goBack())}>
            {!isFirst && (
              <Image
                style={styles.arrowIcon}
                source={require('../../assets/icons/arrow/ic-arrow.png')}
              />
            )}
            <Text style={[styles.buttonTitle, isFirst && {opacity: 0.5}]}>
              {isFirst ? t('tutorial.skip') : t('tutorial.previous')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonRight]}
            onPress={() => goForward()}>
            <Text style={styles.buttonTitle}>{t('tutorial.next')}</Text>
            <Image
              style={[styles.arrowIcon, styles.arrowIconRight]}
              source={require('../../assets/icons/arrow/ic-arrow.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 24,
  },
  carousel: {
    flexDirection: 'column',
    gap: 20,
    width: '100%',
    height: '90%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: 'black',
    fontFamily: 'regular',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: 'black',
    fontFamily: 'regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 20,
    bottom: 0,
  },
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 5,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  buttonRight: {
    justifyContent: 'flex-end',
  },
  buttonTitle: {
    fontFamily: 'regular',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  arrowIcon: {
    height: 12,
    width: 12,
  },
  arrowIconRight: {
    transform: [{rotateY: '180deg'}],
  },
  getStartedButton: {
    backgroundColor: 'black',
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedButtonTitle: {
    textAlign: 'center',
    fontFamily: 'regular',
    fontSize: 16,
    fontStyle: 'normal',
    color: 'white',
  },
});
