import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay  } from "swiper/modules";

import ProfessorsData from "../../data//ProfessorsData"; // Import professor list

const VoteBar = () => {
  const startTime = "10:00 AM";
  const endTime = "5:00 PM";
  const voteModule = "Software Engineering"; // Example module

  return (
    <div>
         
        <div className="container-fluid pt-5">
        <div className="vote_container">
            
            {/* Voting Info */}
            <div className="text-center pb-2">
            <p className="section-title px-5">
                <span className="px-2">Vote Professors</span>
            </p>
           
            <p><strong>Voting Time:</strong> {startTime} - {endTime}</p>
            <p><strong>Module:</strong> {voteModule}</p>
            </div>

            {/* Professor Slider */}
            <div>
                    <Swiper
            style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative" }}
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2000, disableOnInteraction: false }} 
            breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
            }}
            >



                    {ProfessorsData.map((professor, index) => (
                    <SwiperSlide key={`${professor.id}-${professor.name}-${index}`}> {/* Use index to ensure unique key */}
                        <div className="text-center team">
                        <div className="position-relative overflow-hidden mb-4" style={{ borderRadius: "100%" }}>
                            <img className="img-fluid w-100" src={professor.imageUrl} alt={professor.name} />
                            <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                            <a className="btn btn-outline-light text-center mr-2 px-0 d-flex align-items-center justify-content-center" 
                                style={{ width: "38px", height: "38px" }} 
                                href="#">
                                <i className="fa-solid fa-arrow-left"></i>
                            </a>

                            <a className="btn btn-outline-light text-center mr-2 px-0 d-flex align-items-center justify-content-center" 
                                style={{ width: "38px", height: "38px", fontSize: "12px", fontWeight: "bold" }} 
                                href="#">
                                Vote
                            </a>

                            <a className="btn btn-outline-light text-center px-0 d-flex align-items-center justify-content-center" 
                                style={{ width: "38px", height: "38px" }} 
                                href="#">
                                <i className="fa-solid fa-arrow-right"></i>
                            </a>
                            </div>
                        </div>
                        <h4>{professor.name}</h4>
                        <i>{professor.module}</i>
                        </div>
                    </SwiperSlide>
                    ))}

                </Swiper>
            </div>
            
        </div>
        </div>

        <hr/>

          
        <div className="container-fluid pt-5">
        <div className="vote_container">
            
            {/* Voting Info */}
            <div className="text-center pb-2">
            <p className="section-title px-5">
                <span className="px-2">Vote Professors</span>
            </p>
           
            <p><strong>Voting Time:</strong> {startTime} - {endTime}</p>
            <p><strong>Module:</strong> {voteModule}</p>
            </div>

            {/* Professor Slider */}
            <div>
                    <Swiper
            style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative" }}
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 2000, disableOnInteraction: false }} 
            breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 }
            }}
            >



                    {ProfessorsData.map((professor, index) => (
                    <SwiperSlide key={`${professor.id}-${professor.name}-${index}`}> {/* Use index to ensure unique key */}
                        <div className="text-center team">
                        <div className="position-relative overflow-hidden mb-4" style={{ borderRadius: "100%" }}>
                            <img className="img-fluid w-100" src={professor.imageUrl} alt={professor.name} />
                            <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                            <a className="btn btn-outline-light text-center mr-2 px-0 d-flex align-items-center justify-content-center" 
                                style={{ width: "38px", height: "38px" }} 
                                href="#">
                                <i className="fa-solid fa-arrow-left"></i>
                            </a>

                            <a className="btn btn-outline-light text-center mr-2 px-0 d-flex align-items-center justify-content-center" 
                                style={{ width: "38px", height: "38px", fontSize: "12px", fontWeight: "bold" }} 
                                href="#">
                                Vote
                            </a>

                            <a className="btn btn-outline-light text-center px-0 d-flex align-items-center justify-content-center" 
                                style={{ width: "38px", height: "38px" }} 
                                href="#">
                                <i className="fa-solid fa-arrow-right"></i>
                            </a>
                            </div>
                        </div>
                        <h4>{professor.name}</h4>
                        <i>{professor.module}</i>
                        </div>
                    </SwiperSlide>
                    ))}

                </Swiper>
            </div>
            
        </div>
        </div>

        <hr/>
    </div>
  );
};

export default VoteBar;
