
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const MultiSelect = ({ options, selectedOptions, onSelectionChange }) => {
  

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      onSelectionChange(selectedOptions.filter((item) => item !== option));
    } else {
      onSelectionChange([...selectedOptions, option]);
    }
  };

  return (
    <View style={styles.container}>
     
      {options.map((option) => (
        <View key={option} style={styles.checkboxContainer}>
          <CheckBox
            value={selectedOptions.includes(option)}
            onValueChange={() => handleCheckboxChange(option)}
            tintColors={{ true: '#001F3F', false: 'black' }}
          />
          <Text style={styles.optionText}>{option}</Text>
        </View>
      ))}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    color: 'grey',
  },
});

export default MultiSelect;
