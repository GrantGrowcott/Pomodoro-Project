import { View,Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';


const Timer = () => {
   const [time, setTime] = useState(false)

   function handleTime (){
      setTime(!time)
   }

    return ( 
        <View style = {styles.container}>
          <View style = {[styles.timerContainer, styles.timerMargin]}> 
           <TouchableOpacity style = {[styles.timeButton]}>
               <Text>Short Break</Text>
           </TouchableOpacity> 
           <TouchableOpacity style = {[styles.timeButton]}>
               <Text>Focus</Text>
           </TouchableOpacity>
           <TouchableOpacity style = {[styles.timeButton]}>
               <Text>Long Break</Text>
           </TouchableOpacity>  
         </View>
            <Text>00:00:00</Text>
          <View style = {styles.timerContainer}>
            <TouchableOpacity style = {[styles.button, styles.startColor]} onPress = {handleTime}>
            {time ? (
            <Icon name="pause" size={30} color="black" />
          ) : (
            <Icon name="play" size={30} color="black" />
          )}
            </TouchableOpacity>
            <View style = {styles.gap}/>
            <TouchableOpacity style = {[styles.button, styles.stopColor]}>
            <Icon name="refresh" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
     );
}
 
export default Timer;