import React, { Component } from "react";
import { StatusBar,FlatList, View,StyleSheet,Text, Button, TextInput } from "react-native";


const TAG = "FriendDebtList"
const REPAY_BUTTON=0;
const ALL_REPAY_BUTTON=1;
function printLog (message)
{
    console.log (TAG,message);
}

function isNumeric(num){
  
    return !isNaN(num)
  }
export class FriendDebtList extends Component{
    constructor(props)
    {
        super(props)

    }
    handleRepayment =(text,name)=>{
        printLog (text+" "+name)
        


    }
    handleButtonPress =(item,buttonId)=>{
        console.log(buttonId)
        switch(buttonId)
        {
            case REPAY_BUTTON:
                this.props.debtChangeCallback(item)
                break;
            case ALL_REPAY_BUTTON:
                item['Repayment']=-item['value'];
                this.props.debtChangeCallback(item)
                break;
            default:
                break;
        }
 
        
    }

    render(){
        return (
            <View style={styles.container}>

                <FlatList data={this.props.friendList}
                    renderItem={({item}) => 
                    <View flexDirection='row' style={{backgroundColor:item['value']>=0? '#0f0':'#f00'}}>
                        <Text>{item['name']} {item['value']}</Text>
                        <TextInput style={styles.input} onChangeText={(text)=>{
                            item['Repayment']=isNumeric(text)?text:0
                    }}></TextInput>
                        <Button title ="償還" onPress={()=>this.handleButtonPress(item,REPAY_BUTTON)}></Button>
                        <Button title ="全數償還"  onPress={()=>this.handleButtonPress(item,ALL_REPAY_BUTTON)} ></Button> 
                    </View>
                }
                ></FlatList>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 0,
        minHeight: 70,
        flexDirection: 'row',
        
    
    },  item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      input: {
        height: 40,
        width:100,
        margin: 12,
        borderWidth: 1,
      },
    
  });