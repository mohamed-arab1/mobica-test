/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import mod1 from "../assets/Arco.glb"

const Chair = ({ color, size = 1}) => {

//   try {
    const { scene } = useGLTF(mod1);
    console.log(scene);

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color);
      }
    });

    return <primitive object={scene} scale={size} />;
//   } catch (error) {
//     console.error("Error loading model:", error);
//     return <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="red" />
//     </mesh>; // Display a placeholder box if loading fails
//   }
};

export default Chair;