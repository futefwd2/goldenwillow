import image1 from '../assets/goldenwillows/Gallery/amenities.webp';
import image2 from '../assets/goldenwillows/Gallery/ext1.webp';
import image3 from '../assets/goldenwillows/Gallery/ext2.webp';
import image4 from '../assets/goldenwillows/Gallery/ext3.webp';
import image5 from '../assets/goldenwillows/Gallery/ext4.webp';
import image6 from '../assets/goldenwillows/Gallery/ext5.webp';
import image7 from '../assets/goldenwillows/Gallery/ext6.webp';
import image8 from '../assets/goldenwillows/Gallery/ext7.webp';
import image9 from '../assets/goldenwillows/Gallery/ext8.webp';
import image10 from '../assets/goldenwillows/Gallery/ext9.webp';
import image11 from '../assets/goldenwillows/Gallery/ext10.webp';
import image12 from '../assets/goldenwillows/Gallery/ext11.webp';
import image13 from '../assets/goldenwillows/Gallery/ext12.webp';
import image14 from '../assets/goldenwillows/Gallery/ext13.webp';
import image15 from '../assets/goldenwillows/Gallery/ext14.webp';
import image16 from '../assets/goldenwillows/Gallery/ext15.webp';
import image17 from '../assets/goldenwillows/Gallery/ext16.webp';
import image18 from '../assets/goldenwillows/Gallery/ext17.webp';
import image19 from '../assets/goldenwillows/Gallery/ext18.webp';
import image20 from '../assets/goldenwillows/Gallery/ext19.webp';
import image21 from '../assets/goldenwillows/Gallery/ext20.webp';

import image22 from '../assets/goldenwillows/Gallery/int1.webp';
import image23 from '../assets/goldenwillows/Gallery/int2.webp';
import image24 from '../assets/goldenwillows/Gallery/int3.webp';
import image25 from '../assets/goldenwillows/Gallery/int5.webp';
import image26 from '../assets/goldenwillows/Gallery/int6.webp';
import image27 from '../assets/goldenwillows/Gallery/int7.webp';
import image28 from '../assets/goldenwillows/Gallery/int8.webp';
import image29 from '../assets/goldenwillows/Gallery/int9.webp';
import image30 from '../assets/goldenwillows/Gallery/int10.webp';
import image31 from '../assets/goldenwillows/Gallery/int11.webp';
import image32 from '../assets/goldenwillows/Gallery/int12.webp';
import image33 from '../assets/goldenwillows/Gallery/int13.webp';
import image34 from '../assets/goldenwillows/Gallery/int14.webp';
import image35 from '../assets/goldenwillows/Gallery/int15.webp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const amenities = [
    { id: 1, title: "Towers", image: image1 }
]

const exterior = [
    { id: 1, title: "", image: image2 },
    { id: 2, title: "", image: image3 },
    { id: 3, title: "", image: image4 },
    { id: 4, title: "", image: image5 },
    { id: 5, title: "", image: image6 },
    { id: 6, title: "", image: image7 },
    { id: 7, title: "", image: image8 },
    { id: 8, title: "", image: image9 },
    { id: 9, title: "", image: image10 },
    { id: 10, title: "", image: image11 },
    { id: 11, title: "", image: image12 },
    { id: 12, title: "", image: image13 },
    { id: 13, title: "", image: image14 },
    { id: 14, title: "", image: image15 },
    { id: 15, title: "", image: image16 },
    { id: 16, title: "", image: image17 },
    { id: 17, title: "", image: image18 },
    { id: 18, title: "", image: image19 },
    { id: 19, title: "", image: image20 },
    { id: 20, title: "", image: image21 },

];

const interior = [
    { id: 1, title: "", image: image22 },
    { id: 2, title: "", image: image23 },
    { id: 3, title: "", image: image24 },
    { id: 4, title: "", image: image25 },
    { id: 5, title: "", image: image26 },
    { id: 6, title: "", image: image27 },
    { id: 7, title: "", image: image28 },
    { id: 8, title: "", image: image29 },
    { id: 9, title: "", image: image30 },
    { id: 10, title: "", image: image31 },
    { id: 11, title: "", image: image32 },
    { id: 12, title: "", image: image33 },
    { id: 13, title: "", image: image34 },
    { id: 14, title: "", image: image35 },

]


