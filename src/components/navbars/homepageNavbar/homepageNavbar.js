import "./homepageNavbarStyle.css"
import Logo from "../../logo/logo";
import NavButton from "./subcomponents/navButton";

export default function HomepageNavbar() {

    function handleLogin() {
        console.log("login")
    }

    function handleSignIn() {
        console.log("login")
    }

    return (
        <nav className="nav">
            <Logo />

            <div className="nav__buttons-container">
                <NavButton text="Login" action={handleLogin}/>
                <NavButton text="Sign in" action={handleSignIn}/>
            </div>
        </nav>
    );
}