import * as React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import { View, Text } from '../components/Themed';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function TabTwoScreen({navigation}) {

  const [history, setHistory] = React.useState([]);
  const tableHead = ['Дата', 'Координаты', 'Адрес', 'Погода']

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('history')
      if(value !== null) {
        setHistory (JSON.parse (value))
      } 
    } catch(e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    (async () => {
      await getData ()
    })();
  }, []);

  return (

    <View style={styles.container}>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <ScrollView>
      <View>
        <View>
          {tableHead.map (e => {e})}
        </View>
        {history.map ((row, index)=>{
          return (<TouchableOpacity key={index} onPress={() => {
            navigation.navigate('Detailes', {data: row})
          }}>
              <View >
                <Text>{row && row.map (el => el)}</Text>
              </View>
          </TouchableOpacity>)
          })}
      </View>
    </ScrollView>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  head: { height: 40, backgroundColor: '#f1f8ff' },
});