import React from 'react';
import { CustomPage } from '../CustomPage';
import { CustomPageSlugEnum } from '../../types';

export const TermsAndConditions = function TermsAndConditions() {
  return <CustomPage slug={CustomPageSlugEnum.TermsAndConditions} />;
};
