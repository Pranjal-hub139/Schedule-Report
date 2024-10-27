import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ScheduleReportTitle from './ScheduleReportTitle';

export default function OkayModal({ visible, onClose }) {
  const [modalData, setModalData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchModalData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('modalData');
        if (storedData !== null) {
          setModalData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error retrieving modal data:', error);
      }
    };

    if (visible) {
      fetchModalData();
    }
  }, [visible]);

  const formatDate = (date) => {
    if (!date) return 'Not selected';
    const dateObj = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  };

  const renderScheduleDetails = () => {
    if (!modalData) return '';

    switch (modalData.selectedFrequency) {
      case 'Weekly':
        return `Every ${modalData.selectedDay} at ${modalData.selectedTime}`;
      case 'Every 2 Weeks':
        return `Every other ${modalData.selectedDay} at ${modalData.selectedTime}`;
      case 'Monthly':
        const date = new Date(modalData.selectedDate);
        return `On the ${date.getDate()}${getOrdinalSuffix(date.getDate())} of ${date.toLocaleString('default', { month: 'long' })} at ${modalData.selectedTime}`;
      default:
        return `on ${formatDate(modalData.selectedDate)}, at ${modalData.selectedTime}`;
    }
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  if (!modalData) {
    return null;
  }

  const handleClose = () => {
    onClose();
    navigation.navigate('Home'); // Replace 'HomeScreen' with your actual home screen route name
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <ScheduleReportTitle />
            
            <Text style={styles.subTitle}>Your selected reports will be sent to</Text>
            <View style={styles.emailContainer}>
              {modalData.emails.map((email, index) => (
                <View key={index} style={styles.listItem}>
                  <Icon name="email" size={20} color="#001F3F" style={styles.checkIcon} />
                  <Text style={styles.itemText}>{email}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.detail}>You have scheduled the {modalData.selectedFrequency} report</Text>
            <Text style={styles.detail}>{renderScheduleDetails()}</Text>

            <Text style={styles.subTitle}>Selected Reports</Text>
            {modalData.selectedReports.map((report, index) => (
              <View key={index} style={styles.listItem}>
                <Icon name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                <Text style={styles.itemText}>{report}</Text>
              </View>
            ))}

            <Text style={styles.subTitle}>Selected Vehicles</Text>
            {modalData.selectedVehicles.map((vehicle, index) => (
              <View key={index} style={styles.listItem}>
                <Icon name="directions-car" size={20} color="#001F3F" style={styles.checkIcon} />
                <Text style={styles.itemText}>{vehicle}</Text>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 20,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emailContainer: {
    maxHeight: 100,
    width: '100%',
    padding: 10,
    backgroundColor: '#cce5ff',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F3F',
    marginBottom: 10,
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001F3F',
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  checkIcon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#001F3F',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
