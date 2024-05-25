import React, { useEffect, useState } from "react";
import axios from "axios";
import { resizeFile } from "../helpers/resizer";

const ItemCarousel = ({ image, handleDelete }) => {
    return (
        <div className="relative">
            <img src={image.imageUrl} alt="Carousel Image" className="w-28 h-28 rounded-xl" />
            <button
                type="button"
                className="absolute top-[2px] right-[4px] bg-white rounded-full"
                onClick={handleDelete}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256"><path fill="red" d="M168.49 104.49L145 128l23.52 23.51a12 12 0 0 1-17 17L128 145l-23.51 23.52a12 12 0 0 1-17-17L111 128l-23.49-23.51a12 12 0 0 1 17-17L128 111l23.51-23.52a12 12 0 0 1 17 17ZM236 128A108 108 0 1 1 128 20a108.12 108.12 0 0 1 108 108m-24 0a84 84 0 1 0-84 84a84.09 84.09 0 0 0 84-84" /></svg>
            </button>
        </div>
    );
}

export const ImageCarousel = ({ setDefCarousel = () => {}, initialImages = [] }) => {
    const [images, setImages] = useState(initialImages);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        setImages(initialImages);
    }, [initialImages]);

    const handlePickImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageUrl = URL.createObjectURL(file);
        const resized = await resizeFile(file);

        setImages((prevImages) => [...prevImages, { resized, imageUrl }]);
        setHasChanged(true);
        e.target.value = null;
    };

    const handleDelete = (imageUri) => {
        setImages((prevImages) => prevImages.filter((img) => img !== imageUri));
        setHasChanged(true);
    };

    useEffect(() => {
        if (hasChanged) {
            setDefCarousel(images);
            setHasChanged(false);
        }
    }, [images, setDefCarousel, hasChanged]);

    return (
        <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
                <ItemCarousel
                    key={index}
                    image={image}
                    handleDelete={() => handleDelete(image)}
                />
            ))}
            {images.length < 12 && (
                <label htmlFor="fileInputCarousel" className="rounded-xl border-2 aspect-square border-dashed border-light w-28 self-center justify-center items-center">
                    <div className="flex justify-center items-center h-full text-light cursor-pointer">
                        <input id="fileInputCarousel" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePickImage} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" /></svg>
                    </div>
                </label>
            )}
        </div>
    );
}
