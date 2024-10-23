// MultiSelectorCheckbox.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import VehicleSelection from './VehicleSelection'; // Adjust the path if necessary

const MultiSelect = ({ options, selectedOptions, onSelectionChange }) => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [vinSearch, setVinSearch] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      onSelectionChange(selectedOptions.filter((item) => item !== option));
    } else {
      onSelectionChange([...selectedOptions, option]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Multi-select checkboxes for options */}
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

      {/* Show Vehicle Selection if "Vehicle Wise Report" is selected */}
      {/* {selectedOptions.includes('Vehicle Wise Report') && (
        <VehicleSelection
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          vinSearch={vinSearch}
          setVinSearch={setVinSearch}
          selectedVehicles={selectedVehicles}
          setSelectedVehicles={setSelectedVehicles}
        />
      )} */}


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
