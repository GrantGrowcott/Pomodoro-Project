import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCategory,
  setDescription,
  setTitle,
  setStoredNotes,
} from "../redux/slices/Notes_Slice";
import { RootState } from "../redux/Store";
import { Note } from "../redux/slices/Notes_Slice";
import { dropdownValues } from "../constants";

const Task = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState(dropdownValues);

  const dispatch = useDispatch();
  const task = useSelector((state: RootState) => state.task);
  const { selectedCategory, description, title } = task;

  const handleSubmit = async (newTitle: string, newDescription: string) => {
    const newNote: Note = {
      title: newTitle,
      description: newDescription,
      category: selectedCategory,
    };

    try {
      const storedData = await AsyncStorage.getItem("notes");
      let existingNotes: Note[] = [];

      if (storedData !== null) {
        existingNotes = JSON.parse(storedData);
      }

      const updatedNotes = [...existingNotes, newNote];
      dispatch(setStoredNotes(updatedNotes));

      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

      dispatch(setDescription(""));
      dispatch(setTitle(""));
      dispatch(setSelectedCategory("General"));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  useEffect(() => {
    const fetchStoredNotes = async () => {
      try {
        const storedData = await AsyncStorage.getItem("notes");
        if (storedData !== null) {
          const parsedNotes: Note[] = JSON.parse(storedData);
          dispatch(setStoredNotes(parsedNotes));
        }
      } catch (error) {
        console.error("Error fetching stored notes:", error);
      }
    };

    fetchStoredNotes();
  }, []);

  return (
    <View style={styles.taskContainer}>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          style={[styles.customDropdownContainer, styles.dropdownStyle]}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="General"
          dropDownContainerStyle={styles.customDropdownContainer}
          onChangeValue={(itemValue) =>
            dispatch(setSelectedCategory(itemValue || ""))
          }
        />
        <View style={styles.textInputContainer}>
          <TextInput
            value={title}
            onChangeText={(newText) => dispatch(setTitle(newText))}
            style={[styles.textInput, styles.titleInput]}
            placeholder="Title"
          />
          <TextInput
            style={[styles.textInput, styles.taskInput]}
            value={description}
            onChangeText={(newText) => dispatch(setDescription(newText))}
            placeholder="Notes go here"
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleSubmit(title, description)}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Task;
