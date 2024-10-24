
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const TimeRadioBtn = ({ selectedTime, onSelect }) => {
  const options = [
    {  label: '9:00 AM' },
    {  label: '5:00 PM' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Time</Text>
      <View style={styles.optionContainer}>
      {options.map(option => (
        <TouchableOpacity 
          key={option.label} 
          style={styles.optionContainer} 
          onPress={() => onSelect(option.label)} 
        >
          <Icon 
            name={selectedTime === option.label ? 'radio-button-checked' : 'radio-button-unchecked'} 
            size={24} 
            color={selectedTime === option.label ? '#001F3F' : '#888'} 
          />
          <Text style={[styles.optionText, { fontWeight: selectedTime === option.label ? 'bold' : 'normal' }]}>
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

  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default TimeRadioBtn;
