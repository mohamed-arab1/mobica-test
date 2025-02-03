/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import mod1 from "../assets/Arco.glb"
import { Canvas } from "@react-three/fiber";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import image from "../assets/image.jpeg";
import icon from "../assets/icon.jpeg";
import Chair from "../components/Chair";

const Product = () => {
  const [selectedColor, setSelectedColor] = useState("#c4a98c");
  const colors = ["#c4a98c", "#7d7d7d", "#d4c455", "#5b5ea6", "#6da34d"];
  console.log(selectedColor)
  const details = [
    { title: "Single", options: [] },
    { title: "REC", options: ["REC", "RLS", "LLS"] },
    { title: "Length", options: [] },
    { title: "Width", options: [] },
    { title: "Height / Depth", options: [] },
    { title: "Finished by", options: [] }
  ];
  const [openDetail, setOpenDetail] = useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="w-full max-w-8xl p-6 bg-[#F1F1F1] shadow-lg rounded-xl flex">
        <div className="w-1/2 flex justify-center items-center relative">
        <div className="bg-gray-200 h-96 w-full flex items-center justify-center">
            <Canvas camera={{ position: [0, 2, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <Chair color={selectedColor} path={mod1}  />
              <OrbitControls enableZoom={true} />
            </Canvas>
          </div>
          <img src={icon} alt="AR-icons" className=" absolute bottom-[2%] right-[2%] " width={36} height={36} />
        </div>
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold">Furniture</h2>
          <p className="text-gray-600">Arm Chair</p>
          <div className="flex items-center gap-2 my-4">
            {colors.map((color, index) => (
              <div key={index} className={`w-8 h-8 rounded-full ${selectedColor === color ? `bg-white border-[${selectedColor}] border-2` : `bg-[${color}]`} flex justify-center items-center `}>
                <span
                  className={`w-6 h-6 rounded-full`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {details.map((detail, index) => (
              <div key={index}>
                <div
                  className="flex justify-between items-center p-3 bg-white rounded-lg cursor-pointer"
                  onClick={() => setOpenDetail(openDetail === index ? null : index)}
                >
                  <span>{detail.title}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transform transition-transform ${openDetail === index ? "rotate-180" : ""}`} />
                </div>
                <AnimatePresence>
                  {openDetail === index && detail.options.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white rounded-lg overflow-hidden mt-2 p-5"
                    >
                      {detail.options.map((option, idx) => (
                        <div key={idx} className={`p-[10px] ${idx === 0 ? "bg-[#F1F1F1] font-[600px] rounded-[10px]" : "text-gray-600"}`}>{option} </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product