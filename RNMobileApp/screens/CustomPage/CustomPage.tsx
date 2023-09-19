import React, {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '../../lib/supabase';
import {
  CustomPageSlugEnum,
  NoneAuthenticatedStackScreenPropsGeneric,
} from '../../types';

export const CustomPage = function CustomPage({
  slug,
}: {
  slug: CustomPageSlugEnum;
}) {
  const {width} = useWindowDimensions();
  const [htmlContent, setHtmlContent] = useState('');
  const [title, setTitle] = useState('');

  const navigation =
    useNavigation<NoneAuthenticatedStackScreenPropsGeneric['navigation']>();

  useEffect(() => {
    async function fetchTermsAndConditionsInfo() {
      let {data} = await supabase
        .from('custom_pages')
        .select('title, content')
        .eq('slug', slug)
        .single();

      if (data) {
        setHtmlContent(data.content);
        setTitle(data.title);
      }
    }

    fetchTermsAndConditionsInfo();
  }, [slug]);

  useEffect(() => {
    if (title) {
      navigation.setOptions({title});
    }
  }, [title, navigation]);

  return htmlContent ? (
    <RenderHtml contentWidth={width} source={{html: htmlContent}} />
  ) : null;
};
