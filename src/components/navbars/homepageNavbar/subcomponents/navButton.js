import "./navButtonStyle.css"

export default function NavButton( {text, action}) {
    return(
        <button className="nav-button" onClick={action}>
            <>{text}</>
        </button>
    );
}