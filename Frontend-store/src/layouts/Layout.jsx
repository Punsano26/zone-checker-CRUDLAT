import { Outlet } from "react-router-dom"
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";
const Layout = () => {
  return (
    <>
    <AuthProvider>
    <div className="container mx-auto">
      <Nav />
    </div>
    <main>
        <Outlet />
      </main>
      <Footer />
      </AuthProvider>
      </>
    
  );
};

export default Layout