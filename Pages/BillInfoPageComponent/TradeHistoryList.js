
import React,{ Component } from "react";
import { StatusBar,FlatList, StyleSheet,View ,Text} from "react-native";

const TAG = "TradeHistoryList"
function printLog (message)
{
    console.log (TAG,message);
}


export class TradeHistoryList extends Component{
    constructor(props)
    {
        super(props)
        
     
        
    }

    render(){
        return (
            <View style={styles.container}>
                <FlatList data={this.props.data}
                    renderItem={({item}) => 
                        <Text>From {item['from']} To {item['to']} {item['value']}</Text> 
                }
                ></FlatList>
            </View>
        );

    };




}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 0,
        minHeight: 70,
        flexDirection: 'row',
        
    },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    },
    
  });