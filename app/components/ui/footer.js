//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\ui\footer.js
import Link from "next/link";
import Logo from "./logo";
import Dropdown from "./dropdown";
import AuthButton from "../main/auth_button";


function Footer(props) {

  return (
    <footer className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-400 to-gray-600 text-white p-6 flex flex-col items-center sm:flex-row sm:justify-between">
      <div className="border-red-500 w-20">
        <Link href={'/'}>
          <div className="">
            <Logo />
          </div>
        </Link>
      </div>
      <div className="mb-4 sm:mb-0">
        &copy;{new Date().getFullYear()} <Link href={'https://ruiztechservices.com'}>ruizTechServices</Link><span className="animate-blink">|</span> Luis-Ruiz.com All
        rights reserved.
      </div>
      <div className="flex flex-row items-center space-x-4">
      <Dropdown links={props.links} />
      <AuthButton />
      </div>
      
    </footer>
  );
}

export default Footer;
