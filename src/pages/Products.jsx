import { Link } from "react-router-dom"
import { GoArrowUpRight } from "react-icons/go";
import image from "../assets/image1.jpeg";
import icon from "../assets/icon.jpeg";
import {data} from "../data/product"
import { useState } from "react";


const Products = () => {
    const [products, setProducts] = useState(data || []);

    const handleColorChange = (productId, newColor) => {
        const updateProducts = products.map(product =>
            product.id === productId ? { ...product, activeColor: newColor } : product
        );
        setProducts(updateProducts);
        console.log(productId, newColor, products)
    };
    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex justify-center py-5">
                <h1 className="text-lg font-bold">Mobica Products</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-[90%] mx-auto py-3">
                {products.map((product, index) => (
                    <div key={index} className="bg-[#F1F1F1] shadow-md rounded-lg p-4 text-center h-[550px] ">
                        {/* Product Image */}
                        <div className="relative">
                            <Link to={`/${product.id}`}>
                            <img
                                src={image}
                                alt={product.name}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-[380px] object-cover rounded-lg"
                            />
                            </Link>
                            {/* 3D Icon Placeholder */}
                            <div className="absolute top-2 right-2  p-1 rounded-full shadow">
                                <img src={icon} alt="AR-icons" width={22} height={22} />
                            </div>
                        </div>

                        {/* Color Options */}
                        <div className="flex gap-2 mt-5">
                            {product.colors.map((color, index) => (
                                <div 
                                key={index} 
                                className={`w-8 h-8 rounded-full ${product.activeColor === color ? `bg-[#F1F1F1] border-2` : `bg-[${color}]`} flex justify-center items-center `}                                 
                                onClick={() => handleColorChange(product.id, color)}
                                style={{borderColor: `${product.activeColor}`}}
                                >
                                    <span
                                        key={index}
                                        className="w-6 h-6 flex items-center justify-center rounded-full"
                                        style={{ backgroundColor: color }}
                                    ></span>
                                </div>

                            ))}
                        </div>

                        {/* Product Info */}
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-lg font-bold mt-2 text-start">{product.name}</h2>
                                <p className="text-gray-500 text-sm text-start">{product.category}</p>
                            </div>

                            {/* Navigation Button */}
                            <div className="flex justify-end mt-3">
                                <Link to={`/${product.id}`}>
                                    <span className="bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center transition-shadow duration-200 shadow-sm hover:shadow-md text-[#999999]">
                                        <GoArrowUpRight className="text-2xl" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Products;