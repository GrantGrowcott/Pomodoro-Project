import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal, TextInput } from "react-native";
import { styles } from "../styles/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { iconSize } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../redux/useApp";
import Slider from "react-native-a11y-slider";
import {
  setFocus,
  setShortBreak,
  setLongBreak,
} from "../redux/slices/Session_Slice";
import { colors } from "../constants";

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { duration } = useAppSelector((state) => state.session);

  // Local Storage for the sliders value
  const sliders = {
    focus: duration[0],
    short: duration[1],
    long: duration[2],
  };

  const handleSaveButton = () => {
    dispatch(setFocus(sliders.focus));
    dispatch(setShortBreak(sliders.short));
    dispatch(setLongBreak(sliders.long));
  };

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
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.outerContainer}>
                <Text style={{ ...styles.modalText, fontWeight: "bold" }}>
                  Settings
                </Text>
              </View>
              <View style={styles.outerContainer}>
                <Text style={styles.bottomGap}>Focus Time (minutes):</Text>
                <Slider
                  min={5}
                  max={120}
                  increment={5}
                  values={[sliders.focus]}
                  onChange={(value: number[]) => (sliders.focus = value[0])}
                />
              </View>
              <View style={styles.outerContainer}>
                <Text style={styles.bottomGap}>Short Break (minutes):</Text>
                <Slider
                  min={1}
                  max={30}
                  increment={1}
                  values={[sliders.short]}
                  onChange={(value: number[]) => (sliders.short = value[0])}
                />
              </View>
              <View style={styles.outerContainer}>
                <Text style={styles.bottomGap}>Long Break (minutes):</Text>
                <Slider
                  min={5}
                  max={60}
                  increment={5}
                  values={[sliders.long]}
                  onChange={(value: number[]) => (sliders.long = value[0])}
                />
              </View>
              <TouchableOpacity>
                <Text
                  style={styles.timeButton}
                  onPress={() => handleSaveButton()}
                >
                  Save Settings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <AntDesign
                  name="closecircle"
                  size={iconSize.size}
                  color={colors.black}
                />
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
          <Icon
            name="ellipsis-vertical"
            size={iconSize.size}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
