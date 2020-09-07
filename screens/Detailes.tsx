import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


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
          <Text style={styles.linkText}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    linkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  });