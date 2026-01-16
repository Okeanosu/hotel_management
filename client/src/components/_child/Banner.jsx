const Banner = (props) => {
  return (
    <div className="banner">
      <img src={props.img} />
      <p>{props.text}</p>
    </div>
  );
};

export default Banner;
