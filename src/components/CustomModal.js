import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView } from 'react-native';
import MultiSelect from '../components/MultiSelect'; 
import EmailInModal from './EmailInModal'; 
import ProceedCancelBtns from './ProceedCancelBtns';
import ProceedModal from './ProceedModal'; 
import ScheduleReportTitle from './ScheduleReportTitle';
import VehicleSelection from './VehicleSelection'; 

const CustomModal = ({ visible, onClose }) => {
  const options = [
    'Fleet Wise Report',
    'Vehicle Wise Report',
    'Trip Wise Report',
    'Driving Scorecard Report',
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [emails, setEmails] = useState([]); 
  const [proceedModalVisible, setProceedModalVisible] = useState(false); 
  const [selectedVehicles, setSelectedVehicles] = useState([]); 
  const[selectedBranch,setSelectedBranch]=useState([]);
  const[vinSearch,setVinSearch]=useState([]);

  const handleAddEmail = (email) => {
    if (email && !emails.includes(email)) { 
      setEmails([...emails, email]); 
    }
  };

  const handleRemoveEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const isProceedEnabled = selectedOptions.length > 0 && emails.length > 0; 

  const handleProceed = () => {
    setProceedModalVisible(true); 
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ScheduleReportTitle /> 
            <View style={styles.separator}></View>
            <Text style={styles.title}>Select Report Type</Text>
            
           
            <MultiSelect
              options={options}
              selectedOptions={selectedOptions}
              onSelectionChange={setSelectedOptions}
            />

           
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

           
            <Text style={styles.emailTitle}>Enter Email IDs</Text>

           
            <EmailInModal
              emails={emails} 
              onAddEmail={handleAddEmail} 
              onRemoveEmail={handleRemoveEmail} 
            />
          </ScrollView>

        
          <ProceedCancelBtns
            onProceed={handleProceed}
            onCancel={onClose}
            isProceedEnabled={isProceedEnabled}
          />

        </View>
      </View>

     
      <ProceedModal 
        visible={proceedModalVisible} 
        onClose={() => setProceedModalVisible(false)} 
        selectedOptions={selectedOptions || []} 
        emails={emails} 
        selectedVehicles={selectedVehicles} 
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
    flexGrow: 1, 
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
