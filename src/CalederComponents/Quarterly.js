import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Quarterly = ({ onSelectDate }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const getQuarterDates = () => {
    const month = new Date().getMonth();
    const quarter = Math.floor(month / 4);
    
    const firstMonthOfQuarter = quarter * 4;
    const firstDateOfQuarter = new Date(new Date().getFullYear(), firstMonthOfQuarter, 1);
    const lastDateOfQuarter = new Date(new Date().getFullYear(), firstMonthOfQuarter + 4, 0);

    return { firstDateOfQuarter, lastDateOfQuarter };
  };

  const { firstDateOfQuarter, lastDateOfQuarter } = getQuarterDates();

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onSelectDate(selectedDate);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(false);
    handleDateChange(currentDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => handleDateChange(firstDateOfQuarter)}
      >
        <Text style={styles.optionText}>First Date of the Quarter: {firstDateOfQuarter.toDateString()}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => handleDateChange(lastDateOfQuarter)}
      >
        <Text style={styles.optionText}>Last Date of the Quarter: {lastDateOfQuarter.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setShowCalendar(true)}
      >
        <Text style={styles.optionText}>Custom Date</Text>
        <Text style={styles.dateText}>Selected Date: {date.toDateString()}</Text>
      </TouchableOpacity>

      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
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
    fontWeight: 'bold',
    color: 'black', 
  },
});

export default Quarterly;