import React from "react";
import slider1 from "../../assets/user/img/CoteMainSlider/slider-1.jpg"
import slider2 from "../../assets/user/img/CoteMainSlider/slider-2.jpg"
import slider3 from "../../assets/user/img/CoteMainSlider/slider-3.jpg"
import slider4 from "../../assets/user/img/CoteMainSlider/slider-4.jpg"
import slider5 from "../../assets/user/img/CoteMainSlider/slider-5.jpg"
import slider6 from "../../assets/user/img/CoteMainSlider/slider-6.jpg"
import slider7 from "../../assets/user/img/CoteMainSlider/slider-7.jpg"
import slider8 from "../../assets/user/img/CoteMainSlider/slider-8.jpg"
function VoteSlider() {
  return (
    <div>
      <div className="banner">
        <div className="slider" style={{ "--quantity": 8 }}>
          <div className="item" style={{ "--position": 1 }}>
            <img src={slider1} alt="Slide 1" />
          </div>
          <div className="item" style={{ "--position": 2 }}>
            <img src={slider2} alt="Slide 2" />
          </div>
          <div className="item" style={{ "--position": 3 }}>
            <img src={slider3} alt="Slide 3" />
          </div>
          <div className="item" style={{ "--position": 4 }}>
            <img src={slider4} alt="Slide 4" />
          </div>
          <div className="item" style={{ "--position": 5 }}>
            <img src={slider5} alt="Slide 5" />
          </div>
          <div className="item" style={{ "--position": 6 }}>
            <img src={slider6} alt="Slide 6" />
          </div>
          <div className="item" style={{ "--position": 7 }}>
            <img src={slider7} alt="Slide 7" />
          </div>
          <div className="item" style={{ "--position": 8 }}>
            <img src={slider8}alt="Slide 8" />
          </div>
        </div>
        <div className="slider_content">
          {/* <h1 data-content="Vote Here">Vote Here</h1> */}
         
          {/* <div className="model"></div> */}
        </div>
      </div>
    </div>
  );
}

export default VoteSlider;
