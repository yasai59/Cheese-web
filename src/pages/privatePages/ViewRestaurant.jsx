import React from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import DishesComponent from "../../components/DishesComponent";
import { ImageCarousel } from "../../components/ImageCarousel";
import { LinkButton } from "../../components/LinkButton";
import { useRef } from "react";
import { AddDish } from "./AddDish";

export const ViewRestaurant = () => {
    const [dishes, setDishes] = useState([]);
    const { restaurants } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const { restaurantId } = useParams();
    const restaurant = restaurants.find((restaurant) => restaurant.id == restaurantId);

    const isOwner = user.id === restaurant.owner_id;    

    const [editMode, setEditMode] = useState(false);
    const handleEdit = () => {
        setEditMode(!editMode);
    }

    const image = useRef(null);

    /* Mostrar imagen al editar una existente */
    const urlImagen = `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`;
    const styles = {
        backgroundImage: `url(${urlImagen})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };

    const handleChangeImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("photo", file);
            formData.append("id", restaurant.id)
            try {
                await axios.post(`/api/restaurant/photo/profile-picture/${restaurant.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                const url = URL.createObjectURL(file);
                image.current.style.backgroundImage = `url(${url})`;
            } catch (error) {
                console.error(error);
            }
        };
        input.click();
    };

    const [restaurantAddress, setRestaurantAddress] = useState(restaurant.address);

    useEffect(() => {
        axios.get('/api/dish/' + restaurant.id).then((res) => {
            setDishes(res.data);
        })
    }, []);

    const [addDishModalOpen, setAddDishModalOpen] = useState(false);


    const [carousel, setCarousel] = useState([]);
    useEffect(() => {
        axios.get("/api/restaurant/carousel/" + restaurant.id)
        .then((res) => {
            const images = res.data.map((image) => {
                return {
                    uri: `${axios.defaults.baseURL}/api/restaurant/carousel/${image}`,
                    type: "image/png",
                    name: image,
                };
            });
            setCarousel(images);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);



    const [glovoLink, setGlovoLink] = useState(restaurant.link_glovo || "");
    const [uberEatsLink, setUberEatsLink] = useState(restaurant.link_uber_eats || "");
    const [justEatLink, setJustEatLink] = useState(restaurant.link_just_eat || "");

    const handleOrderClick = (src) => {
        window.open(src, "_blank");
    }

    const glovoBtn = ({ src }) => {
        return (
            <button className="bg-primary rounded-2xl py-2 h-14 items-center justify-center w-[70%]" onClick={() => handleOrderClick(src)}>
                <img src="../../../../../assets/glovo-logo.png" className="h-full w-30 mx-auto"></img>
            </button>
        )
    }

    const uberEatsBtn = ({ src }) => {
        return (
            <button className="bg-black rounded-2xl py-2 h-14 items-center justify-center w-[70%]" onClick={() => handleOrderClick(src)}>
                <img src="../../../../../assets/uber-eats-logo.png" className="h-full w-30 mx-auto"></img>
            </button>
        )
    }

    const justEatBtn = ({ src }) => {
        return (
            <button className="bg-white rounded-2xl py-2 h-14 items-center justify-center w-[70%]" onClick={() => handleOrderClick(src)}>
                <img src="../../../../../assets/just-eat-logo.png" className="h-full w-30 mx-auto"></img>
            </button>
        )
    }

    return (
        <>
            {/* Header */}
            <div className="w-full mx-auto flex flex-col">
                <div id="header" className="h-full border-b border-base-light">
                    <div className="flex flex-col px-4">
                        {editMode && (
                            <button className="bg-primary flex justify-center items-center p-1 rounded w-16 text-base-dark mt-6">Save</button>
                        )}
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl text-light font-bold my-5">{restaurant.name}</h1>
                            {editMode ? (
                                <div className="cursor-pointer" onClick={() => handleEdit()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" /></svg>
                                </div>
                            ) : (
                                <div className="cursor-pointer flex items-center" onClick={() => handleEdit()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" /></svg>
                                    {!isOwner && (
                                        <>
                                            <div className="cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25"/></svg>
                                            </div> 
                                            <div className="cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm-2.75 8L3 15.75v-7.5L8.25 3h7.5L21 8.25v7.5L15.75 21zm.85-2h5.8l4.1-4.1V9.1L14.9 5H9.1L5 9.1v5.8zm2.9-7"/></svg>
                                            </div>
                                        </>                        
                                    )}
                                </div>
                            )}
                        </div>
                        {/* Image */}
                        <div className="flex justify-center items-center">
                            {editMode ? (
                                <div
                                    className="w-36 h-36 rounded-full cursor-pointer mx-auto border border-light bg-center bg-cover bg-no-repeat"
                                    ref={image}
                                    onClick={handleChangeImage}
                                    style={styles}
                                >
                                </div>
                            ) : (
                                <img className="h-36 w-36 rounded-full object-cover border border-light" src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}></img>
                            )}
                        </div>
                        <div className="py-4">
                            {editMode ? (
                                <input
                                    type="text"
                                    value={restaurantAddress}
                                    className="p-1 rounded-sm"
                                    onChange={(e) => setRestaurantAddress(e.target.value)}
                                />
                            ) : (
                                <p>{restaurant.address}</p>
                            )}
                        </div>
                    </div>
                </div>
                {/* Menu + AddDish */}
                <AddDish isEditing={editMode}/>
                {/* Dishes */}
                <DishesComponent dishes={dishes} editMode={editMode} restaurantId={restaurantId} />
                {/* Carousel */}
                <div className="flex flex-col gap-2 p-4">
                    <label className="text-primary">Carousel</label>
                    <ImageCarousel setDefCarousel={setCarousel} />
                </div>
                <hr className="border-b-1 border-base-light" />
                {/* Links + Orders */}
                <div id="links" className="flex flex-col gap-2 p-4">
                    {editMode ? (
                        <div className="flex flex-col gap-2">
                            <label className="text-primary">Links</label>
                            <LinkButton src="glovo-icon" originalText={glovoLink} onSave={setGlovoLink}></LinkButton>
                            <LinkButton src="uber-eats-icon" originalText={uberEatsLink} onSave={setUberEatsLink}></LinkButton>
                            <LinkButton src="just-eat-icon" originalText={justEatLink} onSave={setJustEatLink}></LinkButton>
                        </div>
                    ) : (
                        <>
                            <label className="text-primary">Order</label>
                            <div className="flex flex-col items-center gap-2">
                                {restaurant.link_glovo && <glovoBtn src={restaurant.link_glovo} />}
                                {restaurant.link_uber_eats && <uberEatsBtn src={restaurant.link_uber_eats} />}
                                {restaurant.link_just_eat && <justEatBtn src={restaurant.link_just_eat} />}
                                {!restaurant.link_glovo && !restaurant.link_uber_eats && !restaurant.link_just_eat && (
                                    <p className="text-light text-center">No delivery services available for this restaurant</p>
                                )}

                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}