import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';

export default inject ('observableStore') (observer (function TabTwoScreen({navigation, observableStore}) {

  const tableHead = ['Дата', 'Координаты', 'Адрес', 'Погода'];

  React.useEffect(() => {
    (async () => {
      await observableStore.getData ()
    })();
  }, []);


  function RenderRow(data: any[]) {
    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
          {data.map (element =><View key={element} style={{ flex: 1, alignSelf: 'stretch' }} ><Text>{element}</Text></View>)}
        </View>
    )
  }

  return (
    <View style={styles.container}>
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          observableStore.clearStorageHistory()
        }}
      >
        <Text style={styles.buttonText}>Очистить</Text>
      </TouchableOpacity>  
    </View>  
      
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <ScrollView>
      <View>
        <View>
          {RenderRow(tableHead)}
        </View>
        {observableStore.history.map ((row, index)=>{
          return (<TouchableOpacity key={index} onPress={() => {
            navigation.navigate('Detailes', {data: row})
          }}>
            {RenderRow(row)}
          </TouchableOpacity>)
          })}
      </View>
     
       
        
    </ScrollView>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  </View>
  );
}))


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
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  button : {
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
});