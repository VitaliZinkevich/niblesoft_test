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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
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
  

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     padding: 20,
  //   },
  //   title: {
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //   },
  //   link: {
  //     marginTop: 15,
  //     paddingVertical: 15,
  //   },
  //   linkText: {
  //     fontSize: 14,
  //     color: '#2e78b7',
  //   },
  // });