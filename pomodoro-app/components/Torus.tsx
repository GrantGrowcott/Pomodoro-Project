import { Mesh } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../assets/redux/useApp";
import { arcIncrement } from "../assets/redux/slices/TorusArc_Slice";
import React from "react";

interface TorusProps {
  arc: number;
}

const Torus = ({ arc }: TorusProps) => {
  const meshRef = useRef<Mesh>([]);
  const dispatch = useDispatch();
  const torusArc = useAppSelector((state) => state.torusArc.value);

  const phaseCheck = (arc: number) => {
    switch (arc) {
      case 1:
        return Math.PI * 0.5;
      case 2:
        return Math.PI * 1.0;
      case 3:
        return Math.PI * 1.5;
      case 4:
        return Math.PI * 2;
    }
  };

  const onClickHandler = () => {
    if (torusArc < 4) {
      dispatch(arcIncrement());
    }
  };

  const rotate = () => {
    useFrame((state, delta) => {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.z += delta * 0.2;
    });
  };

  // useFrames calls

  rotate();

  return (
    <mesh
      castShadow={true}
      receiveShadow={true}
      ref={meshRef}
      position={[0, 0, -10]}
      // onClick={() => onClickHandler()}
    >
      <torusGeometry args={[5, 1, 16, 32, phaseCheck(arc)]} />
      <meshStandardMaterial color="#00cc66" />
    </mesh>
  );
};

export default Torus;
