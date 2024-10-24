
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Weekly from '../CalederComponents/Weekly';

const SkipWeekendsToggle = ({ isEnabled, toggleSkipWeekends }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Skip Weekends</Text>
      <TouchableOpacity style={styles.toggle} onPress={toggleSkipWeekends}>
        <Icon 
          name={isEnabled ? 'toggle-on' : 'toggle-off'} 
          size={45} 
          color={isEnabled ? '#001F3F' : '#888'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
   

  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  toggle: {
    padding: 10,
  },
});

export default SkipWeekendsToggle;
