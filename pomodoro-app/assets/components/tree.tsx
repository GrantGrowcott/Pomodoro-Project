import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import { useAppSelector } from "../redux/useApp";
import { useDispatch } from "react-redux";

const Tree = () => {
  // Dispatch and treePhase will be used later in conjunction
  // with React3F to display a 3D model of the tree phases.
  // Sapling - Plant - Tree
  const dispatch = useDispatch();
  const treePhase = useAppSelector((state) => state.treePhase.value);

  // Keepin' it text based for now.
  const treePhaseCheck = (phaseValue: number) => {
    switch (phaseValue) {
      case 1:
        return <Text>You have a sapling.</Text>;
      case 2:
        return <Text>You have a plant.</Text>;
      case 3:
        return <Text>You have a tree.</Text>;
    }
  };

  return <View style={styles.taskContainer}>{treePhaseCheck(treePhase)}</View>;
};

export default Tree;
