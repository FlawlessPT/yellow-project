// Components
import { ItemType } from '@components/CardItem';

// Assets
import { CarbIcon, FatIcon, PlayIcon, ProteinIcon } from '@assets';

export const workoutItems: ItemType[] = [
  {
    icon: PlayIcon,
    text: 'segunda-feira',
  },
];

export const nutrientsItems: ItemType[] = [
  {
    icon: ProteinIcon,
    text: '23 g',
  },
  {
    icon: FatIcon,
    text: '23 g',
  },
  {
    icon: CarbIcon,
    text: '23 g',
  },
];

export const workouts = [
  {
    image:
      'https://media.istockphoto.com/id/938158500/photo/breakfast-table.jpg?s=612x612&w=0&k=20&c=Y8xB6hfe4dSPNyNrPgzP7slHbKhWdEzG7YTk2WXu4lQ=',
    title: 'Legs',
    items: workoutItems,
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2023/03/Sumac-turkey-stuffed-pittas-73482d5.jpg?quality=90&resize=556,505',
    title: 'Shoulders',
    items: workoutItems,
  },
  {
    image:
      'https://assets.epicurious.com/photos/59a48f237e283157d14a5a6a/16:9/w_2560%2Cc_limit/How-to-Throw-a-Grocery-Store-Dinner-Party-hero-with-hands-15082017.jpg',
    title: 'Back',
    items: workoutItems,
  },
];

export const meals = [
  {
    image:
      'https://media.istockphoto.com/id/938158500/photo/breakfast-table.jpg?s=612x612&w=0&k=20&c=Y8xB6hfe4dSPNyNrPgzP7slHbKhWdEzG7YTk2WXu4lQ=',
    title: 'Breakfast',
    items: nutrientsItems,
  },
  {
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2023/03/Sumac-turkey-stuffed-pittas-73482d5.jpg?quality=90&resize=556,505',
    title: 'Lunch',
    items: nutrientsItems,
  },
  {
    image:
      'https://assets.epicurious.com/photos/59a48f237e283157d14a5a6a/16:9/w_2560%2Cc_limit/How-to-Throw-a-Grocery-Store-Dinner-Party-hero-with-hands-15082017.jpg',
    title: 'Dinner',
    items: nutrientsItems,
  },
];
