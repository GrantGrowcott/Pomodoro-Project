import { View, Text } from "react-native";
import { styles } from "../styles/styles";
import { useAppSelector } from "../redux/useApp";
import { useDispatch } from "react-redux";
import { Canvas, useThree } from "@react-three/fiber";
import Torus from "./Torus";

const TorusDisplay = () => {
  // No more Tree - Torus is the way now.
  const dispatch = useDispatch();
  const torusArc = useAppSelector((state) => state.torusArc.value);

  const torusSpawn = () => {
    console.log("Torus spawning");

    return <Torus arc={torusArc} />;
  };

  return (
    <>
      <View style={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={2} />
          <pointLight position={[0, 0, 10]} intensity={5} />
          {torusSpawn()}
        </Canvas>
      </View>
    </>
  );
};

export default TorusDisplay;
