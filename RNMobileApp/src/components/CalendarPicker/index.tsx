import React, { useState } from 'react';

import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { HelperText } from 'react-native-paper';

import { Label } from '@components/Label';

import { ContentContainer, InnerContainer, MainContainer, ErrorContainer, errorLabelStyle } from './styles';
import useTheme from '@hooks/theme/useTheme';

// import Alert from '@assets/icons/alert-circle.svg';
// import CalendarIcon from '@assets/icons/calendar.svg';

export type CalendarPickerProps = {
  date?: Date;
  placeholderText?: string;
  maximumDate?: Date;
  onChangeDate: (date: Date) => void;
  error?: string;
};

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
          onConfirm={(newDate) => {
            onChangeDate(newDate);
            setSelectedDate(newDate);
            setIsModalOpen(false);
            date = newDate;
          }}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        />
        <InnerContainer>
          <Label
            text={
              selectedDate !== undefined ? format(selectedDate, 'dd/MM/yyyy') : placeholderText ? placeholderText : ''
            }
            color={theme.colors.disabled}
          />
          {/* <CalendarIcon width={20} height={20} /> */}
        </InnerContainer>
      </ContentContainer>
      {error !== undefined && (
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
