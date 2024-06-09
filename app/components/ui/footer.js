import Link from "next/link";
import Logo from "./logo";
import Dropdown from "./dropdown";
import AuthButton from "../main/auth_button";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { PiInstagramLogoBold } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";

function Footer(props) {
  return (
    <footer className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 text-white py-6">
      <div className="flex-col items-center md:flex-row space-y-4 md:hidden flex">
        <div className="border-red-500 w-20">
          <Link href={'/'}>
            <Logo />
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-4 sm:space-x-4">
          <Link href={"https://www.facebook.com/giovanni.ruiz.522066"} className="hover:text-blue-500 transition-colors">
            <i className="fab fa-facebook-f"></i> <FaFacebook />
          </Link>
          <Link href={"https://twitter.com/giosterr44"} className="hover:text-blue-300 transition-colors">
            <i className="fab fa-twitter"></i><FaTwitter />
          </Link>
          <Link href={"https://www.instagram.com/peacefulpython44/"} className="hover:text-pink-500 transition-colors">
            <i className="fab fa-instagram"></i> <PiInstagramLogoBold />
          </Link>
          <Link href={"https://www.linkedin.com/in/ruiz44/"} className="hover:text-blue-700 transition-colors">
            <i className="fab fa-linkedin-in"></i> <FaLinkedin />
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <Dropdown links={props.links} />
          <AuthButton />
        </div>
        <div className="flex flex-col md:flex-row mb-4 sm:mb-0">
          <div>
            &copy;{new Date().getFullYear()} <Link href={'https://ruiztechservices.com'}>ruizTechServices</Link>
            <span className="animate-blink">|</span>
          </div>
        </div>
      </div>

      <div className="justify-evenly flex-row items-center md:flex-row space-y-4 md:flex hidden">
        <div className="border-red-500 w-20">
          <Link href={'/'}>
            <Logo />
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-0 sm:space-x-4">
          <Link href={"https://www.facebook.com/giovanni.ruiz.522066"} className="hover:text-blue-500 transition-colors">
            <i className="fab fa-facebook-f"></i> <FaFacebook />
          </Link>
          <Link href={"https://twitter.com/giosterr44"} className="hover:text-blue-300 transition-colors">
            <i className="fab fa-twitter"></i><FaTwitter />
          </Link>
          <Link href={"https://www.instagram.com/peacefulpython44/"} className="hover:text-pink-500 transition-colors">
            <i className="fab fa-instagram"></i> <PiInstagramLogoBold />
          </Link>
          <Link href={"https://www.linkedin.com/in/ruiz44/"} className="hover:text-blue-700 transition-colors">
            <i className="fab fa-linkedin-in"></i> <FaLinkedin />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row mb-4 sm:mb-0">
          <div>
            &copy;{new Date().getFullYear()} <Link href={'https://ruiztechservices.com'}>ruizTechServices</Link>
            <span className="animate-blink">|</span>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <Dropdown links={props.links} />
          <AuthButton />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
