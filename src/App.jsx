import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopBtn from "./components/ScrollToTopBtn";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopBtn />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;
