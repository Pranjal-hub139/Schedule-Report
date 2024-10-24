import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { View, Button, TouchableOpacity, StyleSheet,Text } from 'react-native';
import CustomModal from '../components/CustomModal';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={styles.modalButton} 

        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.modalButtonText}>Scheduler</Text>
      </TouchableOpacity>

     
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)} />

     
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0',
  },
  modalButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
