import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import team1 from '../../assets/user/img/team-1.jpg';
import team2 from '../../assets/user/img/team-2.jpg';
import team3 from '../../assets/user/img/team-3.jpg';
import team4 from '../../assets/user/img/team-4.jpg';

const imageList = [team1, team2, team3, team4];
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import dayjs from "dayjs";
import Swal from "sweetalert2";
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
                    Professors: voteItem.professors.map((prof, index) => ({
                      id: prof.id,
                      imageUrl: prof.imageBase64 
                      ? `data:image/jpeg;base64,${prof.imageBase64}` 
                      : prof.imageUrl || imageList[index % imageList.length],
                     // ✅ now index is defined
                      name: prof.full_name,
                      module: prof.course?.courseCode || "N/A"
                    }))
                    
                }));
                console.log("Data aray : ", transformed)
                setVoteData(transformed);
            })
            .catch((error) => {
                console.error("Error fetching vote data:", error);
            });
    }, []);

    const handleVote = async (voteId, professorId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("Local Storage User:", user);
      
        if (!user || !user.userId) {
          Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "Please log in first to vote.",
            confirmButtonColor: "#3085d6"
          });
          return;
        }
      
        try {
          // Step 1: Fetch all existing votes of the user
          const existingVotesRes = await axios.get("http://localhost:8086/api/uservote/");
          const allVotes = existingVotesRes.data;
      
          // Step 2: Check if the user has already voted in this poll
          const existingVote = allVotes.find(
            (vote) =>
              vote.user?.id === user.userId &&
              vote.vote?.id === voteId
          );
      
          if (existingVote) {
            // Step 3: Show alert with option to delete existing vote
            Swal.fire({
              icon: "info",
              title: "Already Voted",
              text: "You have already voted in this poll. Do you want to change your vote?",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete my vote",
              cancelButtonText: "No, keep my vote"
            }).then(async (result) => {
              if (result.isConfirmed) {
                // Step 4: Delete the existing vote if confirmed
                try {
                  const deleteVoteRes = await axios.delete(`http://localhost:8086/api/uservote/${existingVote.id}`);
                  if (deleteVoteRes.status === 200) {
                    Swal.fire({
                      icon: "success",
                      title: "Vote Deleted",
                      text: "Your previous vote has been deleted. You can now submit a new vote.",
                      confirmButtonColor: "#3085d6"
                    });
                    // Now submit the new vote
                    submitVote(voteId, professorId);
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Deletion Failed",
                      text: "Unable to delete your vote at this time.",
                      confirmButtonColor: "#d33"
                    });
                  }
                } catch (error) {
                  console.error("Error deleting vote:", error);
                  Swal.fire({
                    icon: "error",
                    title: "An Error Occurred",
                    text: "Unable to delete your vote.",
                    confirmButtonColor: "#d33"
                  });
                }
              }
            });
          } else {
            // If no existing vote, directly submit the vote
            submitVote(voteId, professorId);
          }
        } catch (error) {
          console.error("Error fetching existing votes:", error);
          Swal.fire({
            icon: "error",
            title: "An Error Occurred",
            text: "Unable to fetch your previous votes.",
            confirmButtonColor: "#d33"
          });
        }
      };
      
      // Helper function to submit the new vote
      const submitVote = async (voteId, professorId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        
        const votePayload = {
          user: { id: user.userId },
          vote: { id: voteId },
          professor: { id: professorId }
        };
      
        try {
          const response = await axios.post("http://localhost:8086/api/uservote/create", votePayload);
      
          if (response.status === 201 || response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Vote Submitted!",
              text: "Your vote has been recorded.",
              confirmButtonColor: "#3085d6"
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Submission Failed",
              text: "Failed to submit vote.",
              confirmButtonColor: "#d33"
            });
          }
        } catch (error) {
          console.error("Error submitting vote:", error);
          Swal.fire({
            icon: "error",
            title: "An Error Occurred",
            text: "Unable to complete your vote at this time.",
            confirmButtonColor: "#d33"
          });
        }
      };
      
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
                                            <img className="img-fluid w-100" src={professor.imageUrl} alt={professor.name} style={{ width: '302px', height: '300px', objectFit: 'cover', borderRadius: '8px' }} />
                                            <div className="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
                                                <a className="btn btn-outline-light text-center mr-2 px-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: "38px", height: "38px" }} href="#">
                                                    <i className="fa-solid fa-arrow-left"></i>
                                                </a>
                                                <a
  className="btn btn-outline-light text-center mr-2 px-0 d-flex align-items-center justify-content-center"
  style={{ width: "38px", height: "38px", fontSize: "12px", fontWeight: "bold" }}
  href="#"
  onClick={(e) => {
    e.preventDefault();
    handleVote(vote.id, professor.id);
  }}
>
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
