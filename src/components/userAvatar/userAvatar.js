import "./userAvatarStyle.css"

export default function UserAvatar() {
        const storedUserAvatar = localStorage.getItem("userAvatar");
        const userAvatar = storedUserAvatar ? JSON.parse(storedUserAvatar) : null;
    
        return (
            <div className="user-avatar__photo-container">
                {userAvatar && userAvatar.url ? (
                    <img src={userAvatar.url} alt="User Avatar" />
                ) : (
                    <p>Sem foto de perfil</p>
                )}
            </div>
        );
    }