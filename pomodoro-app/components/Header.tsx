import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';


const Header = () => {
    return (
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={{fontFamily: 'OpenSans_800ExtraBold_Italic', fontSize: 30, color:"#FFF"}}>Pomodoro</Text>
          </View>
        </View>
      );
}
 
export default Header;