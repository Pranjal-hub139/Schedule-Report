import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import dropDownIcon from '../../assets/dropDownIcon.png'; 
import dropDownOpenIcon from '../../assets/dropDownOpenIcon.png'; 
import ScheduleReportTitle from './ScheduleReportTitle';
import TimeRadioBtn from './TimeRadioBtn';
import SkipWeekendsToggle from './SkipWeekendsToggle';
import CancelDoneBtns from './CancelDoneBtns';
import AllCalenderRadioBtns from '../CalederComponents/AllCalenderRadioBtns';
import DoneModal from '../CalederComponents/DoneModal';

const ProceedModal = ({ visible, onClose, selectedOptions, emails, selectedVehicles }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSkipWeekends, setIsSkipWeekends] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [isDoneModalVisible, setDoneModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const[selectedDay, setSelectedDay]= useState();

  const toggleSkipWeekends = () => {
    setIsSkipWeekends(!isSkipWeekends);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelectDate = (date) => {
    setSelectedDate(date); 
  };

  const handleSelectDay = (day) => {
    setSelectedDay(day); 
  };

  const renderSection = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Text key={index} style={styles.optionItem}>
            {index + 1}. {item}
          </Text>
        ))
      ) : (
        <Text style={styles.noneText}>None</Text>
      )}
    </View>
  );

  const handleDone = () => {
    
    setDoneModalVisible(true); 
  };

  const closeDoneModal = () => {
    setDoneModalVisible(false); 
  };

  // const selectedParameters = [
  //   ...selectedOptions,
  //   ...selectedVehicles,
  //   ...emails,
  // ]; 

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <ScheduleReportTitle/>

              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownHeaderText}>Selected Parameters</Text>
                <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                  <Image 
                    source={isDropdownOpen ? dropDownIcon : dropDownOpenIcon} 
                    style={styles.dropdownIcon} 
                    resizeMode="contain" 
                  />
                </TouchableOpacity>
              </View>

              {isDropdownOpen && (
                <View style={styles.dropdownContent}>
                  {renderSection('Report Types', selectedOptions)}
                  {renderSection('Vehicles', selectedVehicles)}
                  {renderSection('Mailed to', emails)}
                </View>
              )}

              <TimeRadioBtn
                selectedTime={selectedTime} 
                onSelect={setSelectedTime}
              />
              <Text style={styles.heading}>Set Interval</Text>
              <SkipWeekendsToggle 
                isEnabled={isSkipWeekends} 
                toggleSkipWeekends={toggleSkipWeekends} 
              />
              
              <AllCalenderRadioBtns
                selectedFrequency={selectedFrequency}
                onSelect={(value) => setSelectedFrequency(value)}
                onSelectDate={handleSelectDate}
                onSelectDay={handleSelectDay}
                isSkipWeekends={isSkipWeekends}
                
              />
              
            </ScrollView>
             
            <View style={styles.buttonContainer}>
              <CancelDoneBtns
                onCancel={onClose}
                onDone={handleDone}  
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* DoneModal integrated within ProceedModal */}

      
      <DoneModal
  visible={isDoneModalVisible}
  onClose={closeDoneModal}
  selectedFrequency={selectedFrequency}
  selectedDate={selectedDate}
  selectedTime={selectedTime}
  selectedReports={selectedOptions}
  selectedVehicles={selectedVehicles}
  selectedDay={selectedDay} // Pass selected day to DoneModal
  emails={emails}
/>
    </View>
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
    maxHeight: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
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
    width: '100%',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  dropdownHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#001F3F',
  },
  dropdownButton: {
    marginLeft: 10,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  dropdownContent: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001F3F',
    marginBottom: 5,
  },
  optionItem: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    marginVertical: 2,
  },
  noneText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F3F',
    marginBottom: 10,
  },
});

export default ProceedModal;
