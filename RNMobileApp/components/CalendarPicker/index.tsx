// React and React Native
import React, {useState} from 'react';

// Components
import Label from '@components/Label';

// Styles
import {InnerContainer, MainContainer} from './styles';

// External Libs
import {format} from 'date-fns';
import DatePicker from 'react-native-date-picker';

// Assets
import CalendarIcon from '@assets/icons/calendar.svg';

// Theme
import theme from '../../theme';

export interface CalendarPickerProps {
  date?: Date;
  placeholderText?: string;
  maximumDate?: Date;
  onChangeDate: any;
}

export const CalendarPicker = ({
  date = new Date(),
  placeholderText,
  maximumDate = new Date(),
  onChangeDate,
}: CalendarPickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <MainContainer onPress={() => setIsModalOpen(true)}>
      <DatePicker
        modal
        open={isModalOpen}
        date={date}
        mode="date"
        maximumDate={maximumDate}
        onConfirm={date => {
          onChangeDate(date);
          setSelectedDate(date);
          setIsModalOpen(false);
          date = date;
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
      <InnerContainer>
        <Label
          text={
            selectedDate !== undefined
              ? format(selectedDate, 'yyyy/MM/dd')
              : placeholderText
          }
          color={theme.colors.neutral.n400}
          size={16}
        />
        <CalendarIcon width={20} height={20} />
      </InnerContainer>
    </MainContainer>
  );
};

export default CalendarPicker;
