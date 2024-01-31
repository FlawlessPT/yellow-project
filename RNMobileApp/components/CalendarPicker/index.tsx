// React and React Native
import React, { useState } from 'react';

// Components
import Label from '@components/Label';

// Styles
import {
  ContentContainer,
  InnerContainer,
  MainContainer,
  ErrorContainer,
  errorLabelStyle,
} from './styles';

// External Libs
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { HelperText } from 'react-native-paper';

// Assets
import CalendarIcon from '@assets/icons/calendar.svg';
import Alert from '@assets/icons/alert-circle.svg';

// Theme
import theme from '../../theme';

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
            color={theme.colors.neutral.n400}
            size={16}
          />
          <CalendarIcon width={20} height={20} />
        </InnerContainer>
      </ContentContainer>
      {error != undefined && (
        <ErrorContainer>
          <Alert width={16} height={16} />
          <HelperText type="error" style={errorLabelStyle}>
            {error}
          </HelperText>
        </ErrorContainer>
      )}
    </MainContainer>
  );
};

export default CalendarPicker;
