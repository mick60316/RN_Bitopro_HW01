import { Text,ActivityIndicator, Button,View,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import {TradeHistoryList} from './BillInfoPageComponent/TradeHistoryList';
import { useNavigation } from '@react-navigation/native';
import {FriendDebtList}from './BillInfoPageComponent/FriendDebtList'
//const apiUrl = "https://script.google.com/macros/s/AKfycbxqE5ulad6Eud76--JfHMj9wBimTfXpphxUtJ-7tNfuVTLPmzSA/exec?action=get_bill&id={0}"
const TAG ="BillInfoPage"
//https://script.google.com/macros/s/AKfycbxqE5ulad6Eud76--JfHMj9wBimTfXpphxUtJ-7tNfuVTLPmzSA/exec?action=edit_bill&id=mike900Tue%20May%2018%202021%2013:36:00%20GMT%200800%20(CST)&from=user1&to=mike&unit=1
function printLog(message)
{
  console.log (TAG,message);
}
String.prototype.format = function() {
  var a = this;
  for (var k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}
function updateData (json,content){
  
  content.setState({tradingHistoryData:json['bill']})
  const historys= content.state.tradingHistoryData;
  var friendObj  ={};
  const account =global.account;
  var friendList=[]
  for (let historyIndex in historys )
  {
      
      const from =historys[historyIndex]['from'];
      const to  = historys[historyIndex]['to'];
      const value =parseInt(historys[historyIndex]['value']);
      printLog(from+" "+account)
      if (from ==account )
      {
        if (!(to in friendObj))
        {
          friendObj[to]=value
        }
      }
      else {
        if (to ==account)
        {
          if (from in friendObj)
          {
            friendObj[from]+=value;  
          }
        }
      }
  }
  printLog(friendObj)
  for (let objIndex in friendObj)
  {
    var obj ={}
    obj ['name']=objIndex;
    obj['value']=friendObj[objIndex];

    printLog(objIndex+" "+ friendObj[objIndex])  
    friendList.push(obj)
  

  }
  content.setState({friendList:friendList})

}
export class BillInfoPage extends Component {
  constructor(props){
    super(props)
    this.state={
        isLoading :true,
        tradingHistoryData:[],
        friendList:[]

    }


    const { billId } = this.props.route.params;
    printLog(billId)
    const apiUrl =global.apiUrlRoot+"action={0}&id={1}".format("get_bill",billId) 
    printLog (apiUrl)
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        updateData(json,this)
      }
    )
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({isLoading:false})
    });

  }

  handleDebt =(item)=>{
    const { billId } = this.props.route.params;
    console.log(global.account,item['name'],item['Repayment'],billId);
    const apiUrl =global.apiUrlRoot+"action={0}&id={1}&from={2}&to={3}&unit={4}".format('edit_bill',billId,item['name'],global.account,item['Repayment'])
    this.setState({isLoading:true})
    fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      updateData(json,this)
    }
    )
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({isLoading:false})
    });
      
  }

  render (){
  const { navigation } = this.props;

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <ActivityIndicator animating={this.state.isLoading} size="large"></ActivityIndicator>
        <ScrollView>
          <View style ={{ flex: 1, alignItems: 'center'  ,fontSize:20 }}>
          <Text>Friend Debt</Text>
          <FriendDebtList friendList ={this.state.friendList} debtChangeCallback={this.handleDebt}  ></FriendDebtList>
          <Text>Trade History</Text>
          <TradeHistoryList data={this.state.tradingHistoryData}></TradeHistoryList>
          
          
        {/* <Button
          title="Go to MainPage"
          onPress={() => navigation.navigate('Main')}
          /> */}
          </View>
          </ScrollView>
          
      </View>
    );
  }
}
