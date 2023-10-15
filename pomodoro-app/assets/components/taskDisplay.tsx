import { useSelector, useDispatch } from 'react-redux';
import {setStoredNotes,editNote} from '../redux/slices/grant_Slice';
import { RootState } from '../redux/Store';
import React from 'react';
import { View, TextInput, Text,FlatList, TouchableOpacity} from 'react-native';
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';



const TaskDisplay = () => {

  const dispatch = useDispatch();
  const task = useSelector((state:RootState) => state.task)

  const {storedNotes } = task


  const deleteData = async (titleToDelete: string) => {
    try {
      const updatedNotes = storedNotes.filter((note) => note.title !== titleToDelete);
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      dispatch(setStoredNotes(updatedNotes));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNoteField = (noteIndex: number, text: string, field: 'title' | 'description') => {
    const updatedNote = { ...storedNotes[noteIndex] };
    updatedNote[field] = text;
    dispatch(editNote({ index: noteIndex, updatedNote }));
    const updatedNotes = [...storedNotes];
    updatedNotes[noteIndex] = updatedNote;
  
    AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
      .then(() => {
      })
      .catch((error) => {
        console.error('Error editing note:', error);
      });
  };
    
    
    return (
        <View style={{ width: '100%', flex : 1}}>
        <FlatList
          data={storedNotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.noteContainer}>
              <Text style={{...styles.textContainer, borderRadius: 30, borderWidth: 1, borderColor: "black", width: "30%", alignSelf: "center", marginTop: 0 }}> {item.category}</Text>
              <TextInput
                style={{...styles.textContainer, fontWeight: 'bold'}}
                value={item.title}
                onChangeText={(text) => editNoteField(index, text, 'title')
              }
              />
              <TextInput
                style={{...styles.textContainer, marginTop: 40}}
                value={item.description}
                onChangeText={(text) => editNoteField(index, text, 'description')}
              />
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteData(item.title)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      );
}
 
export default TaskDisplay;