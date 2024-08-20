export type ProfileDetail = {
  label: string;
  value: string;
};

export type ProfileButton = {
  icon: any;
  label: string;
  withToggle?: boolean;
  onPress: () => void;
};
