import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { AddPhoto } from "../../components/AddPhoto";
import { ImageCarousel } from "../../components/ImageCarousel";
import { FormButton } from "../../components/FormButton";
import { resizeFile } from "../../helpers/resizer";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";

export const AddRestaurant = () => {

    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [carousel, setCarousel] = React.useState([]);
    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!image) {
            alert('No hay imagen de perfil, no se puede crear el restaurante');
            return;
        }
        if (carousel.length < 2) {
            alert('Necesitas al menos 2 fotos para el carrusel');
            return;
        }
        const resized = await resizeFile(image);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("phone", phoneNumber);
            formData.append("image", resized);

            for (let carouselImage of carousel) {
                formData.append("photo", carouselImage.resized);
            }


            const res = await axios.post("/api/restaurant", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            formRef.current.reset();
            setName("");
            setAddress("");
            setPhoneNumber("");
            setImage(null);
            setCarousel([]);
            window.location.href = "/your-restaurants";
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="flex flex-col gap-2 p-4">
            <Link to="/your-restaurants" className="text-primary flex items-center justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" /></svg>
                Back
            </Link>
            <h1 className="text-light text-4xl font-bold">Add Restaurant</h1>
            <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="md:flex md:justify-between md:gap-4">
                    <div className="w-full">
                        <label className="text-light text-sm" htmlFor="">Name</label>
                        <Input
                            type="text"
                            placeholder={"ex.Bob's Burgers"}
                            value={name}
                            setValue={setName}
                        />
                    </div>
                    <div className="w-full hidden md:block">
                        <label className="text-light text-sm" htmlFor="">Phone number</label>
                        <Input
                            type="tel"
                            placeholder={"666777123"}
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                        />
                    </div>

                </div>
                <div>
                    <label className="text-light text-sm" htmlFor="">Address</label>
                    <Input
                        type="text"
                        placeholder={"Casa de tu mami #123"}
                        value={address}
                        setValue={setAddress}
                    />
                </div>
                <div className="md:hidden">
                    <label className="text-light text-sm" htmlFor="">Phone number</label>
                    <Input
                        type="tel"
                        placeholder={"666777123"}
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                    />
                </div>
                <div>
                    <label className="text-light text-sm" htmlFor="">Photo</label>
                    <AddPhoto setImageDef={setImage} />
                </div>
                <hr className="w-full border-light mt-2" />
                <div className="flex flex-col gap-2">
                    <label className="text-primary text-md" htmlFor="">Your carousel</label>
                    <p className="text-light text-sm"> You need to add at least 2 photos</p>
                    <ImageCarousel setDefCarousel={setCarousel} initialImages={carousel}/>
                    <p className="text-light mt-3 text-[13px]">
                        To start adding your dishes go to the restaurant page once created
                    </p>
                </div>
                <div>
                    <FormButton title="Add Restaurant" className="w-full text-md" />
                </div>
            </form>
        </div>
    );
}