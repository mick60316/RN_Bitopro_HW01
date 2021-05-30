
import { Text,ActivityIndicator, Button,View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component,useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from "react-native";
import  { useState ,useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import '../CustomComponent/Tools.js'




function login (){
    const navigation =this.props;
    navigation.navigate('Main');
}
String.prototype.format = function() {
    var a = this;
    for (var k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}
export class LoginPage extends Component {
    
    constructor(props)
    {

        super(props);
        console.log('world')
        console.log(global.apiUrlRoot)
    
    }
    state ={
        account:'',
        password:'',
        navigation:null,
        isLogin :false
    }
    handleAccount =(text)=>{
        
        this.setState({account:text})
        console.log(text)

    }
    handlePassword=(text)=>
    {
        this.setState({password:text})
    }
    loginPress=()=>{
        const { navigation } = this.props;
        
        console.log (this.state.account+" "+this.state.password)
        var url =global.apiUrlRoot+"action={0}&account={1}&password={2}".format("login",this.state.account.toLowerCase(),this.state.password);
        console.log(url);

        this.setState({isLogin:true})
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          console.log (json['status'])
          if (json['status']=='Successful')
          {
              global.account = this.state.account.toLowerCase();
              navigation.navigate('Main');
          }

        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({isLogin:false})
        });
        


        //navigation.navigate('Main');
    }

    render (){
    const { navigation } = this.props;



        
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#fff' ,fontSize:20 }}>
            <Text>Login Page</Text>
            <ActivityIndicator animating={this.state.isLogin} size="large" />
            <TextInput 
                placeholder = "Account"
                style={styles.input}
                onChangeText={this.handleAccount}
            ></TextInput>
            <TextInput
                placeholder = "Password"
                style={styles.input}
                onChangeText={this.handlePassword}
            ></TextInput>
            <Button
                title="Login"
                onPress={
                    this.loginPress
                }
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
  });