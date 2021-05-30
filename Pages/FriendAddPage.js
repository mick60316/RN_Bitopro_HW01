import { Text, Button,View,StyleSheet, ActivityIndicator,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';

String.prototype.format = function() {
  var a = this;
  for (var k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}



export class FriendAddPage extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      name:"",
      isLoading:false
    }


  }
  
  handleNameChange =(text)=>{
    console.log(text);
    this.setState({name:text});
  }
  handleAddFriendButtonClick =(navigation)=>{
    const apiUrl =global.apiUrlRoot+"action={0}&name={1}".format("add_friend",this.state.name);
    this.setState({isLoading:true})
    fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      console.log (json)
      
    })
    .catch((error) => console.error(error))
    .finally(() => {
      //props.content.setState({isLoading:false})
      //props.reload(props.content)
      this.setState({isLoading:false})
      navigation.navigate('Main')

    });

    
   

  }

  render (){
  const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#fff' ,fontSize:20 }}>
        <ActivityIndicator animating={this.state.isLoading} size="large"></ActivityIndicator>
          <Text>FriendAddPage</Text>
          <View flexDirection='row' style={{alignItems: 'center'}}>
            <Text >Name</Text>
            <TextInput onChangeText={this.handleNameChange} style={styles.input}></TextInput>

          </View>
          <Button
          title="Add Friend"
          onPress={()=>this.handleAddFriendButtonClick(navigation)}
          // onPress={() => navigation.navigate('Main')}
          />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width:100,
    margin: 12,
    borderWidth: 1,
  },
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  friendText:{
    fontSize:24,
    height:50,
    width:'50%',


  }  
});