import "userAvatarStyle.css"

export default function UserAvatar() {
        const userAvatar = localStorage.getItem("userAvatar")

        return (
                <div className="user-avatar__photo-container">
                        <img href={userAvatar.url} />
                </div>
        );
}