import "editUserAvatarModalStyle.css";
import { useState, useEffect } from "react";
import pexelClient from './../../axios/pexelClient.js'

export default function EditUserAvatarModal({setIsOpen}) {
        var userAvatar = localStorage.getItem("userAvatar")
        const [photoIndex, setPhotoByIndex] = useState();
        const [errors, setErrors] = useState("");

        var photos = [ ]

        useEffect( async () => {
            try {
                const response = await pexelClient.get();
                if (!response) throw new Error("Estamos com problemas em exibir as fotos. Tente mais tarde");
                if (response && response.data.lenght === 0) throw new Error("Coleção de fotos vazia. Preencha coleção no site Pexels.");
                console.log(response);
                photos = response.data;               
            } catch ( error ) {
                   console.log(error);
                   setErrors(error.message);
            }
        }, [] );
       
        useEffect( () => {
            if(!errors) {
                userAvatar = { 
                index: photoIndex,
                url: photos[photoIndex].url
                }
                localStorage.setItem("userAvatar", userAvatar);
                return;
            }
            console.log("error ocurreu!!! me deleta e remove o return")
        }, [photoIndex, errors] );




     if (!errors) {
        return (
                <div className="edit-avatar-modal__background">
                   <div className="edit-avatar-modal__container">
                       <h3 className="edit-avatar-modal__title">Escolha sua foto</h3>
                        <div className="edit-avatar-modal__photos-container">
                            { photos.map( (photo, index) => {
                                <img key={index} 
                                        href={photo.url}           
                                        onClick={(index) =>
                                        setPhotoByIndex(index) }
                                        className={index === photoIndex ? 'photo-selected   edit-avatar-modal_photo' : 'edit-avatar-modal_photo'}
                                />
                            })}
                            { userAvatar.url === "" && <p className="warning"> escolha uma foto para seu usuário </p> }
                        </div>
                    </div>
                </div>
        );
    }

    return (
        <p className="error"> {errors} </p>
    );
}