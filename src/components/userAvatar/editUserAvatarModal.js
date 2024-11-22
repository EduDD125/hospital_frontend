import "./editUserAvatarModalStyle.css";
import { useState, useEffect } from "react";
import pexelClient from './../../axios/pexelClient.js'

export default function EditUserAvatarModal({setIsOpen}) {
        const storedUserAvatar = localStorage.getItem("userAvatar");
        const userAvatar = storedUserAvatar ? JSON.parse(storedUserAvatar) : null;

        const [photos, setPhotos] = useState([]);
        const [photoIndex, setPhotoIndex] = useState(null);
        const [errors, setErrors] = useState("");

        useEffect(() => {
            const fetchPhotos = async () => {
                try {
                    const response = await pexelClient.get('');
                    if (!response || response.data.media.length === 0) {
                        throw new Error("Coleção de fotos vazia ou problemas ao carregar as imagens.");
                    }
                    setPhotos(response.data.media); // Salva as fotos no estado
                } catch (error) {
                    console.error(error);
                    setErrors(error.message);
                }
            };
    
            fetchPhotos();
        }, []);
       
        useEffect(() => {
            if (photoIndex !== null && photos.length > 0) {
                const selectedAvatar = {
                    index: photoIndex,
                    url: photos[photoIndex].src.large,
                };
                localStorage.setItem("userAvatar", JSON.stringify(selectedAvatar));
            }
        }, [photoIndex, photos]);

        console.log("photos:", photos)
    
        if (errors) {
            return <p className="error">{errors}</p>;
        }
    
        return (
            <div className="edit-avatar-modal__background" onClick={() => setIsOpen(false)}>
                <div className="edit-avatar-modal__container" onClick={(event) => event.stopPropagation()}>
                    <h3 className="edit-avatar-modal__title">Escolha sua foto</h3>
                    <div className="edit-avatar-modal__photos-container">
                        {photos.map((photo, index) => (
                                <img
                                    src={photo.src.medium}
                                    alt={photo.alt || `Imagem ${index}`}
                                    onClick={() => setPhotoIndex(index)}
                                    className={
                                        (photo.src.medium === userAvatar.url)
                                            ? "photo-selected  edit-avatar-modal__photo"
                                            : `edit-avatar-modal__photo `
                                    }
                                />
                        ))}
                    </div>
                    <p className="warning">Clique nas fotos para selecionar nova foto de perfil</p>

                    <button onClick={() => setIsOpen(false)}>Fechar</button>
                </div>
            </div>
        );
    
}