import { View, TextInput, Text } from 'react-native';
import { useState } from 'react';
import { styles } from '../styles/styles';
import DropDownPicker from 'react-native-dropdown-picker';


const Task = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ]);



    return (
        <View style = {styles.taskContainer}>
            <Text style = {styles.focusFont}> What's your focus?</Text>
            <DropDownPicker
                style = {styles.dropdownStyle}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="General"
                 
            />
            <TextInput style = {styles.taskInput} placeholder='Task'></TextInput>
        </View>
      );
}
 
export default Task;