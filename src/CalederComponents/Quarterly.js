import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Quarterly = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // To show/hide the calendar for custom date selection

  // Get the first and last date of the current quarter
  const getQuarterDates = () => {
    const month = new Date().getMonth();
    const quarter = Math.floor(month / 3);
    
    const firstMonthOfQuarter = quarter * 3;
    const firstDateOfQuarter = new Date(new Date().getFullYear(), firstMonthOfQuarter, 1);
    const lastDateOfQuarter = new Date(new Date().getFullYear(), firstMonthOfQuarter + 3, 0); // Last day of the quarter

    return { firstDateOfQuarter, lastDateOfQuarter };
  };

  const { firstDateOfQuarter, lastDateOfQuarter } = getQuarterDates();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(false); // Hide the calendar after selecting a date
    setDate(currentDate); // Set the selected date
  };

  return (
    <View style={styles.container}>
      {/* TouchableOpacity for the first date of the quarter */}
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setDate(firstDateOfQuarter)}
      >
        <Text style={styles.optionText}>First Date of the Quarter: {firstDateOfQuarter.toDateString()}</Text>
      </TouchableOpacity>
      
      {/* TouchableOpacity for the last date of the quarter */}
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setDate(lastDateOfQuarter)}
      >
        <Text style={styles.optionText}>Last Date of the Quarter: {lastDateOfQuarter.toDateString()}</Text>
      </TouchableOpacity>

      {/* TouchableOpacity for custom date selection */}
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setShowCalendar(true)}
      >
        <Text style={styles.optionText}>Custom Date</Text>
        <Text style={styles.dateText}>  {`Selected Date: ${date.toDateString()}`}</Text>
      </TouchableOpacity>

      {/* Show the calendar for custom date selection, with previous dates disabled */}
      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date(0)} // Allow selection from today onwards
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001F3F',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#cce5ff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '6',
    color: 'black', // Text color
  },
});

export default Quarterly;
