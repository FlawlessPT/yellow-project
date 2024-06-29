import React from 'react';

import { OnBoarding1, OnBoarding2, OnBoarding3 } from '@assets';

import { TutorialCarousel } from '@components/TutorialCarousel';

const Tutorial = () => {
  return (
    <TutorialCarousel
      data={[
        { image: OnBoarding1, title: 'onboarding.title1', subtitle: 'onboarding.subtitle1' },
        { image: OnBoarding2, title: 'onboarding.title2', subtitle: 'onboarding.subtitle2' },
        { image: OnBoarding3, title: 'onboarding.title3' },
      ]}
    />
  );
};

export default Tutorial;
