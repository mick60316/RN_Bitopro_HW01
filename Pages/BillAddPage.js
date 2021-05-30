import { Text, StyleSheet,Button,View, ActivityIndicator,SafeAreaView, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import  { useState ,useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
//https://script.google.com/macros/s/AKfycbxqE5ulad6Eud76--JfHMj9wBimTfXpphxUtJ-7tNfuVTLPmzSA/exec?action=add_bill&owner=mike&time=0510&total=1000&receiver=500&item=eat&collection={%22user1%22:200,%22user2%22:300}

String.prototype.format = function() {
  var a = this;
  for (var k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}
const TAG = "BillAddPage";
function isNumeric(num){
  
  return !isNaN(num)
}
function getUserCount (friends)
{
  var userCount =1;
  for  (let friendIndex in friends)
  {
    printLog(friends[friendIndex]['name'])
    if (friends[friendIndex]['isAdd']==true)
    {
      userCount+=1;
    }
  }
  return userCount;
}
function printLog (message)
{
  
  console.log(TAG,message);
}
export class BillAddPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      time:new Date(),
      total:0,
      receiver:0,
      item:"",
      ViewArray:[],
      isLoading:false
    }
    this.handleFriendPress=this.handleFriendPress.bind(this)
    const { friendList, hello } = this.props.route.params;
  
    for (let friend in friendList)
    {
      friendList[friend]['isAdd']=false
      this.state.ViewArray.push(friendList[friend]);
      friendList[friend]['value']=0
    }
    

  }

  handleTotal = (text)=>
  {
    isNumeric(text)?this.setState({total:text}):alert("Please Input Integer") 
  }
  handleReceiver =(text)=>
  {
    isNumeric(text)?this.setState({receiver:text}):this.setState({receiver:"9999999"})
    
  }
  handleTime =(text)=>
  {
    this.setState({item:text})
  }
  handleAddFinishButtonClick =(navigation)=>
  {
    //this.setState({receiver:"9999999"})
    const {time,total,receiver,item,ViewArray}=this.state;

    var collection ={}
    for (let viewArrayIndex in ViewArray)
    {
        const friend =ViewArray[viewArrayIndex];
      
        if (friend.isAdd==true)
        {
          collection[friend.name]=-friend.value;
        
        }

    }
    const url =global.apiUrlRoot+"action={0}&owner={1}&time={2}&total={3}&receiver={4}&item={5}&collection={6}".format("add_bill",'mike',time,total,receiver,item,JSON.stringify(collection))
   // printLog(apiUrl.format("add_bill",'mike',time,total,receiver,item,JSON.stringify(collection)))
   this.setState({isLoading:true}) 
   fetch(url)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          console.log (json['status'])
          if (json['status']=='Successful')
          {
            
          }

        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({isLoading:false})
            navigation.navigate('Main')
        });
    printLog('handleCheckButtonClick');
    //() => navigation.navigate('Main')

  }
  handleTextChange =(text,key)=>
  {

  }
  handleDateChange=(event,selectDate)=>{

    printLog(selectDate)
    this.setState({time:selectDate})
  }
  handleFriendPress =(event,name)=>{

    
    let friends = [...this.state.ViewArray];
    let index = friends.findIndex(el => el.name === name);
    friends[index]['isAdd']=!friends[index]['isAdd']
    this.setState({ ViewArray: friends });
    printLog(index)
    printLog(this.state.ViewArray)

  }
  handleItemChange =(text)=>{

      this.setState({item:text})

  }
  handleAveragePress =(event)=>
  {
    let friends = [...this.state.ViewArray];
    const userCount =getUserCount(friends);
    const average=this.state.total/userCount;
    
   
    for(let friendIndex in friends)
    {
      if (friends[friendIndex]['isAdd'])
      {
        friends[friendIndex].value=""+average

      }

    }
    this.setState((state) => {
      return {
        receiver: ""+state.total/userCount,
        ViewArray: friends
      };
    });
    
    printLog(this.state.ViewArray)

    printLog(userCount)
    printLog(this.state.total)
    printLog(average)

  }
  render (){
  const {navigation} = this.props;
   
  let Render_Animated_View = this.state.ViewArray.map(( item, key ) =>
  {
      return(
          <View 
            key = { key } 
            style = {{ alignItems: 'center',flex: 1 ,flexDirection:'row' }}>
              <Text style = {{ alignItems: 'center'}} > { item.name } : </Text>
              <TextInput
                name= {item.name}
                onChangeText={(text)=>this.handleTextChange (text,key)}
                style={styles.input}
                display={!item.isAdd}
                value={item.value}
              ></TextInput>
              <TouchableOpacity onPress ={(event)=>this.handleFriendPress(event,item.name)}> 
                <Image
                  style={styles.friendAddButton}
                  source={!item.isAdd? require('../assets/plus.png'):require('../assets/sub.png')}
                ></Image>
              </TouchableOpacity>
          </View>
      );
      
  });

    return (
      
      <SafeAreaView style={{ flex: 1, alignItems:'flex-start', justifyContent: 'flex-start' ,backgroundColor:'#fff' ,fontSize:20 }}>
        <ActivityIndicator animating={this.state.isLoading} size="large"></ActivityIndicator>
        <ScrollView>
          <View style={styles.inputView}>  
            <Text  >Time</Text>
              <View style={styles.dateInput}>
              {true &&( <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.time}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={this.handleDateChange}
                ></DateTimePicker>)}
            </View>

          </View>
          <View style={styles.inputView} > 
            <Text  >Total</Text>
            <TextInput 
              style={styles.input}
              keyboardType='number-pad'
              onChangeText={this.handleTotal}
              value={this.state.total}
            ></TextInput>
            
          </View>
          <View style={styles.inputView} > 
            <Text  >已收</Text>
            <TextInput 
              style={styles.input}
              keyboardType='number-pad'
              onChangeText={this.handleReceiver}
              value={this.state.receiver}
            ></TextInput>
          </View>
          <View style={styles.inputView} > 
            <Text  >項目</Text>
            <TextInput 
              style={styles.input}
              onChangeText={this.handleItemChange}
              value={this.state.item}
            ></TextInput>
          </View>
          <View > 
            <Text  style={{justifyContent:'flex-start' ,paddingLeft:7}} >好友</Text>
          </View>
          
            <View style = {{ flex: 1, padding: 2 ,flexDirection:'column' }}>
              {
                  Render_Animated_View
              }
            </View>
          <Button
            title="均分"
            onPress={this.handleAveragePress}
          />
          <Button
            title="Add bill"
            onPress={
              ()=>this.handleAddFinishButtonClick(navigation)}
          />
          
          </ScrollView>
      </SafeAreaView>
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
  inputView:{
    flexDirection:'row' , 
    alignItems: 'center',
    
  },
  dateInput:{
    height: 40,
    width:200,
    margin: 12,
    borderWidth: 0,

  },
  friendAddButton:{
    width: 50,
    height: 50,
  }
});