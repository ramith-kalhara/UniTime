import About from "../views/user/About";
import Contact from "../views/user/Contact";
import Course from "../views/user/Course";
import Home from "../views/user/Home";
import Professor from "../views/user/Professor";
import Rooms from "../views/user/Rooms";
import Shedule from "../views/user/Shedule";
import SingleCourse from "../views/user/SingleCourse";
import Vote from "../views/user/Vote";

var UserRoutes = [
    {
        path: "/home",
        name: "home",
        component: < Home/>,
        layout: "/user",
        hidden: true,
      },
      {
        path: "/about",
        name: "about",
        component: < About/>,
        layout: "/user",
        hidden: true,
      },
      {
        path: "/room",
        name: "rooms",
        component: < Rooms/>,
        layout: "/user",
        hidden: true,
      },
      {
        path: "/professor",
        name: "Professor",
        component: < Professor/>,
        layout: "/user",
        hidden: true,
      },
      {
        path: "/course",
        name: "Course",
        component: < Course/>,
        layout: "/user",
        hidden: true,
      },
      {
        path: "/shedule",
        name: "Shedule",
        component: < Shedule/>,
        layout: "/user",
        hidden: true,
      },
      {
        path: "/contact",
        name: "Contact",
        component: < Contact/>,
        layout: "/user",
        hidden: true,
      },
      {
        path: "/singleCourse/:id",
        name: "singleCourse",
        component: < SingleCourse/>,
        layout: "/user",
        hidden: true,
      },
      {
        path: "/vote",
        name: "vote",
        component: < Vote/>,
        layout: "/user",
        hidden: true,
      },

];
export default UserRoutes;
