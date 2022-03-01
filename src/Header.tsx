import Theme from "./Theme";
import logo from "./assets/img/logo.svg";

function Header() {
    const title = "Trending";
    const subtitle = "Tracks";
    return <div className="header">
        <div className="header-inner">
            <div className="header-logo">
                <img src={logo} alt="logo" />
                <div className="title">
                    <h1>{title}</h1>
                    <span className="subtitle">{subtitle}</span>
                </div>
            </div>
            <div className="header-search">
                <input type={'text'} placeholder={'Search'} />
            </div>
            <Theme />
        </div>
    </div>
}

export default Header;