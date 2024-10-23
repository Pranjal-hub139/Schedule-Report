import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Yearly = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // To show/hide the calendar for custom date selection

  // Get the first and last date of the current year
  const firstDateOfYear = new Date(new Date().getFullYear(), 0, 1);
  const lastDateOfYear = new Date(new Date().getFullYear(), 11, 31);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(false); // Hide the calendar after selecting a date
    setDate(currentDate); // Set the selected date
  };

  return (
    <View style={styles.container}>
      
      
      {/* TouchableOpacity for the first date of the year */}
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setDate(firstDateOfYear)}
      >
        <Text style={styles.optionText}>First Date of the Year: {firstDateOfYear.toDateString()}</Text>
      </TouchableOpacity>
      
      {/* TouchableOpacity for the last date of the year */}
      <TouchableOpacity 
        style={styles.optionButton}
        onPress={() => setDate(lastDateOfYear)}
      >
        <Text style={styles.optionText}>Last Date of the Year: {lastDateOfYear.toDateString()}</Text>
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
          minimumDate={new Date()} // Disable previous dates (including today if desired)
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
    color:'black',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Text color
  },
});

export default Yearly;
