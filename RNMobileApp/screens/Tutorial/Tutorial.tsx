// React and React Native
import * as React from 'react';
import {useEffect, useState} from 'react';

// Components
import {
  TutorialCarousel,
  TutorialData,
} from '../../components/TutorialCarousel';

// Styles
import {MainContainer} from './styles';

// External Libs
import {useNavigation} from '@react-navigation/native';

// Helpers
import {supabase} from '@utils/supabase';
import {getLocales} from 'react-native-localize';
import {useFeatureFlag} from '@utils/contexts';

export const Tutorial = function Tutorial() {
  const [data, setData] = useState<TutorialData[]>();
  const [loading, setLoading] = useState(true);
  const locales = getLocales() || [];

  const navigation = useNavigation();

  const tutorialFeatureFlag = useFeatureFlag({
    featureFlagKey: 'TUTORIAL',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase
          .from('tutorials')
          .select('configs')
          .eq('lng', locales.length > 0 ? locales[0].languageCode : 'en');

        if (error) {
          console.error(error);
        } else {
          const slidesArray: TutorialData[] = [];

          Object.values(data[0].configs).forEach((slide: any) => {
            const formattedSlide = {
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
    tutorialFeatureFlag.isActive ? fetchData() : navigation.goBack();
  }, []);

  return (
    <MainContainer>
      {!loading && <TutorialCarousel data={data as TutorialData[]} />}
    </MainContainer>
  );
};
