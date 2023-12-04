import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  TutorialCarousel,
  TutorialData,
} from '../../components/TutorialCarousel';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '@utils/supabase';
import {getLocales} from 'react-native-localize';
import {useEffect, useState} from 'react';

export const Tutorial = function Tutorial() {
  const [data, setData] = useState<TutorialData[]>();
  const [loading, setLoading] = useState(true);
  const locales = getLocales() || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase
          .from('tutorials')
          .select('configs')
          .eq('lng', locales.length > 0 ? locales[0].languageCode : 'en');

        if (error) {
          console.error(error);
          navigation.goBack();
        } else {
          const slidesArray: TutorialData[] = [];

          Object.values(data[0].configs).forEach((slide: any) => {
            const formattedSlide = {
              title: slide.title,
              subtitle: slide.subtitle,
              url: slide.url,
            } as TutorialData;

            slidesArray.push(formattedSlide);
          });

          setData(slidesArray);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigation.goBack();
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {!loading && (
        <TutorialCarousel
          data={data as TutorialData[]}
          getStartedButtonAction={navigation.goBack}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
