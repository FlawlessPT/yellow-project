import React, { useEffect, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import RenderHtml, { MixedStyleRecord } from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@utils/supabase';
import {
  CustomPageSlugEnum,
  NoneAuthenticatedStackScreenPropsGeneric,
} from '../../types';

/* Idea got here to adjust list items: https://github.com/meliorence/react-native-render-html/issues/592 */
const tagsStyles: MixedStyleRecord = {
  body: {
    padding: 8,
  },
  p: {
    margin: 0,
    padding: 0,
    lineHeight: 20,
    fontSize: '14px',
  },
  ul: {
    marginTop: '0px',
    marginBottom: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
  li: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 20,
    paddingBottom: '0px',
    margin: 0,
  },
};

export const CustomPage = function CustomPage({
  slug,
}: {
  slug: CustomPageSlugEnum;
}) {
  const { width } = useWindowDimensions();
  const [htmlContent, setHtmlContent] = useState('');
  const [title, setTitle] = useState('');

  const navigation =
    useNavigation<NoneAuthenticatedStackScreenPropsGeneric['navigation']>();

  useEffect(() => {
    async function fetchTermsAndConditionsInfo() {
      const { data } = await supabase
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
      navigation.setOptions({ title });
    }
  }, [title, navigation]);

  return htmlContent ? (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <RenderHtml
        contentWidth={width}
        tagsStyles={tagsStyles}
        source={{ html: htmlContent }}
      />
    </ScrollView>
  ) : null;
};
