/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";

import { useEffect, useState } from "react";

const Chair = ({ color, size = 1, path}) => {
  // try {
    const { scene } = useGLTF(path);

    scene.traverse((child) => {
      // if (child.isMesh) {
      //   child.material.color.set(color);
      // }
    });

    return <primitive object={scene} scale={2} />;
  // } catch (error) {
  //   console.error("Error loading model:", error);
  //   return <mesh>
  //     <boxGeometry args={[1, 1, 1]} />
  //     <meshStandardMaterial color="red" />
  //   </mesh>; // Display a placeholder box if loading fails
  // }
};

export default Chair;