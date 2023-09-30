import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Task from './assets/components/task';
import Tree from './assets/components/tree';
import Timer from './assets/components/timer';
import { styles } from './assets/styles/styles';


export default function App() {
  return (
    <View style={styles.container}>
      <Task/>
      <Tree/>
      <Timer/>
      <StatusBar style="auto" />
    </View>
  );
}
