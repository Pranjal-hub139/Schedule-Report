import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Yearly = ({ onSelectDate }) => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const currentYear = new Date().getFullYear();
  const firstDateOfYear = new Date(currentYear, 0, 1);
  const lastDateOfYear = new Date(currentYear, 11, 31);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; 
    if (event.type === 'set') {
      setShowCalendar(false);
      setDate(currentDate);
      onSelectDate(currentDate);
    } else {
      setShowCalendar(false); 
    }
  };

  const handleDateSelection = (selectedDate) => {
    setDate(selectedDate);
    onSelectDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => handleDateSelection(firstDateOfYear)}
      >
        <Text style={styles.optionText}>First Date of the Year: {firstDateOfYear.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => handleDateSelection(lastDateOfYear)}
      >
        <Text style={styles.optionText}>Last Date of the Year: {lastDateOfYear.toDateString()}</Text>
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
          minimumDate={firstDateOfYear} // Change this to limit the selection to the year's range
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

export default Yearly;
