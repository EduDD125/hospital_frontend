import { useState } from "react"
import "editUserAvatarStyle.css"

export default function EditUserAvatar() {
        const [isOpen, setIsOpen] = useState(false)
        const userAvatar = localStorage.getItem("userAvatar")

       return (
                <div className="user-avatar__photo-container">
                        <img href={userAvatar.url} />
                        {isOpen && <EditAvatarModal setIsOpen={setIsOpen}/>}
                </div>
        );
}