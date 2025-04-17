import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { UploadIcon } from '@assets';
import { FieldValues, useForm } from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';

import { FormInput, Label } from '@components';
import { PhotoType } from '@components/PersonalizationSteps/types';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const MilestoneUpdate = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const { control, handleSubmit, trigger, setValue, watch } = useForm<FieldValues>({
    mode: 'onChange',
  });

  const [photos, setPhotos] = useState<{ front: string; back: string; side: string }>({
    back: '',
    front: '',
    side: '',
  });

  const removePhoto = (photo: PhotoType) => {
    setPhotos({ ...photos, [photo]: '' });
  };

  const handlePicker = (photo: PhotoType) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        setPhotos({ ...photos, [photo]: response.assets?.[0].uri ?? '' });
      }
    });
  };

  const renderUploadPhoto = (photo: PhotoType) => (
    <View style={styles.cardContainer}>
      <Label text={photo} type="footnote" bold color={theme.colors.neutral300} textAlign="center" />
      <View style={styles.card}>
        <TouchableOpacity activeOpacity={1} onPress={() => handlePicker(photo)} style={styles.uploadButton}>
          <Image source={UploadIcon} />
        </TouchableOpacity>
        <Label text="Upload Photo" color={theme.colors.neutral400} />
      </View>
    </View>
  );

  const renderPhoto = (photo: PhotoType) => (
    <View style={styles.cardContainer}>
      <Label text={photo} type="footnote" bold color={theme.colors.neutral300} textAlign="center" />
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://marketplace.canva.com/EAFhiTDWcOg/1/0/900w/canva-imagem-de-fundo-de-tela-para-celular-borboleta-degrad%C3%AA-azul-e-verde-_37ytwE_kmo.jpg',
          }}
          resizeMode="contain"
          style={styles.photo}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FormInput
        control={control}
        controllerName="weight"
        label="Weight"
        placeholder="Write the amount"
        right={<Label text="kg" color={theme.colors.passwordIcon} />}
      />
      <View style={styles.photoContainer}>
        {!photos.front ? renderPhoto(PhotoType.FRONT) : renderUploadPhoto(PhotoType.FRONT)}
        {renderUploadPhoto(PhotoType.SIDE)}
        {renderUploadPhoto(PhotoType.BACK)}
      </View>
      <FormInput
        control={control}
        controllerName="observations"
        label="Observations"
        placeholder="Write something"
        multiline
      />
    </View>
  );
};

export default MilestoneUpdate;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 24,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    photoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardContainer: {
      gap: 12,
    },
    card: {
      padding: 12,
      flex: 1,
      backgroundColor: theme.colors.neutral800,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderStyle: 'dashed',
      height: 198,
    },
    photo: {
      flex: 1,
      width: '100%',
      marginVertical: 12,
    },
    uploadButton: { marginVertical: 12 },
  });
