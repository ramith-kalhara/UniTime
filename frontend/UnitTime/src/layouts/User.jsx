import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "reactstrap";

import UserNavbar from "../components/Navbars/UserNavbar.jsx";

import userRoutes from "../routes/UserRoutes.jsx";
import UserFooter from "../components/Footers/UserFooter.jsx";

const User = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (userRoutes) => {
    return userRoutes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < userRoutes.length; i++) {
      if (
        props?.location?.pathname.indexOf(
          userRoutes[i].layout + userRoutes[i].path
        ) !== -1
      ) {
        return userRoutes[i].name;
      }
    }
    return "User Dashboard";
  };

  return (
    <>
      
      <div className="main-content" ref={mainContent}>
        <UserNavbar {...props} brandText={getBrandText(props?.location?.pathname)} />
        <Routes>
          {getRoutes(userRoutes)}
          <Route path="*" element={<Navigate to="/user/home" replace />} />
        </Routes>
        
        <a href="#" className="btn btn-primary p-3 back-to-top"><i className="fa fa-angle-double-up" /></a>
        <Container fluid>
           <UserFooter /> 
        </Container>
      </div>
    </>
  );
};

export default User;
