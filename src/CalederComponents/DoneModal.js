import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OkayModal from '../components/OkayModal';

export default function DoneModal({
  visible,
  onClose,
  selectedFrequency,
  selectedDate,
  selectedTime,
  selectedReports,
  selectedVehicles,
  emails,
  selectedDay,
}) {
  const [showOkayModal, setShowOkayModal] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Not selected';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleOkayPress = async () => {
    try {
      const modalData = JSON.stringify({
        selectedFrequency,
        selectedDate,
        selectedTime,
        selectedReports,
        selectedVehicles,
        emails,
        selectedDay,
      });
      await AsyncStorage.setItem('modalData', modalData);
      onClose();
      setShowOkayModal(true);
    } catch (error) {
      console.error('Error saving modal data:', error);
    }
  };

  const handleCloseOkayModal = () => {
    setShowOkayModal(false);
  };

  const renderScheduleDetails = () => {
    switch (selectedFrequency) {
      case 'Weekly':
        return `Every ${selectedDay} at ${selectedTime}`;
      case 'Every 2 Weeks':
        return `Every other ${selectedDay} at ${selectedTime}`;
      case 'Monthly':
        return `On the ${selectedDate.getDate()}${getOrdinalSuffix(selectedDate.getDate())} of ${selectedDate.toLocaleString('default', { month: 'long' })} at ${selectedTime}`;
      default:
        return `on ${formatDate(selectedDate)}, at ${selectedTime}`;
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

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Icon name="check" size={40} color="#4CAF50" style={styles.icon} />
              <Text style={styles.title}>Report scheduled successfully!</Text>
              <Text style={styles.detail}>You have scheduled the {selectedFrequency} report</Text>
              <Text style={styles.detail}>{renderScheduleDetails()}</Text>

              <Text style={styles.subTitle}>Selected Reports</Text>
              {selectedReports.map((report, index) => (
                <View key={index} style={styles.listItem}>
                  <Icon name="check-circle" size={20} color="#4CAF50" style={styles.checkIcon} />
                  <Text style={styles.itemText}>{report}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.okayButton} onPress={handleOkayPress}>
              <Text style={styles.okayButtonText}>OKAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <OkayModal visible={showOkayModal} onClose={handleCloseOkayModal} />
    </>
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
  okayButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#001F3F',
    borderRadius: 5,
  },
  okayButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});