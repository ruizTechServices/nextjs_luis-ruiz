//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\ui\footer.js
import Link from "next/link";
import Logo from "./logo";

function Footer(props) {
  return (
    <footer className="bg-gray-800 text-white p-6 flex flex-col items-center sm:flex-row sm:justify-between">
      {/* Left Section - You could place your branding here */}
      <div>
        <Logo />
      </div>
      <div className="mb-4 sm:mb-0">
        &copy;{new Date().getFullYear()} <Link href={'https://ruiztechservices.com'}>ruizTechServices</Link><span className="animate-blink">|</span> Luis-Ruiz.com All
        rights reserved.
      </div>

      {/* Right Section - Navigation Links */}
      <ul className="flex flex-wrap gap-4">
        {props.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
