import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const EmailInModal = ({ emails, onAddEmail, onRemoveEmail }) => {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddEmail = () => {
    if (emails.length >= 5) {
      setError('You can only add up to 5 emails.');
      return;
    }
    
    if (!validateEmail(emailInput)) {
      setError('Please enter a valid email.');
      return;
    }

    onAddEmail(emailInput); 
    setEmailInput(''); 
    setError(''); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new email"
          placeholderTextColor='grey'
          value={emailInput}
          onChangeText={setEmailInput}
        />
        <TouchableOpacity onPress={handleAddEmail} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emailList}>
        {emails.map((email, index) => (
          <View key={index} style={styles.emailTag}>
            <Text style={styles.emailText}>{email}</Text>
            <TouchableOpacity onPress={() => onRemoveEmail(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: 'black',
  },
  addButton: {
    backgroundColor: '#001F3F', 
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff', 
    fontSize: 14, 
  },
  emailList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  emailTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cce5ff',
    borderRadius: 15,
    padding: 5,
    margin: 5,
  },
  emailText: {
    marginHorizontal: 5,
    color: 'black',
    
  },
  removeButton: {
    marginLeft: 5,
    padding: 6,
  },
  removeButtonText: {
    fontWeight: 'bold',
    color: '#d32f2f', 
    fontSize: 23,
  },
  error: {
    color: 'red',
    marginVertical: 5,
  },
});

export default EmailInModal;
