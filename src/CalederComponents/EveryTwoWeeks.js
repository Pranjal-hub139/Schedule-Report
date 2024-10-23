import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EveryTwoWeeks = ({ selectedDay, onSelectDay }) => {
  const [selected, setSelected] = useState(selectedDay);

  const daysOfWeek = [
    { id: '1', label: 'Monday' },
    { id: '2', label: 'Tuesday' },
    { id: '3', label: 'Wednesday' },
    { id: '4', label: 'Thursday' },
    { id: '5', label: 'Friday' },
    { id: '6', label: 'Saturday' },
    { id: '7', label: 'Sunday' },
  ];

  const handleSelect = (day) => {
    setSelected(day);
    onSelectDay(day);
  };

  return (
    <View style={styles.container}>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day.id}
            style={[styles.dayBox, selected === day.label && styles.selectedDayBox]}
            onPress={() => handleSelect(day.label)}
          >
            <Icon
              name={selected === day.label ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={24}
              color={selected === day.label ? '#001F3F' : '#888'}
            />
            <Text style={styles.dayLabel}>{day.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#001F3F',
    marginBottom: 10,
  },
  dayBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
    width: 120,
    justifyContent: 'space-between',
  },
  selectedDayBox: {
    backgroundColor: '#cce5ff',
  },
  dayLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default EveryTwoWeeks;
