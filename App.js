import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, SectionList,Text,Button, TextInput, View, FlatList, TouchableHighlight, SafeAreaView } from 'react-native';
import  { useState ,useEffect } from 'react';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {MainPage} from "./Pages/MainPage"
import {LoginPage}from "./Pages/LoginPage"
import {FriendAddPage} from "./Pages/FriendAddPage"
import {FriendInfoPage} from "./Pages/FriendInfoPage"
import {BillAddPage} from "./Pages/BillAddPage"
import {BillInfoPage} from "./Pages/BillInfoPage"


const getFullname =(name1,name2,name3)=>{
  return name1+name2+name3;
}
const Stack=createStackNavigator();


// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);
//   const [name ,setName ]=useState("AAA");
//   const [data,setData]=useState([]);
//   var pairData =[]
//   var a ={}
//   useEffect(() => {
//     fetch('https://api.bitopro.com/v3/tickers')
//       .then((response) => response.json())
//       .then((json) => setData(json.data))
//       .catch((error) => console.error(error));
//   }, []);
//   console.log('result')
//   //console.log(data)

  

//   for (let obj of  data )
//   {
//     var objIndex={};
//     objIndex['key']=obj['pair']
//     pairData.push(objIndex)
//     console.log(obj['pair'])
//   }

  
//   console.log('finish')
//   return (
//     <View>
//       <Text>You clicked times</Text>
//       <FlatList
//         data={pairData}
//         renderItem={
//           ({item}) =>
//           <View>
//             <Text>{item.key}</Text>
//           </View>
//         }
//       ></FlatList>

//     </View>
//   );
// }


 

class CatMain extends Component {
  render(){
    const  name =getFullname("AAA","BBB","CCC")
    return (
      <View>
        <Text>Hello I am {this.props.name}</Text>
        <TextInput
          style={{
            height:40,
            borderColor:'gray',
            borderWidth:1
          }}  
          defaultValue="Name me!"
        ></TextInput>

       
      </View>
    );
  }
}

// function LoginPage({navigation}) {
 
//   const test = "hello world"
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#fff' ,fontSize:20 }}>
//       <Text>Login Page</Text>
//       <Button
//         title="Go to MainPage"
//         onPress={() => navigation.navigate('Main')}
//       />
//     </View>
//   );
// }

// function DetailsScreen({route,navigation}) {

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Home"
//         onPress={() => navigation.navigate('Home')}
//       />
//     </View>
//   );
// }
// function MainPage({navigation}) {
//   return (
//     <MainContentPage></MainContentPage>
//   );
// }


function DogMain () {
  global.apiUrlRoot ="https://script.google.com/macros/s/AKfycbxqE5ulad6Eud76--JfHMj9wBimTfXpphxUtJ-7tNfuVTLPmzSA/exec?";
  console.log ('123123 main')
  console.disableYellowBox=true
  

  
  return (
     <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen name ="Login" component={LoginPage}/>
        <Stack.Screen name ="Main" component={MainPage}/>

        <Stack.Screen name ="FriendAdd" component={FriendAddPage}/>
        <Stack.Screen name ="FriendInfo" component={FriendInfoPage}/>
        <Stack.Screen name ="BillAdd" component={BillAddPage}/>
        <Stack.Screen name ="BillInfo" component={BillInfoPage}/>
        
       </Stack.Navigator>
    </NavigationContainer>
    
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name ="Details" component={DetailsScreen}/>
      //     <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
      //   </Stack.Navigator>
        
      // </NavigationContainer>
   
  );
}


export default DogMain


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const sectionListStyles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})



