import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Weekly from './Weekly'; // Import the Weekly component
import EveryTwoWeeks from './EveryTwoWeeks';
import Monthly from './Monthly';
import Yearly from './Yearly';
import Quarterly from './Quarterly';


const AllCalenderRadioBtns = ({ selectedFrequency, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(selectedFrequency);

  const options = [
    { id: '1', label: 'Weekly' },
    { id: '2', label: 'Every 2 Weeks' },
    { id: '3', label: 'Monthly' },
    { id: '4', label: 'Quarterly' },
    {id: '5',label:'Yearly'}
  ];

  const handlePress = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.radioGroup}>
        {options.map((option) => (
          <View key={option.id}>
            <TouchableOpacity
              style={styles.radioButtonContainer}
              onPress={() => handlePress(option.label)}
            >
              <Icon
                name={selectedOption === option.label ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color={selectedOption === option.label ? '#001F3F' : '#888'}
              />
              <Text style={styles.label}>{option.label}</Text>
            </TouchableOpacity>

            {/* Render Weekly.js below the Weekly option when it is selected */}
            {selectedOption === 'Weekly' && option.label === 'Weekly' && (
              <Weekly selectedDay={null} onSelectDay={(day) => console.log(day)} />
            )}
             {selectedOption === 'Every 2 Weeks' && option.label === 'Every 2 Weeks' && (
              <EveryTwoWeeks selectedDay={null} onSelectDay={(day) => console.log(day)} />
            )}
              {selectedOption === 'Monthly' && option.label === 'Monthly' && (
              <Monthly />

               )}

                {selectedOption === 'Quarterly' && option.label === 'Quarterly'&&(
                <Quarterly/>
               )}
            
            {selectedOption=='Yearly' && option.label === 'Yearly' && (
              <Yearly/>
            )}

          </View>
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
    fontSize: 16,
    fontWeight: '600',
    color: '#001F3F',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'column',
  
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 15,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

export default AllCalenderRadioBtns;
