import { StyleSheet } from "react-native";

export const style = StyleSheet.create({

    // User Item Components css

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000080',
      },

    ListHeader:{
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 25,
        marginBottom: 25,
        marginTop: 15,
        color: 'white',
    },
    loginButton: {
        width: "80%",
        borderRadius: 25,
        minWidth : 250,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "purple",
      },
    ListContainer:{
        flex: 4,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 10,
        backgroundColor: 'white',
    },
    
      show:{  
        flexDirection:"row",
        color:'yellow',
        justifyContent:'space-evenly',
        width: "90%",
        height:60,
        padding:20,
        borderRadius:10,
        backgroundColor: "white",
        shadowColor:'gray',
        marginTop:-30,
        shadowColor: '#000000',
      },
      showText:{
        fontWeight:'bold',
        fontSize:17,
        padding:10
      },
      AddUserButton:{
        flexDirection: "row",
        alignContent: "flex-end",
        marginBottom:20,
        marginTop:10,
        justifyContent:"center"
    },
      
})