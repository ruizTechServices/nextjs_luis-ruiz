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
    <footer className="bg-gradient-to-r from-green-200 via-yellow-100 to-yellow-500 text-black py-6">
      <div className="h-full flex-col items-center md:flex-row space-y-4 md:hidden flex">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex flex-row items-center justify-center space-x-4 text-3xl">
          <Link
            href={"https://www.facebook.com/giovanni.ruiz.522066"}
            className="hover:text-blue-500 transition-colors"
          >
            <i className="fab fa-facebook-f" /> <FaFacebook />
          </Link>
          <Link
            href={"https://twitter.com/giosterr44"}
            className="hover:text-blue-300 transition-colors"
          >
            <i className="fab fa-twitter" />
            <FaTwitter />
          </Link>
          <Link
            href={"https://www.instagram.com/peacefulpython44/"}
            className="hover:text-pink-500 transition-colors"
          >
            <i className="fab fa-instagram" /> <PiInstagramLogoBold />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/ruiz44/"}
            className="hover:text-blue-700 transition-colors"
          >
            <i className="fab fa-linkedin-in" /> <FaLinkedin />
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex flex-row items-center space-x-4">
            <Dropdown links={props.links} />
          </div>
          <AuthButton />
          <div className="flex flex-col md:flex-row mb-4 sm:mb-0">
            <div>
              &copy;{new Date().getFullYear()}{" "}
              <Link href={"https://ruiztechservices.com"}>
                ruizTechServices
              </Link>
              <span className="animate-blink">|</span>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-evenly flex-row items-center md:flex-row space-y-4 md:flex hidden">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="flex flex-row items-center gap-5 space-x-0 sm:space-x-4 text-2xl">
          <Link
            href={"https://www.facebook.com/giovanni.ruiz.522066"}
            className="hover:text-blue-500 transition-colors"
          >
            <i className="fab fa-facebook-f" /> <FaFacebook />
          </Link>
          <Link
            href={"https://twitter.com/giosterr44"}
            className="hover:text-blue-300 transition-colors"
          >
            <i className="fab fa-twitter" />
            <FaTwitter />
          </Link>
          <Link
            href={"https://www.instagram.com/peacefulpython44/"}
            className="hover:text-pink-500 transition-colors"
          >
            <i className="fab fa-instagram" /> <PiInstagramLogoBold />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/ruiz44/"}
            className="hover:text-blue-700 transition-colors"
          >
            <i className="fab fa-linkedin-in" /> <FaLinkedin />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row mb-4 sm:mb-0">
          <div>
            &copy;{new Date().getFullYear()}{" "}
            <Link href={"https://ruiztechservices.com"}>ruizTechServices</Link>
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
