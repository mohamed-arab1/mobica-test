/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

// import image from "../assets/image.jpeg";
import icon from "../assets/icon.jpeg";
import arrow from "../assets/arrow.jpeg";
import Chair from "../components/Chair";
import mod1 from "../assets/Arco.glb";
import mod2 from "../assets/Arco2.glb";
import mod3 from "../assets/Arco3.glb";
import mod4 from "../assets/Arco4.glb";
import mod5 from "../assets/Arco5.glb";
import mod6 from "../assets/Arco6.glb";

const Product = () => {
  const [selectedColor, setSelectedColor] = useState("#c4a98c");
  const [index, setIndex] = useState(1);
  const [path, setPath] = useState(1);
  const colors = ["#c4a98c", "#7d7d7d", "#d4c455", "#5b5ea6", "#6da34d"];
  const details = [
    { title: "Single", options: ["Single"] },
    { title: "REC", options: ["REC", "RLS", "LLS"] },
    { title: "Length", options: ["Length"] },
    { title: "Width", options: ["Width"] },
    { title: "Height / Depth", options: ["Height / Depth"] },
    { title: "Finished by", options: ["Finished by"] }
  ];
  const [openDetail, setOpenDetail] = useState(null);

  useEffect(() => {
    switch (index) {
      case 1:
        setPath(mod1);
        break;
      case 2:
        setPath(mod2);
        break;
      case 3:
        setPath(mod3);
        break;
      case 4:
        setPath(mod4);
        break;
      default:
        setPath(mod1);
    }
  }, [index]);

  return (
    <div className="flex-col justify-center items-center min-h-screen bg-white p-6">
      <div className="w-full mb-4">
        <Link to="/">
          <span className="bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center transition-shadow duration-200 shadow-sm hover:shadow-md text-[#999999]">
            <MdKeyboardArrowLeft className="text-3xl" />
            {/* <img src={arrow} alt="arrow-icon" /> */}
          </span> 
        </Link>
      </div>
      <div className="w-full max-w-8xl p-6 bg-[#F1F1F1] shadow-lg rounded-xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <div className="bg-white h-96 w-full flex items-center justify-center rounded-2xl">
            <Canvas camera={{ position: [0, 2, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <Chair color={selectedColor} path={path || mod1} />
              <OrbitControls enableZoom={true} />
            </Canvas>
          </div>
          <img src={icon} alt="AR-icons" className=" absolute bottom-[15%] right-[2%] " width={36} height={36} />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold">Furniture</h2>
          <p className="text-gray-600">Arm Chair</p>
          <div className="flex items-center gap-2 my-4">
            {colors.map((color, index) => (
              <div key={index} className={`w-8 h-8 rounded-full ${selectedColor === color ? `bg-[#F1F1F1] border-2` : `bg-[${color}]`} flex justify-center items-center `} style={{ borderColor: `${selectedColor === color ? selectedColor : "none"}` }}>
                <span
                  className={`w-6 h-6 rounded-full cursor-pointer`}
                  style={{ backgroundColor: color }}
                  onClick={() => { setSelectedColor(color); setIndex(index); }}
                ></span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {details.map((detail, index) => (
              <div key={index}>
                <div
                  className="relative flex justify-between items-center p-3 bg-white rounded-lg cursor-pointer"
                  onClick={() => setOpenDetail(openDetail === index ? null : index)}
                >
                  <span>{detail.title}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transform transition-transform ${openDetail === index ? "rotate-180" : ""}`} />
                </div>
                <div className="relative">
                  <AnimatePresence>
                    {openDetail === index && detail.options.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="z-50 absolute left-0 top-0 bg-white rounded-lg overflow-hidden mt-2 p-5 w-full"
                      >
                        {detail.options.map((option, idx) => (
                          <div key={idx} className={`p-[10px] ${idx === 0 ? "bg-[#F1F1F1] font-[600px] rounded-[10px]" : "text-gray-600"}`}>{option} </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product