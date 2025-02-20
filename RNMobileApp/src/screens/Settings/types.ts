export type ProfileDetail = {
  label: string;
  description: { value: number; unit: string };
};

export type ProfileButton = {
  icon: any;
  label: string;
  withToggle?: boolean;
  onPress: () => void;
};
