// TimeRadioButton.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing Material Icons

const TimeRadioBtn = ({ selectedTime, onSelect }) => {
  const options = [
    { id: '1', label: '9:00 AM' },
    { id: '2', label: '5:00 PM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Time</Text>
      <View style={styles.optionContainer}>
      {options.map(option => (
        <TouchableOpacity 
          key={option.id} 
          style={styles.optionContainer} 
          onPress={() => onSelect(option.id)} // Pass the ID when selected
        >
          <Icon 
            name={selectedTime === option.id ? 'radio-button-checked' : 'radio-button-unchecked'} // Use checked and unchecked icons
            size={24} 
            color={selectedTime === option.id ? '#001F3F' : '#888'} // Change color based on selection
          />
          <Text style={[styles.optionText, { fontWeight: selectedTime === option.id ? 'bold' : 'normal' }]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    //flexDirection:'row'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F3F',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginEnd:20
  },
//   optionsContainer: {
//     flexDirection: 'row', // Align options side by side
//     justifyContent: 'space-between', // Space them evenly
//   },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default TimeRadioBtn;
