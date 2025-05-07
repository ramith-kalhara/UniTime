import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import defaultImg from "../../assets/user/img/team-4.jpg"
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import dayjs from "dayjs";

const VoteBar = () => {
    const [voteData, setVoteData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8086/api/vote/")
            .then((response) => {
                const transformed = response.data.map((voteItem) => ({
                    id: voteItem.id,
                    startTime: voteItem.startTime,
                    endTime: voteItem.endTime,
                    moduleId: voteItem.professors?.course?.courseCode,
                    Professors: voteItem.professors.map((prof) => ({
                        id: prof.id,
                        imageUrl: prof.imageUrl || defaultImg
                        , // fallback image
                        name: prof.full_name,
                        module: prof.course?.courseCode || "N/A"
                    }))
                }));
                setVoteData(transformed);
            })
            .catch((error) => {
                console.error("Error fetching vote data:", error);
            });
    }, []);

    return (
        <div className="container-fluid pt-5">
            <div className="vote_container">


                {voteData.map((vote) => (
                    <div key={vote.id} className="mb-5">
                        <div className="text-center pb-2">
                            <p className="section-title px-5">
                                <span className="px-2">Vote Professors</span>
                            </p>
                        </div>
                        <p className="text-center">
                            <strong>Start Time:</strong> {dayjs(vote.startTime).format("YYYY-MM-DD - HH:mm:ss")}<br/>{" "}
                            <strong>End Time:</strong> - {dayjs(vote.endTime).format("YYYY-MM-DD - HH:mm:ss")}
                        </p>

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
                            {vote.Professors.map((professor, index) => (
                                <SwiperSlide key={`${vote.id}-${professor.id}-${index}`}>
                                    <div className="text-center team">
                                        <div className="position-relative overflow-hidden mb-4" style={{ borderRadius: "100%" }}>
                                            <img className="img-fluid w-100" src={professor.imageUrl} alt={professor.name} />
                                            <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                                                <a className="btn btn-outline-light text-center mr-2 px-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "38px", height: "38px" }} href="#">
                                                    <i className="fa-solid fa-arrow-left"></i>
                                                </a>
                                                <a className="btn btn-outline-light text-center mr-2 px-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "38px", height: "38px", fontSize: "12px", fontWeight: "bold" }} href="#">
                                                    Vote
                                                </a>
                                                <a className="btn btn-outline-light text-center px-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "38px", height: "38px" }} href="#">
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

                ))}
            </div>
        </div>
    );
};

export default VoteBar;
