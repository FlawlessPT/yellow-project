type ProfileDetails = {
  id: string;
  label: string;
  rightLabel?: string;
  dropdownItems?: string[];
  withDescription?: boolean;
  isDisabled?: boolean;
};

export const profileData: ProfileDetails[] = [
  { id: 'name', label: 'name' },
  { id: 'email', label: 'common.email_label', isDisabled: true },
  { id: 'gender', label: 'gender', dropdownItems: ['man', 'woman', 'others'] },
  { id: 'birthday', label: 'birthday', isDisabled: true },
  { id: 'height', label: 'height', rightLabel: 'cm' },
  { id: 'weight', label: 'weight', rightLabel: 'kg' },
  {
    id: 'dietType',
    label: 'diet_type',
    dropdownItems: ['vegan', 'vegetarian', 'traditional', 'other'],
    withDescription: true,
  },
  {
    id: 'trainingType',
    label: 'training_type',
    dropdownItems: ['Start training', '1/2 times a week', '3/5 times a week', 'More than 5 times a week'],
    withDescription: true,
  },
];
