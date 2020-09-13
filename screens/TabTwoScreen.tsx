import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';

export default inject ('observableStore') (observer (function TabTwoScreen({navigation, observableStore}) {

  const tableHead = ['Дата', 'Координаты', 'Адрес', 'Погода']

  React.useEffect(() => {
    (async () => {
      await observableStore.getData ()
    })();
  }, []);

  return (
    <View style={styles.container}>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <ScrollView>
      <View>
        <View>
          {/* {tableHead.map (e => <Text key={e}>{e}</Text>)} */}
        </View>
        {observableStore.history.map ((row, index)=>{
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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
});