export default function GalleryPageGolden() {

    const [show, setShow] = useState<string>("interior");

    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const [previewCategory, setPreviewCategory] = useState<'interior' | 'exterior' | 'amenities' | null>(null);

    const navigate = useNavigate();

    const handleChange = (value: string) => {
        setShow(value);


    }


    const openPreview = (category: 'interior' | 'exterior' | 'amenities', index: number) => {
        setPreviewCategory(category)
        setPreviewIndex(index);
    }

    const closePreview = () => {
        setPreviewIndex(null);
        setPreviewCategory(null);
    }
    return (<>
        <div className='w-screen h-auto flex flex-col gap-4 p-4'>

            <div className='flex gap-3 w-full justify-between'>
                <div className='flex gap-3'>
                    <button
                        onClick={() => handleChange("interior")}

                        className={`px-4 py-2 rounded transition-all duration-300 ease-in-out ${show === "interior" ? "bg-yellow-400/80 text-black font-bold transition-all duration-300 ease-in-out" : "bg-gray-200 font-medium text-gray-600"}`}
                    >Interior</button>
                    <button
                        onClick={() => handleChange("exterior")}
                        className={`px-4 py-2 transition-all duration-300 ease-in-out rounded ${show === "exterior" ? "bg-yellow-400/80 font-bold text-black transition-all duration-300 ease-in-out" : "font-medium bg-gray-200 text-gray-600"}`}>Exterior</button>
                    <button
                        onClick={() => handleChange("amenities")}
                        className={`px-4 py-2 transition-all duration-300 ease-in-out rounded ${show === "amenities" ? "bg-yellow-400/80 font-bold text-black" : "font-medium bg-gray-200 text-gray-600"}`}
                    >Aminities</button>
                </div>
                <div className='flex '>
                    <button className='bg-black text-white font-bold px-4 rounded py-1'
                        onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
            <div className='flex justify-center items-center w-full'>

                {show === "interior" && (
                    <div className='p-2 bg-gray-200 rounded-md grid grid-cols-4 gap-4 w-full'>

                        {interior.map((item, index) => (
                            <div key={index} className='bg-white rounded-md overflow-hidden'>
                                <img
                                    src={item.image}
                                    alt=""
                                    onClick={() => openPreview('interior', index)}
                                    className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                                />
                            </div>
                        ))}

                    </div>
                )}

                {show === "exterior" && (
                    <div className='p-2 bg-gray-200 rounded-md grid grid-cols-4 gap-4 w-full'>

                        {exterior.map((item, index) => (
                            <div key={index} className='bg-white rounded-md overflow-hidden'>
                                <img
                                    src={item.image}
                                    onClick={() => openPreview('exterior', index)}
                                    alt=""
                                    className=" w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                                />
                            </div>
                        ))}

                    </div>
                )}

                {show === "amenities" && (
                    <div className='p-2 bg-gray-200 rounded-md grid grid-cols-4 gap-4 w-full h-screen'>

                        {amenities.map((item, index) => (
                            <div key={index} className='  rounded-md overflow-hidden'>
                                <img
                                    src={item.image}
                                    onClick={() => openPreview('amenities', index)}
                                    alt=""
                                    className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                                />
                            </div>
                        ))}

                    </div>
                )}

            </div>

            {previewIndex !== null && previewCategory && (
                <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-10'

                >
                    <div className='absolute inset-0' onClick={() => closePreview()} > </div>

                    {/* preview */}
                    <button
                        onClick={() => closePreview()}
                        className='absolute top-10 left-10 text-white hover:text-black hover:bg-white transition-all ease-in-out duration-300  text-2xl font-bold bg-black/50 px-4 py-2 rounded-lg hover:bg-black/70 select-none z-50'>
                        ✕
                    </button>

                    <button
                        onClick={() => setPreviewIndex(prev => prev! - 1)}

                        disabled={previewIndex === 0}
                        className='absolute left-16 text-white hover:text-black hover:bg-white transition-all ease-in-out duration-300  text-4xl font-bold bg-black/50 px-3 py-1 rounded-lg hover:bg-black/70 disabled:opacity-40 select-none'>
                        ‹
                    </button>

                    <img
                        src={(() => {
                            if (previewCategory === 'interior') return interior[previewIndex!].image;
                            if (previewCategory === 'exterior') return exterior[previewIndex!].image;
                            return amenities[previewIndex!].image;

                        })()}

                        alt="" className="md:w-[60%] md:h-[75%] h-[50%] w-[80%] object-cover rounded-md " />

                    {/* Next */}
                    <button
                        onClick={() => setPreviewIndex(prev => prev! + 1)}
                        disabled={previewIndex === (
                            previewCategory === 'interior' ? interior.length - 1 :
                                previewCategory === 'exterior' ? exterior.length - 1 :
                                    amenities.length - 1
                        )}
                        className="absolute right-16 text-white hover:text-black hover:bg-white transition-all ease-in-out duration-300  text-4xl font-bold bg-black/50 px-3 py-1 rounded-lg hover:bg-black/70 disabled:opacity-40 select-none"
                    >
                        ›
                    </button>

                </div>
            )}
        </div>
    </>)
}