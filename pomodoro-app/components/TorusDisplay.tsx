import { View } from "react-native";
import { styles } from "../styles/styles";
import { Canvas } from "@react-three/fiber";
import Torus from "./Torus";
import React from "react";

const TorusDisplay = () => {
  // No more Tree - Torus is the way now.
  // Unknown knowledge is needed to import 3D assets using React Native/Expo.
  // This will eventually be implemented as a tree with phases/animations.
  // For now, an instanced TorusGeometry within Canvas will be used as a placeholder.

  const torusSpawn = () => {
    console.log("Torus spawning");

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
