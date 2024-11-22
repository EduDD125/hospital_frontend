import "./userAvatarStyle.css"
import { FaUser } from "react-icons/fa6";

export default function UserAvatar() {
        const storedUserAvatar = localStorage.getItem("userAvatar");
        const userAvatar = storedUserAvatar ? JSON.parse(storedUserAvatar) : null;
    
        return (
            <div className="user-avatar__photo-container">
                {userAvatar && userAvatar.url ? (
                    <img src={userAvatar.url} alt="User Avatar" className="user-avatar__photo"/>
                ) : (
                    <FaUser />
                )}
            </div>
        );
    }