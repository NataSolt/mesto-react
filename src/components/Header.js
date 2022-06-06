import logoHeader from '../images/logo-header.svg';

function Header() {
    return ( 
        <header className="header">
        <img
          src={logoHeader}
          alt="надпись на английском языке место Россияnn"
          className="header__logo"
        />
      </header>

    )}

    export default Header;
