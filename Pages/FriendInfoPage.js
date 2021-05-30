import { Text, Button,View, StyleSheet,SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';

export class FriendInfoPage extends Component {
  constructor(props)
  {
    super(props)
    const{friendInfo}=this.props.route.params;
    console.log(friendInfo)
    this.state={
      friendInfo:friendInfo,
      test:'hello',
      data:[
   


      ]
    }

    const apiUrl =global.apiUrlRoot+"action={0}&id={1}&name={2}".format("get_trade_history",friendInfo['history'],friendInfo['name']) 
    //printLog (apiUrl)
    console.log(apiUrl)
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json['data'])
        this.setState({data:json['data']
        // [
        //   {
        //     "name": "mike300Thu May 27 2021 09:22:49 GMT 0800 (CST)",
        //     "data":['1','2','3'], 
            
        //   },
        



        // ]
          // {
          //   name: "Main dishes",
          //     data: ["Pizza", "Burger", "Risotto"]
          //   },
          //   {
          //     name: "Sides",
          //     data: ["French Fries", "Onion Rings", "Fried Shrimps"]
          //   },
          //   {
          //     name: "Drinks",
          //     data: ["Water", "Coke", "Beer"]
          //   },
          //   {
          //     name: "Desserts",
          //     data: ["Cheese Cake", "Ice Cream"]
          //   }
          
        
        })
        this.setState({test:"world"})
        console.log(this.state.data)

  

      
      }
    )
    .catch((error) => console.error(error))
    .finally(() => {
      console.log('api get finish')
      //this.setState({isLoading:false})
    });



  }
    render (){
    const { navigation } = this.props;
      return (
        <View style={{ flex: 1, alignItems:'center',backgroundColor:'#fff' ,fontSize:20 }}>
            <Text style={{fontSize:36}} >{this.state.friendInfo['name']} {this.state.friendInfo['debt']}</Text>
            <SectionList
                  sections={this.state.data}
                  renderItem={({item}) => 
                  <View flexDirection='row' style={{backgroundColor:item['value']<0?'#f00':'#0f0'}}>
                      <Text 
                      style={sectionListStyles.item}>From {item.from} to {item.to}  {item.value}</Text>
                    
                      </View>
                  }
                  renderSectionHeader={({section}) => <Text style={sectionListStyles.sectionHeader}>{section.name}</Text>}
                  keyExtractor={(item, index) => index}
            >
            </SectionList>
            <Button
            title="Go to MainPage"
            onPress={() => navigation.navigate('Main')}
            />
        </View>
      );
    }
}
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