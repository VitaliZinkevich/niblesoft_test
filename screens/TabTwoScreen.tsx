import * as React from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Table, Row, Rows } from 'react-native-table-component';
import { View } from '../components/Themed';
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
       <ScrollView>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          {history.map ((row, index)=>{
            return (<TouchableOpacity key={index} onPress={() => {
              navigation.navigate('Detailes', {data: row})
            }}>
                      <Row  data={row}></Row>
                    </TouchableOpacity>)
            
            
            
            })}
        </Table>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
