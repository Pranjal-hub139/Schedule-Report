import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Monthly = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false); // Show the date picker when needed

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate); // Update the date state
    }
    setShow(false); // Hide the picker regardless of selection
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
        <Text style={styles.dateButtonText}>
          {`Selected Date: ${date.toDateString()}`}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()} // Disable previous dates but allow the current date
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
  },
  dateButton: {
    backgroundColor: '#cce5ff', // Button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Text color
  },
});

export default Monthly;
