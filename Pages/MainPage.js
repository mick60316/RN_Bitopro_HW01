import { Text, Button,View,StyleSheet,FlatList,TouchableOpacity, Image, SafeAreaView, TouchableHighlight, PanResponder } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import {CustomerListView} from '../CustomComponent/CustomerListView'
import  { useState ,useEffect } from 'react';
const apiUrl = "https://script.google.com/macros/s/AKfycbxqE5ulad6Eud76--JfHMj9wBimTfXpphxUtJ-7tNfuVTLPmzSA/exec?action=get_bill_list&name=mike"
const TAG = "Main Page";

function printLog(message)
{
  
  console.log(TAG,message);
}

String.prototype.format = function() {
  var a = this;
  for (var k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
  }
  return a
}
function Profile({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focus')
      // Screen was focused
      // Do something
    });
 
    return unsubscribe;
  }, [navigation]);
 
  return <ProfileContent />;
}
function Bill(props) {

  const itemClickCallback = (item) => {
    printLog(item)
    props.nav.navigate('BillInfo',{billId :item.id});
		//props.navigation.navigate('Details');
	};
  const itemRemoveClickCallback =(item)=>{
    
    
    const apiUrl  =global.apiUrlRoot+"action={0}&id={1}&name={2}".format("remove_bill",item['id'],global.account);
    
    printLog(apiUrl)
    props.content.setState({isLoading:true})
    fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      //console.log (json)
      
    })
    .catch((error) => console.error(error))
    .finally(() => {
      //props.content.setState({isLoading:false})
      props.reload(props.content)

    });
   

  }

  const gotoBillAddPage= ()=>{

    props.nav.navigate('BillAdd',{
      friendList:props.friendList,
      hello:'world',

    });
  }
  return (
    <View style={{ flex: 1, justifyContent:'flex-start', alignItems:'flex-start' }}>
      <CustomerListView 
      itemClickCallback={itemClickCallback} 
      itemRemoveClickCallback={itemRemoveClickCallback}
      
      section={props.billList} 
      isLoading={props.isLoading}  ></CustomerListView>
      <View style={{ flex: 1,width:'10%',height:'10%',position:'absolute',bottom:30,right:30 }}>
        <Button
            title="+"
            color="#FF0000"
            onPress={gotoBillAddPage}
        ></Button>
      </View>
    </View>
  );
}
function Friend(props) {

  const [isLoading, setLoading] = useState(true);
  const [friend, setFriend] = useState([]);
  const friendList=props.friendList;
  printLog(friendList)
  


  const gotoFriendAddPage = () => {
		props.nav.navigate('FriendAdd');
	};

  const friendItemClick =(item)=>{
    props.nav.navigate('FriendInfo' ,{friendInfo:item});

  }
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems:'flex-start'}}>
      <View style={styles.container}>
        <FlatList
          data={props.friendList}
          renderItem={
            ({item}) =>
            <TouchableOpacity onPress={()=>friendItemClick(item)}>
              <View style={{flexDirection:'row' ,fontSize:24,display:'flex',flexWrap: 'wrap' }} >
              
                <Text style={styles.friendText}>{item.name} </Text>
                <Text style={styles.friendText}>{item.debt}</Text>
                
              </View>
              </TouchableOpacity>
        }
        />
      </View>
        <View style={{ flex: 1,width:'10%',height:'10%',position:'absolute',bottom:30,right:30 }}>
          <Button
            title="+"
            color="#FF0000"
            onPress={gotoFriendAddPage}
          />
        </View>
      </View>
    
  );
}


const Tab = createBottomTabNavigator();

export class MainPage extends Component {
  constructor(props){
    super(props)
    this.state={
      billList:[],
      friendList:[],
      isLoading:true
    };
    const{navigation} =this.props;
    navigation.addListener('focus', () => this.updateData(this))
  }
  updateData (content)
  {
    console.log('updateData')
    content.setState({isLoading:true})
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        
        printLog(json)
        //this.setState({billList:json['bill_list']})
        content.setState({ friendList: json['friend_list'] });
        const data =json['bill_list']

        const times ={}
        const mySections=[];
        for (let obj in data)
        {

          const timeSplit=(String)(data[obj]['time']).split(' ')
          var timeStr= "";
          for (var i=0;i<4;i++)
          {
            timeStr+=timeSplit[i]+" ";

          }

          const time =timeStr
          const tradeObj={}
          
          if (!(time in times ))
          {
              times[time]=[]
          }
          tradeObj['id']=data[obj]['id'];
          tradeObj['name']=data[obj]['item'];
          tradeObj['hello']='world';
          tradeObj['total']=data[obj]['total'];
          tradeObj['receiver']=data[obj]['receiver'];
          times[time].push(tradeObj)
          
          //console.log(data[obj]['id'],data[obj]['time'])
          //console.log(obj['time',obj['id']])
        }
        console.log(times)
        const nameList =Object.keys(times);
    
        for (var i  =0 ; i<nameList.length;i++)
        {
            const obj ={};
            obj['title']=nameList[i];
            obj['data']=times[nameList[i]]
            mySections.push(obj)


        }
        console.log(mySections)
        content.setState({billList:mySections})


      })
      .catch((error) => console.error(error))
      .finally(() => {
        content.setState({isLoading:false})
      });
  }
  componentDidMount(){
    console.log('componentDidUpdate')
  
    
    

  }

  render (){
    const{navigation} =this.props;
    //navigation.addListener('focus', () => alert('Screen was focused'))



    return (
      <Tab.Navigator
        initialRouteName="Bill"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Bill"
          component={()=><Bill content={this} reload={this.updateData} nav={navigation} friendList={this.state.friendList} isLoading={this.state.isLoading} billList ={this.state.billList}></Bill>}
          options={{
            tabBarLabel: 'Bill',
            tabBarIcon: ({ color, size ,tintColor}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Friend"
          component={()=><Friend nav ={navigation} isLoading={this.state.isLoading} friendList={this.state.friendList} ></Friend>}
          options={{
            tabBarLabel: 'Friend',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      
    );
  }
}

const styles = StyleSheet.create({
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