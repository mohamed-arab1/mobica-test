/* eslint-disable react/no-unescaped-entities */
import product_image from "../assets/image.jpeg"

// eslint-disable-next-line react/prop-types
export default function ProductSection({scrollToSection}) {
    
    return (
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">
          {/* Image Section */}
          <div>
            <img
              src={product_image}
              alt="EM Table"
              className="w-full object-cover"
            />
          </div>
  
          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-900">EM Table</h2>
            <p className="text-gray-600 mt-2">Jean Prouvé, 1950</p>
            <p className="text-gray-700 mt-4">
              The aesthetic appearance of Jean Prouvé's EM Table adheres to
              structural principles, illustrating the flow of forces and stresses
              in its construction. It comes in a range of sizes with table tops in
              premium solid wood or HPL...
            </p>
            <p className="text-lg font-semibold text-gray-900 mt-4">
              from <span className="text-black">USD 4,750.00</span>
            </p>
            <button className="cursor-pointer mt-6 px-6 py-3 bg-black text-white text-sm font-medium rounded-md" onClick={scrollToSection}>
              CONFIGURE
            </button>
          </div>
        </div>
      </div>
    );
  }
  