import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { UploadIcon } from '@assets';
import { launchImageLibrary } from 'react-native-image-picker';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

import { Photo, PhotoType, StepProps } from '../types';
import LabelButton from '@components/Button/LabelButton';
import Label from '@components/Label';
import Pagination from '@components/Pagination';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const UploadPhotos = ({ onPress }: StepProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [photos, setPhotos] = useState<{ front: string; back: string; side: string }>({
    back: '',
    front: '',
    side: '',
  });

  const screenWidth = Dimensions.get('window').width;
  const ref = React.createRef<ICarouselInstance>();

  const { theme } = useTheme();

  const styles = getStyles(theme, screenWidth - 32);

  useEffect(() => {
    onPress(!!photos);
  }, [onPress, photos]);

  const handlePicker = (photo: PhotoType) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        setPhotos({ ...photos, [photo]: response.assets?.[0].uri ?? '' });
      }
    });
  };

  const removePhoto = (photo: PhotoType) => {
    setPhotos({ ...photos, [photo]: '' });
  };

  const renderItem = ({ item, index }: { item: Photo; index: number }) => {
    return (
      <React.Fragment key={index}>
        {item.image ? (
          <View style={styles.card}>
            <Label text={item.title} type="h5" medium color={theme.colors.neutral300} />
            <Image source={{ uri: item.image }} resizeMode="contain" style={styles.photo} />
            <LabelButton onPress={() => removePhoto(item.title)} text="Remove Photo" color={theme.colors.neutral300} />
          </View>
        ) : (
          <View style={styles.card}>
            <Label text={item.title} type="h3" medium color={theme.colors.neutral300} />
            <TouchableOpacity activeOpacity={1} onPress={() => handlePicker(item.title)} style={styles.uploadButton}>
              <Image source={UploadIcon} />
            </TouchableOpacity>
            <Label text="Upload Photo" color={theme.colors.neutral400} />
          </View>
        )}
      </React.Fragment>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Carousel
          width={screenWidth}
          autoPlay={false}
          loop={false}
          data={[
            { image: photos.front, title: PhotoType.FRONT },
            { image: photos.back, title: PhotoType.BACK },
            { image: photos.side, title: PhotoType.SIDE },
          ]}
          scrollAnimationDuration={100}
          ref={ref}
          onSnapToItem={() => setCurrentIndex(ref.current?.getCurrentIndex() ?? 0)}
          renderItem={renderItem}
        />
      </View>
      <Pagination length={3} currentIndex={currentIndex} />
    </View>
  );
};

export default UploadPhotos;

const getStyles = (theme: Theme, width: number) =>
  StyleSheet.create({
    contentContainer: { flex: 1 },
    container: {
      flex: 1,
    },
    uploadButton: { marginVertical: 12 },
    card: {
      padding: 12,
      flex: 1,
      width,
      backgroundColor: theme.colors.neutral800,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    photo: {
      flex: 1,
      width: '100%',
      marginVertical: 12,
    },
  });
