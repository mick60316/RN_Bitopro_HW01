import React, { Component } from 'react';
import { StyleSheet,ActivityIndicator, SectionList,Text,Button, TextInput, View, FlatList, TouchableHighlight } from 'react-native';
import  { useState ,useEffect } from 'react';

const apiUrl = "https://script.google.com/macros/s/AKfycbxqE5ulad6Eud76--JfHMj9wBimTfXpphxUtJ-7tNfuVTLPmzSA/exec?action=get_bill_list&name=mike"
const getMoviesFromApiAsync = async () => {
    try {
      let response = await fetch(
        apiUrl
      );
      let json = await response.json();
      
      return json.data;
    } catch (error) {
      console.error(error);
    }
  };

export class CustomerListView extends Component {
    constructor(props) {
        super(props);
        const name =this.props.name;
        this.state = {
          data: [],
          isLoading: this.props.isLoading,
          callback:this.props.callback,
          section: this.props.section
        };
        
        
      }
    itemClick =(item)=>{

      this.props.itemClickCallback(item)
    
    }
    itemRemoveClick=(item2)=>{
    
      this.props.itemRemoveClickCallback(item2)

     
    }
    componentDidMount() {
        // this.setState({isLoading:true})
        // fetch(apiUrl)
        //   .then((response) => response.json())
        //   .then((json) => {
        //     console.log(json)
        //     this.setState({data:json['bill_list']})
        //     //this.setState({ data: json.data });
        //   })
        //   .catch((error) => console.error(error))
        //   .finally(() => {
        //     this.setState({isLoading:false})
        //   });
      }
    render(){
        const {data,isLoading}=this.state;
        const times ={}
        const mySections=[];
        
        for (let obj in data)
        {
          const timeSplit=(String)(data[obj]['time']).split(' ')

          var timeStr = "";
          console.log(data[obj]['time'])
          for (var i =0;i<4;i++)
          {
            timeStr+=timeSplit[i];
          }
          console.log(timeStr)  
          const time =timeStr;
          const id = data[obj]['id']
          if (!(time in times ))
          {
              times[time]=[]
          }
          
          times[time].push(id)
          
          
          //console.log(obj['time',obj['id']])
        }
         const nameList =Object.keys(times);
      //console.log(times)
       // console.log (nameList);
         for (var i  =0 ; i<nameList.length;i++)
         {
             const obj ={};
             obj['title']=nameList[i];
             obj['data']=times[nameList[i]]
             mySections.push(obj)
         }

        
    return (
      <View>
        <ActivityIndicator animating={this.state.isLoading} size="large"></ActivityIndicator>
        <SectionList
            sections={this.state.section}
            renderItem={({item}) => 
            <View flexDirection='row'>
                <Text 
                onPress={() =>this.itemClick(item)}
                style={sectionListStyles.item}>{item.name}   {item.receiver} / {item.total}</Text>
                <Button
                  title ="Remove"
                  onPress={()=>this.itemRemoveClick(item)}
                ></Button>
                </View>
            }
            renderSectionHeader={({section}) => <Text style={sectionListStyles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
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