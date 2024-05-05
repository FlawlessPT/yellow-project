// React Native
import { ImageSourcePropType } from 'react-native';

// Assets
import { ManIcon, OtherIcon, WomanIcon } from '@assets';

export type StepProps = {
  onPress: (isSelected: boolean) => void;
};

export type GenderCard = {
  icon: ImageSourcePropType;
  label: string;
};

export const genderCards: GenderCard[] = [
  {
    icon: WomanIcon,
    label: 'woman',
  },
  {
    icon: ManIcon,
    label: 'man',
  },
  {
    icon: OtherIcon,
    label: 'others',
  },
];

export enum DietType {
  VEGAN = 'vegan',
  VEGETARIAN = 'vegetarian',
  TRADITIONAL = 'traditional',
  OTHER = 'other',
}

export enum WorkoutType {
  BEGINNER = 'beginner',
  IRREGULAR = 'irregular',
  MEDIUM = 'medium',
  ADVANCED = 'advanced',
}

export type HandleSetTypeResult = { isSelected: boolean; onPress: () => void };
