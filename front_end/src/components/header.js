import '../static/css/header.css';
import logo from '../static/images/utopia-logo.png';
import pfp from '../static/images/pfp.jpg';
const Header = (props)=> {
    
    return (
      <>
          <div className='header'>
              <img className='logo' src={logo} />
              <div className='pfp-container'>
                <img className='pfp-img' src={pfp} />
              </div>
              <input className='search' type='text' placeholder="Search..." />
          </div>
      </>
    );
  }
  
  export default Header;