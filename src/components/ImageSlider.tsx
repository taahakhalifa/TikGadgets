import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface ImageSliderProps {
    urls: string[];
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
    return (
        <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
            <Swiper className="h-full w-full">
                {urls.map((url, index) => (
                    <SwiperSlide
                        key={index}
                        className="-z-10 relative h-full w-full"
                    >
                        <Image
                            fill
                            loading="eager"
                            className="-z-10 h-full w-full object-cover object-center"
                            src={url}
                            alt="product image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageSlider;
