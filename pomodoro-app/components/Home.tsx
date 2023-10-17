import { StatusBar } from "expo-status-bar";
import {View, TouchableOpacity} from "react-native";
import { Provider } from "react-redux";
import { store } from "../assets/redux/Store";
import TorusDisplay from "../components/TorusDisplay";
import Timer from "../components/Timer";
import { styles } from "../styles/styles";
import React from "react";
import { PomodoroSession } from "../backend/pomodoro";
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import { icon } from "../constants";


type HomeProps = {
    navigation: any; 
  };

const Home: React.FC<HomeProps> = ({navigation}) => {
    const pomodoroSession = new PomodoroSession(25, 5, 15);
    return (
      <Provider store={store}>
      <View style = {styles.homeContainer}>
        <View style={styles.canvasContainer}>
          <TorusDisplay />
        </View> 
        <View style={styles.container}>
          <Timer pomodoroSession={pomodoroSession} />
          <StatusBar style="auto" />
        </View>
        <View style={styles.navbar}>
        <View style={styles.row}>
          <Icon name="home" size={icon.size} color={icon.color} />
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Notes')}>
            <Icons name="sticky-note-o" size={icon.size} color={icon.color} />
          </TouchableOpacity>
        </View>
       </View>
      </View>
      </Provider>  
     );
}
 
export default Home;