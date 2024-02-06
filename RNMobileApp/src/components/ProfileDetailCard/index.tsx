// React and React Native
import React from 'react';

// Components
import Label from '@components/Label';

// Styles
import { Card, CardTitle } from './styles';

// Hooks
import useTheme from '@hooks/theme/useTheme';

type ProfileDetailCardProps = {
  labelTitle: string;
  value: string;
};

const ProfileDetailCard = ({ labelTitle, value }: ProfileDetailCardProps) => {
  const { theme } = useTheme();

  return (
    <Card>
      <CardTitle
        text={labelTitle}
        type="footnote"
        color={theme.colors.outline}
      />
      <Label text={value} type="h3" medium color={theme.colors.neutral200} />
    </Card>
  );
};

export default ProfileDetailCard;
