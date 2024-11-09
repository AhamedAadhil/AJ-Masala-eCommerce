import React, { useState } from 'react'
import { DollarSign, ShoppingCart, ShoppingBag, CreditCard, Landmark} from "lucide-react";

const SingleProduct = () => {


    const [images, setImages] = useState({
        img1 : "https://priyafoods.com/cdn/shop/files/GARAMMASALA_1.jpg?v=1705735292",
        img2 : "https://www.ceepeespices.in/wp-content/uploads/2021/02/garam-masala-1kg-front.jpg",
        img3 : "https://shop.mtrfoods.com/cdn/shop/products/FOP_caddd461-4eaf-410c-868a-2ae58106c94b_1200x1200.png?v=1668601521",
        img4 : "https://www.dnvfoods.com/wp-content/uploads/2022/05/Garam-Masala-Powder-Front-.jpeg"
    })

    const [activeImg, setActiveImage] = useState(images.img1)

    const [amount, setAmount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    // Toggle function to open or close the dropdown
    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-start p-10 bg-slate-50 rounded-2xl shadow-md lg:mx-60'>
            <div className='flex flex-col gap-6 lg:w-2/4 content-center'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
                <div className='flex flex-row justify-between overflow-scroll h-24'>
                    <img src={images.img1} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)}/>
                    <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)}/>
                    <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)}/>
                    <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)}/>
                    <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)}/>
                    <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)}/>
                    <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)}/>
                </div>
            </div>
            {/* ABOUT */}
            <div className='flex flex-col gap-4 lg:w-2/4 md:w-full'>
                <div>
                    <span className=' text-orange-400 font-semibold'>AJ Masala</span>
                    <h1 className='text-3xl font-bold'>Garam Masala</h1>
                </div>
                <h6 className='text-2xl font-semibold'>Rs. 550.00</h6>

                <div className="flex sm:w-full items-center py-2 overflow-x-scroll">
                <label className="cursor-pointer">
                    <span className="px-3 py-1 text-sm font-medium mr-2 peer-checked:bg-yellow-500 peer-checked:text-white">Size</span>
                </label>
                <label className="cursor-pointer">
                    <input type="radio" name="radio-10" className="sr-only peer" defaultChecked />
                    <span className="px-3 py-1 border rounded text-sm font-medium mr-2 peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:border-yellow-800 transition-colors">75g</span>
                </label>
                <label className="cursor-pointer">
                    <input type="radio" name="radio-10" className="sr-only peer" />
                    <span className="px-3 py-1 border rounded text-sm font-medium mr-2 peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:border-yellow-800 transition-colors">100g</span>
                </label>
                <label className="cursor-pointer">
                    <input type="radio" name="radio-10" className="sr-only peer" />
                    <span className="px-3 py-1 border rounded text-sm font-medium mr-2 peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:border-yellow-800 transition-colors">250g</span>
                </label>
                <label className="cursor-pointer">
                    <input type="radio" name="radio-10" className="sr-only peer" />
                    <span className="px-3 py-1 border rounded text-sm font-medium mr-2 peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:border-yellow-800 transition-colors">500g</span>
                </label>
                </div>


                <div className='flex flex-col md:flex-row gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        <span className='py-4 px-6 rounded-lg'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <div className="flex space-x-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                        Add to Cart
                        <ShoppingCart className="inline ml-2" size={20} />
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        Buy Now
                        <ShoppingBag className="inline ml-2" size={20} />
                    </button>
                    </div>
                </div>
                <h1 className='text-orange-700 font-bold'>Description</h1>
                <p className='text-gray-700 text-justify'>
                Fenugreek is an annual plant in the family Fabaceae, with leaves consisting of three small obovate to oblong leaflets. It is cultivated worldwide as a semiarid crop. Its leaves and seeds are common ingredients in dishes from the Indian subcontinent, and have been used as a culinary ingredient since ancient times</p>
                <h1 className='text-orange-700 font-bold'>Key Ingredients</h1>
                <p className='text-gray-700 text-justify'>
                Fenugreek is an annual plant in the family Fabaceae, with leaves consisting of three small obovate to oblong leaflets. It is cultivated worldwide as a semiarid crop. Its leaves and seeds are common ingredients in dishes from the Indian subcontinent, and have been used as a culinary ingredient since ancient times</p>
                <h1 className='text-orange-700 font-bold'>Why Choose AJ Masala</h1>
                <p className='text-gray-700 text-justify'>
                Fenugreek is an annual plant in the family Fabaceae, with leaves consisting of three small obovate to oblong leaflets. It is cultivated worldwide as a semiarid crop. Its leaves and seeds are common ingredients in dishes from the Indian subcontinent, and have been used as a culinary ingredient since ancient times</p>
                <h1 className='text-orange-700 font-bold'>Details</h1>
                
                <ul class="list-disc">
                    <li>Now this is a story all about how, my life got flipped-turned upside down</li>
                    <li>Now this is a story all about how, my life got flipped-turned upside down</li>
                    <li>Now this is a story all about how, my life got flipped-turned upside down </li>
                </ul>

                <div className="space-y-4">
                    <div className="flex items-center justify-start bg-orange-200 p-4 shadow rounded-lg">
                        <span className="font-bold text-lg mr-4">We Accept</span>
                        <CreditCard className="text-blue-600 text-2xl mr-2" />
                        <span className="mr-4">Pay Online</span>
                        <DollarSign className="text-green-600 text-2xl mr-2" />
                        <span className="mr-4">Cash On Delivery</span>
                        <Landmark className="text-orange-500 text-2xl mr-2" />
                        <span>Bank Deposit</span>
                    </div>
                    <div className="bg-orange-200 p-4 shadow rounded-lg">
                        <span className="text-lg">We Deliver Island wide in 3–5 working days</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SingleProduct