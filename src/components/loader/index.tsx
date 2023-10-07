import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <section className="center-items py-5 my-5">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </section>
  );
};

export default Loader;
