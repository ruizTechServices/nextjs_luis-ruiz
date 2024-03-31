//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
import Footer from "../ui/footer";



function MainFooter() {
  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about-me", label: "About Me" },
    { href: "/contact", label: "Contact" },
    { href: "/services", label: "Services" },
  ];

  return (
    // ... your page content
    <Footer links={footerLinks} />  
  );
}

export default MainFooter;
