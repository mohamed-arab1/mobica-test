/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls, SoftShadows, } from "@react-three/drei";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRef } from "react";

// import image from "../assets/image.jpeg";
import icon from "../assets/icon.jpeg";
import Chair from "../components/Chair";
import mod1 from "../assets/Arco.glb";
import mod2 from "../assets/Arco2.glb";
import mod3 from "../assets/Arco3.glb";
import mod4 from "../assets/Arco4.glb";
import mod5 from "../assets/Arco5.glb";
import mod6 from "../assets/Arco6.glb";
import mod7 from "../assets/Arco7.glb";
import mod8 from "../assets/Arco8.glb";
import ProductSection from "../components/ProductSection";
import "../index.css"
const Product = () => {

  const [configure, setConfigure] = useState(true);
  const [version, setVersion] = useState(false);
  const [size, setSize] = useState(false);
  const [table, setTable] = useState(false);
  const [color, setColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#c4a98c");
  const [index, setIndex] = useState(1);
  const [path, setPath] = useState(mod3);
  // const colors = ["#c4a98c", "#7d7d7d", "#d4c455", "#5b5ea6", "#6da34d"];
  // const details = [
  //   { title: "Single", options: ["Single"] },
  //   { title: "REC", options: ["REC", "RLS", "LLS"] },
  //   { title: "Length", options: ["Length"] },
  //   { title: "Width", options: ["Width"] },
  //   { title: "Height / Depth", options: ["Height / Depth"] },
  //   { title: "Finished by", options: ["Finished by"] }
  // ];
  // const [openDetail, setOpenDetail] = useState(null);
  const sectionRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const handleSubmit = () => {
    if (comment.trim() === "") {
      alert("Comment cannot be empty!");
      return;
    }
    console.log("Submitted Comment:", comment);
    setComment("");
    setIsOpen(false);
  };
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  // useEffect(() => {
  //   switch (index) {
  //     case 1:
  //       setPath(mod8);
  //       break;
  //     case 2:
  //       setPath(mod2);
  //       break;
  //     case 3:
  //       setPath(mod3);
  //       break;
  //     case 4:
  //       setPath(mod4);
  //       break;
  //     default:
  //       setPath(mod8);
  //   }
  // }, [index]);


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
      <ProductSection sectionRef={sectionRef} scrollToSection={scrollToSection} />
      <div className="w-full max-w-8xl px-40 py-12 bg-[#F1F1F1] shadow-lg flex flex-col md:flex-row min-h-screen" id="product" ref={sectionRef}>
        <div className="w-full md:w-2/3 flex justify-center items-center relative">
          <div className="bg-white border border-gray-200  h-full w-full flex items-center justify-center">
            <Canvas gl={{ antialias: true }} shadows>
              <SoftShadows />
              <ambientLight intensity={0.5} />
              <directionalLight
                castShadow
                position={[12, 12, 12]}
                intensity={1.5}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <Chair color={selectedColor} path={path} />
              <OrbitControls />
              <EffectComposer>
                <SSAO />
                <Bloom intensity={1.0} luminanceThreshold={0.9} />
              </EffectComposer>
            </Canvas>
          </div>
          {/* <img src={icon} alt="AR-icons" className=" absolute bottom-[15%] right-[2%] " width={36} height={36} /> */}
        </div>
        {/* <div className="w-full md:w-1/4 p-6" >
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
        </div> */}
        {
          configure && (
            <div className="w-full md:w-1/3  p-6 bg-white  border border-gray-200 flex flex-col justify-between h-auto">
              <div className="flex flex-col gap-3">
                {/* Version */}
                <p className="text-gray-900 font-semibold hover:text-red-500 cursor-pointer" onClick={() => { setConfigure(false); setVersion(true); setSize(false); setTable(false); setColor(false) }}>
                  Version: <span className="font-normal">wood</span>
                </p>

                {/* Size */}
                <p className="text-gray-900 font-semibold hover:text-red-500 cursor-pointer mt-2" onClick={() => { setConfigure(false); setVersion(false); setSize(true); setTable(false); setColor(false) }}>
                  Size:{" "}
                  <span className="font-normal">H 740 x W 900 x L 2000 mm</span>
                </p>

                {/* Table Top */}
                <p className="text-gray-900 font-semibold hover:text-red-500 cursor-pointer mt-2" onClick={() => { setConfigure(false); setVersion(false); setSize(false); setTable(true); setColor(false) }}>
                  Table top:{" "}
                  <span className="font-normal">natural oak, solid, oiled</span>
                </p>

                {/* Base */}
                <div className="flex items-center mt-2 group cursor-pointer" onClick={() => { setConfigure(false); setVersion(false); setSize(false); setTable(false); setColor(true) }}>
                  <p className="text-gray-900 font-semibold group-hover:text-red-500 ">Base: </p>
                  <span className="ml-2 text-gray-900 font-normal group-hover:text-red-500">deep black</span>
                  <div className="ml-2 w-5 h-5 bg-black border border-gray-300 "></div>
                </div>
              </div>
              <div>
                {/* Availability & Delivery */}
                <div className="bg-gray-100 p-3 mt-6 text-sm text-gray-700">
                  <p className="flex items-center text-green-600">
                    ✔ Quickly available, Estimated delivery:
                  </p>
                  <p className="font-semibold">Friday, February 14 - Tuesday, February 25</p>
                </div>

                {/* Price */}
                <p className="mt-3 text-gray-900 text-lg font-semibold">
                  USD 7,730.00
                </p>
                <p className="text-gray-500 text-sm">
                  excl. sales tax, plus{" "}
                  <a href="#" className="underline text-gray-700">
                    costs of shipping
                  </a>
                </p>

                {/* Buttons */}
                <button className="w-full mt-4 bg-black text-white py-3 text-sm font-medium rounded-md hover:bg-gray-800 transition-all duration-300">
                  ADD TO CART
                </button>

                <button className="w-full mt-2 text-black text-sm font-medium py-2 hover:underline">
                  Save or Share
                </button>
                <button onClick={() => setIsOpen(true)} className="w-full mt-2 text-black text-sm font-medium hover:underline cursor-pointer">
                  Add comment
                </button>
              </div>
            </div>
          )
        }
        {
          version && (
            <div className="w-full md:w-1/3  p-6 bg-white  border border-gray-200 flex flex-col justify-between h-auto">
              <div className="flex flex-col gap-3">
                {/* Version */}
                <div className="w-1/2 flex justify-between items-center group" onClick={() => { setConfigure(true); setVersion(false) }}>
                  <MdKeyboardArrowLeft className="text-3xl group-hover:text-red-500 cursor-pointer" />
                  <p className="text-gray-900 font-semibold group-hover:text-red-500 cursor-pointer" >
                    Version
                  </p>
                </div>
                <p className="border-t pl-1 pt-1 border-zinc-300 font-light cursor-pointer hover:text-red-500" onClick={() => { setPath(mod1); setConfigure(true); setVersion(false) }}>HPL (High Pressure Laminate)</p>
                <p className="border-t pl-1 pt-1 border-zinc-300 font-light cursor-pointer hover:text-red-500" onClick={() => { setPath(mod2); setConfigure(true); setVersion(false) }}>Wood</p>
              </div>
              <div>
                {/* Availability & Delivery */}
                <div className="bg-gray-100 p-3 mt-6 text-sm text-gray-700">
                  <p className="flex items-center text-green-600">
                    ✔ Quickly available, Estimated delivery:
                  </p>
                  <p className="font-semibold">Friday, February 14 - Tuesday, February 25</p>
                </div>

                {/* Price */}
                <p className="mt-3 text-gray-900 text-lg font-semibold">
                  USD 7,730.00
                </p>
                <p className="text-gray-500 text-sm">
                  excl. sales tax, plus{" "}
                  <a href="#" className="underline text-gray-700">
                    costs of shipping
                  </a>
                </p>

                {/* Buttons */}
                <button className="w-full mt-4 bg-black text-white py-3 text-sm font-medium rounded-md hover:bg-gray-800 transition-all duration-300">
                  ADD TO CART
                </button>

                <button className="w-full mt-2 text-black text-sm font-medium py-2 hover:underline">
                  Save or Share
                </button>
                <button onClick={() => setIsOpen(true)} className="w-full mt-2 text-black text-sm font-medium hover:underline cursor-pointer">
                  Add comment
                </button>
              </div>
            </div>
          )
        }
        {
          size && (
            <div className="w-full md:w-1/3  p-6 bg-white  border border-gray-200 flex flex-col justify-between h-auto">
              <div className="flex flex-col gap-3">
                {/* Version */}
                <div className="w-1/2 flex justify-between items-center group" onClick={() => { setConfigure(true); setVersion(false); setSize(false) }}>
                  <MdKeyboardArrowLeft className="text-3xl group-hover:text-red-500 cursor-pointer" />
                  <p className="text-gray-900 font-semibold group-hover:text-red-500 cursor-pointer" >
                    Size
                  </p>
                </div>
                <p className="border-t pl-1 pt-1 border-zinc-300 font-light cursor-pointer hover:text-red-500" onClick={() => { setPath(mod3); setConfigure(true); setSize(false) }}>H 740 x W 900 x L 1800  mm</p>
                <p className="border-t pl-1 pt-1 border-zinc-300 font-light cursor-pointer hover:text-red-500" onClick={() => { setPath(mod8); setConfigure(true); setSize(false) }}>H 740 x W 900 x L 2400  mm</p>
              </div>
              <div>
                {/* Availability & Delivery */}
                <div className="bg-gray-100 p-3 mt-6 text-sm text-gray-700">
                  <p className="flex items-center text-green-600">
                    ✔ Quickly available, Estimated delivery:
                  </p>
                  <p className="font-semibold">Friday, February 14 - Tuesday, February 25</p>
                </div>

                {/* Price */}
                <p className="mt-3 text-gray-900 text-lg font-semibold">
                  USD 7,730.00
                </p>
                <p className="text-gray-500 text-sm">
                  excl. sales tax, plus{" "}
                  <a href="#" className="underline text-gray-700">
                    costs of shipping
                  </a>
                </p>

                {/* Buttons */}
                <button className="w-full mt-4 bg-black text-white py-3 text-sm font-medium rounded-md hover:bg-gray-800 transition-all duration-300">
                  ADD TO CART
                </button>

                <button className="w-full mt-2 text-black text-sm font-medium py-2 hover:underline">
                  Save or Share
                </button>
                <button onClick={() => setIsOpen(true)} className="w-full mt-2 text-black text-sm font-medium hover:underline cursor-pointer">
                  Add comment
                </button>
              </div>
            </div>
          )
        }
        {
          table && (
            <div className="w-full md:w-1/3  p-6 bg-white  border border-gray-200 flex flex-col justify-between h-auto">
              <div className="flex flex-col gap-3">
                {/* Version */}
                <div className="w-1/2 flex justify-between items-center group" onClick={() => { setConfigure(true); setVersion(false); setSize(false); setTable(false) }}>
                  <MdKeyboardArrowLeft className="text-3xl group-hover:text-red-500 cursor-pointer" />
                  <p className="text-gray-900 font-semibold group-hover:text-red-500 cursor-pointer" >
                    Table
                  </p>
                </div>
                <p className="border-t pl-1 pt-1 border-zinc-300 font-light cursor-pointer hover:text-red-500" onClick={() => { setPath(mod4); setConfigure(true); setTable(false) }}>veneer nat. oak protect. varn.</p>
                <p className="border-t pl-1 pt-1 border-zinc-300 font-light cursor-pointer hover:text-red-500" onClick={() => { setPath(mod5); setConfigure(true); setTable(false) }}>dark solid oak, prot. varnish</p>
                <p className="border-t pl-1 pt-1 border-zinc-300 font-light cursor-pointer hover:text-red-500" onClick={() => { setPath(mod6); setConfigure(true); setTable(false) }}>American walnut, solid, oiled</p>
              </div>
              <div>
                {/* Availability & Delivery */}
                <div className="bg-gray-100 p-3 mt-6 text-sm text-gray-700">
                  <p className="flex items-center text-green-600">
                    ✔ Quickly available, Estimated delivery:
                  </p>
                  <p className="font-semibold">Friday, February 14 - Tuesday, February 25</p>
                </div>

                {/* Price */}
                <p className="mt-3 text-gray-900 text-lg font-semibold">
                  USD 7,730.00
                </p>
                <p className="text-gray-500 text-sm">
                  excl. sales tax, plus{" "}
                  <a href="#" className="underline text-gray-700">
                    costs of shipping
                  </a>
                </p>

                {/* Buttons */}
                <button className="w-full mt-4 bg-black text-white py-3 text-sm font-medium rounded-md hover:bg-gray-800 transition-all duration-300">
                  ADD TO CART
                </button>

                <button className="w-full mt-2 text-black text-sm font-medium py-2 hover:underline">
                  Save or Share
                </button>
                <button onClick={() => setIsOpen(true)} className="w-full mt-2 text-black text-sm font-medium hover:underline cursor-pointer">
                  Add comment
                </button>
              </div>
            </div>
          )
        }
        {
          color && (
            <div className="w-full md:w-1/3  p-6 bg-white  border border-gray-200 flex flex-col justify-between h-auto">
              <div className="flex flex-col gap-3">
                {/* Version */}
                <div className="w-1/2 flex justify-between items-center group" onClick={() => { setConfigure(true); setVersion(false); setSize(false); setTable(false); setColor(false) }}>
                  <MdKeyboardArrowLeft className="text-3xl group-hover:text-red-500 cursor-pointer" />
                  <p className="text-gray-900 font-semibold group-hover:text-red-500 cursor-pointer" >
                    Color
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center space-y-2 border border-zinc-300 py-2" onClick={() => { setPath(mod2); setConfigure(true); setColor(false) }}>
                    <div className="w-20 h-20 bg-[#9D2933] border border-gray-300 shadow-lg"></div>
                    <p className="text-sm font-medium text-gray-700">Japanese red</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border border-zinc-300 py-2" onClick={() => { setPath(mod3); setConfigure(true); setColor(false) }}>
                    <div className="w-20 h-20 bg-black border border-gray-300 shadow-lg"></div>
                    <p className="text-sm font-medium text-gray-700">deep black</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border border-zinc-300 py-2" onClick={() => { setPath(mod4); setConfigure(true); setColor(false) }}>
                    <div className="w-20 h-20 bg-green-400 border border-gray-300 shadow-lg"></div>
                    <p className="text-sm font-medium text-gray-700">green</p>
                  </div>
                </div>
              </div>
              <div>
                {/* Availability & Delivery */}
                <div className="bg-gray-100 p-3 mt-6 text-sm text-gray-700">
                  <p className="flex items-center text-green-600">
                    ✔ Quickly available, Estimated delivery:
                  </p>
                  <p className="font-semibold">Friday, February 14 - Tuesday, February 25</p>
                </div>

                {/* Price */}
                <p className="mt-3 text-gray-900 text-lg font-semibold">
                  USD 7,730.00
                </p>
                <p className="text-gray-500 text-sm">
                  excl. sales tax, plus{" "}
                  <a href="#" className="underline text-gray-700">
                    costs of shipping
                  </a>
                </p>

                {/* Buttons */}
                <button className="w-full mt-4 bg-black text-white py-3 text-sm font-medium rounded-md hover:bg-gray-800 transition-all duration-300">
                  ADD TO CART
                </button>

                <button className="w-full mt-2 text-black text-sm font-medium py-2 hover:underline">
                  Save or Share
                </button>
                <button onClick={() => setIsOpen(true)} className="w-full mt-2 text-black text-sm font-medium hover:underline cursor-pointer">
                  Add comment
                </button>
              </div>
            </div>
          )
        }
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000075] bg-opacity-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Add a Comment</h2>

            {/* Text Area */}
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            {/* Buttons */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product