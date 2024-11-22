import { useState } from "react"
import { FaUser } from "react-icons/fa6";
import "./editUserAvatarStyle.css"
import EditAvatarModal from './editUserAvatarModal'

export default function EditUserAvatar() {
        const [isOpen, setIsOpen] = useState(false)
        const storedUserAvatar = localStorage.getItem("userAvatar")
        const userAvatar = storedUserAvatar ? JSON.parse(storedUserAvatar) : null;

        console.log(userAvatar)

       return (
                <div className="edit-user-avatar__photo-container">
                        {userAvatar && userAvatar.url ? 
                                <div className="edit-user-avatar__edit-photo-container"
                                        onClick={() => setIsOpen(true)}
                                >
                                        <img src={userAvatar.url} className="edit-user-avatar__edit-photo"/>
                                        <p>Escolha uma nova foto de perfil</p>
                                </div>
                        :
                                <div className="edit-user-avatar__edit-photo-container"
                                        onClick={() => setIsOpen(true)}
                                >
                                        <FaUser />
                                        <p>Escolha uma foto de perfil</p>
                                </div>
                        }
                        {isOpen && <EditAvatarModal setIsOpen={setIsOpen}/>}
                </div>
        );
}