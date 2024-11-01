import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import data from '../VehicleData.json'; 

const vehicleData = data.vehicles;

const VehicleSelection = ({ selectedVehicles, setSelectedVehicles }) => {
  const [selectedBranch, setSelectedBranch] = useState('all'); 
  const [vinSearch, setVinSearch] = useState(''); 

 
  const filteredVehicles = vehicleData.filter(vehicle => {
    const matchesBranch = selectedBranch === 'all' || vehicle.branch.toLowerCase() === selectedBranch.toLowerCase();
    const matchesVin = vehicle.vin.toLowerCase().includes(vinSearch.toLowerCase()) ||
                       vehicle.registration_number.toLowerCase().includes(vinSearch.toLowerCase()) ||
                       vehicle.lob_name.toLowerCase().includes(vinSearch.toLowerCase());
    return matchesBranch && matchesVin;
  });

  const handleCheckboxChange = (vehicle) => {
    if (selectedVehicles.includes(vehicle.registration_number)) {
      setSelectedVehicles(selectedVehicles.filter(item => item !== vehicle.registration_number));
    } else {
      if (selectedVehicles.length < 5) { 
        setSelectedVehicles([...selectedVehicles, vehicle.registration_number]);
      } else {
        alert("You can only select up to 5 vehicles.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Branches:</Text>
      <Picker
        selectedValue={selectedBranch}
        dropdownIconColor='black'
        onValueChange={(itemValue) => setSelectedBranch(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Thane" value="thane" />
        <Picker.Item label="Pune" value="pune" />
        <Picker.Item label="Mumbai" value="mumbai" />
      </Picker>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by VIN, Registration Number, or LOB"
        placeholderTextColor='grey'
        value={vinSearch}
        onChangeText={setVinSearch}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={filteredVehicles}
          renderItem={({ item }) => (
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={selectedVehicles.includes(item.registration_number)}
                onValueChange={() => handleCheckboxChange(item)}
                tintColors={{ true: '#001F3F', false: 'black' }}
              />
              <Text style={styles.optionText}>{item.registration_number}</Text>
            </View>
          )}
          keyExtractor={item => item.vin}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true} 
          nestedScrollEnabled={true} 
        />
      </View>

    
      {selectedVehicles.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedLabel}>Selected Vehicles:</Text>
          <FlatList
            data={selectedVehicles}
            renderItem={({ item }) => (
              <View style={styles.selectedItem}>
                <Text style={styles.selectedText}>{item}</Text>
                <TouchableOpacity
                  onPress={() => setSelectedVehicles(selectedVehicles.filter(vehicle => vehicle !== item))}
                >
                  <Text style={styles.removeButton}>x</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={true} 
            contentContainerStyle={styles.selectedItemsContainer}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#001F3F', 
  },
  picker: {
    height: 40,
    width: '90%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    color: 'black',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#fff', 
    color:'black'
   
  },
  listContainer: {
    maxHeight: 300, 
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#fff', 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 5,
  },
  optionText: {
    marginLeft: 10,
    flex: 1,
    color: 'black', 
  },
  selectedContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '90%',
  },
  selectedLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#001F3F', 
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#cce5ff',
    borderRadius: 5,
  },
  selectedText: {
    marginRight: 10,
    color: 'black',  
  },
  removeButton: {
    color: 'red',
    fontWeight: '600',
    fontSize:16
   
  },
  selectedItemsContainer: {
    
  },
});

export default VehicleSelection;
