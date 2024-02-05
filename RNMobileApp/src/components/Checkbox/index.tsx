// React and React Native
import React from 'react';

// Styles
import { MainContainer, iconStyle } from './styles';

// Assets
// import Selected from '@assets/icons/checkbox/selected.svg';
// import Deselected from '@assets/icons/checkbox/deselected.svg';
// import Error from '@assets/icons/checkbox/error.svg';

export interface CheckboxProps {
  value: boolean;
  error?: string;
  onPress: () => void;
}

export const Checkbox = ({ value, error, onPress }: CheckboxProps) => {
  return (
    <MainContainer onPress={onPress}>
      {/* {error != undefined ? (
        <Error width={iconStyle.width} height={iconStyle.height} />
      ) : value ? (
        <>
          <Selected width={iconStyle.width} height={iconStyle.height} />
        </>
      ) : (
        <>
          <Deselected width={iconStyle.width} height={iconStyle.height} />
        </>
      )} */}
    </MainContainer>
  );
};

export default Checkbox;
