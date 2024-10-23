import React from 'react';
import { View, Button, StyleSheet ,TouchableOpacity,Text} from 'react-native';

const CancelDoneBtns = ({ onCancel, onDone }) => {
  return (
    <View style={styles.buttonContainer}>
       <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
     
     
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 9, // Add margin between buttons
    backgroundColor: '#001F3F', // Navy blue color
    borderRadius: 5,
    padding: 10,
    alignItems: 'center', // Center the text in the button
    
  },

  buttonText: {
    color: '#FFFFFF', // White text color
    fontWeight: 'bold',
  },
});

export default CancelDoneBtns;
