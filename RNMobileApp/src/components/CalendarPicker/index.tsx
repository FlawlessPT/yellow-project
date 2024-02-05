// React and React Native
import React, { useState } from 'react';

// Styles
import {
  ContentContainer,
  InnerContainer,
  MainContainer,
  ErrorContainer,
  errorLabelStyle,
} from './styles';

// Components
import { Label } from '@components';

// Theme
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { format } from 'date-fns';
import { HelperText } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

// Assets
// import Alert from '@assets/icons/alert-circle.svg';
// import CalendarIcon from '@assets/icons/calendar.svg';

export interface CalendarPickerProps {
  date?: Date;
  placeholderText?: string;
  maximumDate?: Date;
  onChangeDate: (date: Date) => void;
  error?: string;
}

export const CalendarPicker = ({
  date = new Date(),
  placeholderText,
  maximumDate = new Date(),
  onChangeDate,
  error,
}: CalendarPickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const { theme } = useTheme();

  return (
    <MainContainer>
      <ContentContainer onPress={() => setIsModalOpen(true)} error={error}>
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
                ? format(selectedDate, 'dd/MM/yyyy')
                : placeholderText
                ? placeholderText
                : ''
            }
            color={theme.colors.disabled}
          />
          {/* <CalendarIcon width={20} height={20} /> */}
        </InnerContainer>
      </ContentContainer>
      {error != undefined && (
        <ErrorContainer>
          {/* <Alert width={16} height={16} /> */}
          <HelperText type="error" style={errorLabelStyle}>
            {error}
          </HelperText>
        </ErrorContainer>
      )}
    </MainContainer>
  );
};

export default CalendarPicker;
