
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const ScheduleReportTitle = () => {
  const handleInfoPress = () => {
   
    alert(`1.Only 5 vehicles can be selected for Vehicle Wise Report.
2.Only 9am or 5 pm schedule time can be selected for the Reports
3.Scheduling of the reports will be uniform for all uniform users.
This functionality doesn't support user level customaisation for schedulin reports`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Report</Text>
      <TouchableOpacity onPress={handleInfoPress}>
        <Icon name="info" size={24} color="#001F3F" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
    color:'#001F3F'
  },
  
});

export default ScheduleReportTitle;
