import { motion } from "framer-motion";
import "./Home.scss";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="hero-section">
      <section className="hero center-items">
        <motion.h1
          initial={{ x: "100vw", y: 0 }}
          animate={{ y: 0, x: 0 }}
          transition={{ duration: 2 }}
        >
          Welcome
        </motion.h1>

        <motion.p
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ duration: 2 }}
        >
          Take a look and buy or sell something.
        </motion.p>
        <NavLink to={"/products"}>
          <motion.button
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 2, delay: 1 }}
          >
            Products
          </motion.button>
        </NavLink>
      </section>
    </section>
  );
};

export default Home;
