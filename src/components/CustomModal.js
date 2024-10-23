import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import MultiSelect from '../components/MultiSelect'; // Adjust the import path as necessary
import EmailInModal from './EmailInModal'; // Ensure the path is correct
import ProceedCancelBtns from './ProceedCancelBtns';
import ProceedModal from './ProceedModal'; // Import the ProceedModal
import ScheduleReportTitle from './ScheduleReportTitle';
import VehicleSelection from './VehicleSelection'; // Import the VehicleSelection component

const CustomModal = ({ visible, onClose }) => {
  const options = [
    'Fleet Wise Report',
    'Vehicle Wise Report',
    'Trip Wise Report',
    'Driving Scorecard Report',
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [emails, setEmails] = useState([]); // Initialize with an empty array
  const [proceedModalVisible, setProceedModalVisible] = useState(false); // State for the ProceedModal
  const [selectedVehicles, setSelectedVehicles] = useState([]); // State for selected vehicles
  const[selectedBranch,setSelectedBranch]=useState([]);
  const[vinSearch,setVinSearch]=useState([]);

  const handleAddEmail = (email) => {
    if (email && !emails.includes(email)) { // Avoid duplicates
      setEmails([...emails, email]); // Add email to the list
    }
  };

  const handleRemoveEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const isProceedEnabled = selectedOptions.length > 0 && emails.length > 0; // Enable if conditions met

  const handleProceed = () => {
    setProceedModalVisible(true); // Show the ProceedModal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Close modal when back button is pressed
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ScheduleReportTitle /> 
            <View style={styles.separator}></View>
            <Text style={styles.title}>Select Report Type</Text>
            
            {/* MultiSelectorCheckbox component */}
            <MultiSelect
              options={options}
              selectedOptions={selectedOptions}
              onSelectionChange={setSelectedOptions}
            />

            {/* Show VehicleSelection if "Vehicle Wise Report" is selected */}
           {selectedOptions.includes('Vehicle Wise Report') && (
        <VehicleSelection
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          vinSearch={vinSearch}
          setVinSearch={setVinSearch}
          selectedVehicles={selectedVehicles}
          setSelectedVehicles={setSelectedVehicles}
        />
            )}

            {/* Title for email input */}
            <Text style={styles.emailTitle}>Enter Email IDs</Text>

            {/* Email input fields */}
            <EmailInModal
              emails={emails} // Pass emails as a prop
              onAddEmail={handleAddEmail} // Pass the method to add email
              onRemoveEmail={handleRemoveEmail} // Pass the method to remove email
            />
          </ScrollView>

          {/* Modal Buttons */}
          <ProceedCancelBtns
            onProceed={handleProceed}
            onCancel={onClose}
            isProceedEnabled={isProceedEnabled}
          />

        </View>
      </View>

      {/* Proceed Modal */}
      <ProceedModal 
        visible={proceedModalVisible} 
        onClose={() => setProceedModalVisible(false)} 
        selectedOptions={selectedOptions || []} 
        emails={emails} 
        selectedVehicles={selectedVehicles} // Pass selected vehicles
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '90%', 
    maxWidth: 400,
    maxHeight: '70%', 
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContainer: {
    flexGrow: 1, // Ensure that the ScrollView takes up the necessary space
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#001F3F',
  },
  emailTitle: {
    fontSize: 16,
    fontWeight: '600', 
    marginVertical: 10,
    color: '#001F3F',
  },
  separator: {
    height: 1,          
    width: '100%',      
    backgroundColor: 'lightgrey', 
    marginVertical: 4,
    alignSelf: 'center', 
  },
});

export default CustomModal;
