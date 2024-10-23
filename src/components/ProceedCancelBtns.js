// ModalButtons.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProceedCancelBtns = ({ onProceed, onCancel, isProceedEnabled }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !isProceedEnabled && styles.disabledButton]} // Apply disabled style if not enabled
        onPress={onProceed}
        disabled={!isProceedEnabled} // Disable if not enabled
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
    width: '100%', // Adjust width as needed
  },
  button: {
    flex: 1,
    marginHorizontal: 9, // Add margin between buttons
    backgroundColor: '#001F3F', // Navy blue color
    borderRadius: 5,
    padding: 10,
    alignItems: 'center', // Center the text in the button
    
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Gray color for disabled button
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
  },
});

export default ProceedCancelBtns;
