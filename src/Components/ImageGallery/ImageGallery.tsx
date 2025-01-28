import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
    return (
        // <div className="flex flex-wrap">
        //     {images.map((image, index) => <img key={index} src={"http://localhost:3001/static/" + image.replaceAll("\\", "/")} className="w-1/4" />)}
        // </div>
        <Carousel>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={"http://localhost:3001/static/" + image.replaceAll("\\", "/")} />
                </div>
            ))}
        </Carousel>
    )
}

export default ImageGallery;