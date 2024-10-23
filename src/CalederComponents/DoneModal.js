import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DoneModal({
  visible,
  onClose,
  selectedFrequency,
  selectedDate,
  selectedTime,
  selectedReports,
  selectedVehicles,
  emails,
}) {
  const formatDate = (date) => {
    if (!date) return 'Not selected';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
            <Icon name="check-circle" size={64} color="#4CAF50" style={styles.icon} />
            <Text style={styles.title}>Report scheduled successfully!</Text>
            <Text style={styles.detail}>
              You have scheduled the {selectedFrequency} report
            </Text>
            <Text style={styles.detail}>
              on {formatDate(selectedDate)}, at {selectedTime}
            </Text>
            
            <Text style={styles.subTitle}>Selected Reports</Text>
            {selectedReports.map((report, index) => (
              <View key={index} style={styles.listItem}>
                <Icon name="check" size={20} color="#4CAF50" style={styles.checkIcon} />
                <Text style={styles.itemText}>{report}</Text>
              </View>
            ))}
            
            <Text style={styles.subTitle}>Selected Vehicles</Text>
            {selectedVehicles.map((vehicle, index) => (
              <View key={index} style={styles.listItem}>
                <Icon name="directions-car" size={20} color="#001F3F" style={styles.checkIcon} />
                <Text style={styles.itemText}>{vehicle}</Text>
              </View>
            ))}
            
            <Text style={styles.subTitle}>Mailed to</Text>
            {emails.map((email, index) => (
              <View key={index} style={styles.listItem}>
                <Icon name="email" size={20} color="#001F3F" style={styles.checkIcon} />
                <Text style={styles.itemText}>{email}</Text>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity style={styles.okayButton} onPress={onClose}>
            <Text style={styles.okayButtonText}>OKAY</Text>
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