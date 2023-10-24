import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, TextInput, Switch } from "react-native";
import { styles } from "../styles/styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { iconSize } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector} from "react-redux";
import {setFocus, setShortBreak, setLongBreak } from "../redux/slices/Session_Slice";
import { RootState } from "../redux/Store";
import { colors } from "../constants";

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const time = useSelector((state: RootState) => state.session);
  const { duration} = time;
  

  const updateSetting = (key: string, value: number) => {
    switch (key) {
      case "focus":
        dispatch(setFocus(value))
        break;
      case "shortBreak":
        dispatch(setShortBreak(value));
        break;
      case "longBreak":
        dispatch(setLongBreak(value));
        break;
      default:
        break;
    }
  };

  const handleText = (key: string, value: string) => {
    const numericValue = value === '' || isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
    updateSetting(key, numericValue);
  }
    
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.header}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.outerContainer}>
                <Text style={{ ...styles.modalText, fontWeight: 'bold' }}>Settings</Text>
              </View>
              <View style={styles.outerContainer}>
                <Text style={styles.bottomGap}>Focus Time:</Text>
                <TextInput
                  style={[styles.modalInput, styles.bottomGap]}
                  keyboardType="numeric"
                  onChangeText={(text) => handleText("focus", text)}
                  value={duration[0].toString()}
                ></TextInput>
              </View>
              <View style={styles.outerContainer}>
                <Text style={styles.bottomGap}>Short Break:</Text>
                <TextInput
                  style={[styles.modalInput, styles.bottomGap]}
                  keyboardType="numeric"
                  onChangeText={(text) => handleText("shortBreak", text)}
                  value={duration[1].toString()}
                ></TextInput>
              </View>
              <View style={styles.outerContainer}>
                <Text style={styles.bottomGap}>Long Break:</Text>
                <TextInput
                  style={[styles.modalInput, styles.bottomGap]}
                  keyboardType="numeric"
                  onChangeText={(text) => handleText("longBreak", text)}
                  value={duration[2].toString()}
                ></TextInput>
              </View>
              <TouchableOpacity>
                <Text>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <AntDesign name="closecircle" size={iconSize.size} color= {colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.titleContainer}>
        <Text
          style={{
            fontFamily: "OpenSans_800ExtraBold_Italic",
            fontSize: 30,
            color: colors.white,
          }}
        >
          Pomodoro
        </Text>
      </View>
      <View style={styles.ellipsisContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="ellipsis-vertical" size={iconSize.size} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
