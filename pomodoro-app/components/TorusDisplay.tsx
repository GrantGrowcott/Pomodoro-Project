import { View } from "react-native";
import { styles } from "../styles/styles";
import { Canvas } from "@react-three/fiber";
import Torus from "./Torus";
import React from "react";

const TorusDisplay = () => {
  const torusSpawn = () => {
    return <Torus />;
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
