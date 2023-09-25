import React, {useEffect, useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '@utils/supabase';
import {
  CustomPageSlugEnum,
  NoneAuthenticatedStackScreenPropsGeneric,
} from '@types';

/* Idea got here to adjust list items: https://github.com/meliorence/react-native-render-html/issues/592 */
const tagsStyles: any = {
  body: {
    padding: '8px',
  },
  p: {
    margin: '0px',
    padding: '0px',
    lineHeight: '20px',
    fontSize: '14px',
    fontWeight: '400',
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
    display: 'inline-block',
    lineHeight: '20px',
    fontWeight: '400',
    paddingBottom: '0px',
    margin: '0px',
  },
};

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
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <RenderHtml
        contentWidth={width}
        tagsStyles={tagsStyles}
        source={{html: htmlContent}}
      />
    </ScrollView>
  ) : null;
};
