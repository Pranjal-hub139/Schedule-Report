import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProceedCancelBtns = ({ onProceed, onCancel, isProceedEnabled }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={[styles.button, !isProceedEnabled && styles.disabledButton]} 
        disabled={!isProceedEnabled} 
        onPress={onProceed} 
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 9, 
    backgroundColor: '#001F3F',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
});

export default ProceedCancelBtns;
