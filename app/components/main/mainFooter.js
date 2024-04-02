//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\mainFooter.js
import Footer from "../ui/footer";



function MainFooter() {
  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/dashboard", label: "Dashboard" },//<===This dashboard must appear ONLY if 'Giosterr44@gmail.com' is logged in.
    { href: "/users", label: "Users" }, //<===This users page must appear ONLY if the registered users are logged in. I also want to display the href as `/users/${userId}` for each user.
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
