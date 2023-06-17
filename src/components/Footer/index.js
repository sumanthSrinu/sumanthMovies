import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footerMainContainer">
    <div className="footerIconsContainer">
      <FaGoogle />
      <FaTwitter />
      <FaInstagram />
      <FaYoutube />
    </div>

    <p className="footerContactUs">Contact us</p>
  </div>
)

export default Footer
