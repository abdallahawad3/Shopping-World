import vid from "../../assets/videos/discount.mp4";
const Discount = () => {
  return (
    <div>
      <video
        autoPlay
        loop
        playsInline
        width={"100%"}
        height={"100%"}
        src={vid}
      ></video>
    </div>
  );
};

export default Discount;
