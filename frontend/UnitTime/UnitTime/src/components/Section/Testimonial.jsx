import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css"; 
import "owl.carousel/dist/assets/owl.theme.default.css"; 
import testimonial1 from "../../assets/user/img/testimonial-1.jpg";
import testimonial2 from "../../assets/user/img/testimonial-2.jpg";
import testimonial3 from "../../assets/user/img/testimonial-3.jpg";
import testimonial4 from "../../assets/user/img/testimonial-4.jpg";

// To disable React StrictMode warnings for this component
import { Suspense } from 'react';

function Testimonial() {
  useEffect(() => {
    import("owl.carousel").then(() => {
      $(".owl-carousel").owlCarousel();  // Ensures the JS is applied
    });
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {/* Testimonial Start */}
        <div className="container-fluid py-5">
          <div className="container p-0">
            <div className="text-center pb-2">
              <p className="section-title px-5">
                <span className="px-2">Testimonial</span>
              </p>
              <h1 className="mb-4">What Parents Say!</h1>
            </div>
            
            {/* Owl Carousel Component */}
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              autoplay
              autoplayTimeout={3000}
              responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
              }}
            >
              {/* Testimonial 1 */}
              <div className="testimonial-item px-3">
                <div className="bg-light shadow-sm rounded mb-4 p-4">
                  <i className="fas fa-quote-left text-primary mr-3"></i>
                  Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum clita.
                </div>
                <div className="d-flex align-items-center">
                  <img className="rounded-circle" src={testimonial1} style={{ width: '70px', height: '70px' }} alt="Parent" />
                  <div className="pl-3">
                    <h5>Parent Name</h5>
                    <i>Profession</i>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="testimonial-item px-3">
                <div className="bg-light shadow-sm rounded mb-4 p-4">
                  <i className="fas fa-quote-left text-primary mr-3"></i>
                  Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum clita.
                </div>
                <div className="d-flex align-items-center">
                  <img className="rounded-circle" src={testimonial2} style={{ width: '70px', height: '70px' }} alt="Parent" />
                  <div className="pl-3">
                    <h5>Parent Name</h5>
                    <i>Profession</i>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="testimonial-item px-3">
                <div className="bg-light shadow-sm rounded mb-4 p-4">
                  <i className="fas fa-quote-left text-primary mr-3"></i>
                  Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum clita.
                </div>
                <div className="d-flex align-items-center">
                  <img className="rounded-circle" src={testimonial3} style={{ width: '70px', height: '70px' }} alt="Parent" />
                  <div className="pl-3">
                    <h5>Parent Name</h5>
                    <i>Profession</i>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="testimonial-item px-3">
                <div className="bg-light shadow-sm rounded mb-4 p-4">
                  <i className="fas fa-quote-left text-primary mr-3"></i>
                  Sed ea amet kasd elitr stet, stet rebum et ipsum est duo elitr eirmod clita lorem. Dolor tempor ipsum clita.
                </div>
                <div className="d-flex align-items-center">
                  <img className="rounded-circle" src={testimonial4} style={{ width: '70px', height: '70px' }} alt="Parent" />
                  <div className="pl-3">
                    <h5>Parent Name</h5>
                    <i>Profession</i>
                  </div>
                </div>
              </div>

            </OwlCarousel>
          </div>
        </div>
        {/* Testimonial End */}
      </div>
    </Suspense>
  );
}

export default Testimonial;
