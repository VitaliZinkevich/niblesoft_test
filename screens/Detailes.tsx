import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from '../components/Themed';

export default function Detailes(
        {
        navigation
      }
) {
    let state = navigation.dangerouslyGetState();
    let params =  state.routes.find ( r => r.name === 'Detailes').params.data;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detailes</Text>
        <Text>{params.map ((text: string) => text)}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });