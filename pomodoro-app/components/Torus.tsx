import { Mesh } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../assets/redux/useApp";
import { setIndex } from "../assets/redux/slices/TorusArc_Slice";
import React from "react";

const Torus = () => {
  const meshRef = useRef<Mesh>([]);
  const dispatch = useDispatch();
  const focusDuration = useAppSelector(
    (state) => state.session.duration[0] * 60
  );

  const phaseCheck = (arc: number) => {
    switch (arc) {
      case 1:
        return Math.PI * 2;
      case 2:
        return Math.PI * 0.5;
      case 3:
        return Math.PI * 1;
      case 4:
        return Math.PI * 1.5;
      case 5:
        return Math.PI * 2;
    }
  };

  const calculateIncrementIndex = () => {
    dispatch(setIndex((Math.PI * 2) / (focusDuration + 1)));
  };

  useEffect(() => {
    calculateIncrementIndex();
  }, []);

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
    >
      <torusGeometry
        args={[5, 1.5, 16, 32, useAppSelector((state) => state.torusArc.angle)]}
      />
      <meshStandardMaterial color="#ff4d4d" />
    </mesh>
  );
};

export default Torus;
