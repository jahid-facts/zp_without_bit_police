import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Logo from "../../assets/Logo.jpg";
import { useEffect } from "react";
import axios from "axios";
import "./backgroundControl.css";
import imgUrl from "../../imgUrl";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none !important",
        borderRadius: "100px",
        paddingRight: "50px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  // return (
  //     <div
  //         className={className}
  //         style={{ ...style, display: "block", background: "none !important", borderRadius: "100px", paddingLeft: "30px" }}
  //         onClick={onClick}
  //     />
  // );
  return (
    <div
      className={`${className} backgroundControl`} // CSS class name passed as a prop
      style={{
        ...style, // Spread the existing style object
        display: "block", // Set display property to "block"
        // background: "none !important",  // Set background property to "none" with important flag
        borderRadius: "100px", // Set border radius to 100px
        paddingLeft: "30px", // Set left padding to 30px
        zIndex: 1000,
      }}
      onClick={onClick} // onClick event handler passed as a prop
    />
  );
}

const SliderTop = () => {
  const innovativePowerSlider = {
    // className: "center mx-4",
    // infinite: true,
    // centerPadding: "60px",
    // slidesToShow: 5,
    // swipeToSlide: true,
    // adaptiveHeight: true,
    // afterChange: function (index) {
    //     console.log(
    //         `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //     );
    // }
    className: "center",
    dots: false,
    infinite: true,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [innovativePower, setInnovativePower] = useState([]);
  useEffect(() => {
    axios.get("/slide").then((res) => {
      setInnovativePower(res.data);
    });
  }, []);
  return (
    <>
      <div className="slider__carousel">
        <Slider {...innovativePowerSlider}>
          {innovativePower.length !== 0 &&
            innovativePower.map((item, id) => {
              return (
                <div key={id} className="slider__box__card">
                  <div className="software__img">
                    <img
                      src={`${imgUrl}${item.image}`}
                      className="img-fluid"
                      style={{ height: "300px" }}
                      alt="software_img"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </>
  );
};

export default SliderTop;
