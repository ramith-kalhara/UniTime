
import Index from "../views/admin/Index.jsx";
import Login from "../views/admin/Login.jsx";
import Professor from "../views/admin/Professor.jsx";
import Schedule from "../views/admin/Schedule.jsx";
import Room from "../views/admin/Room.jsx";
import Course from "../views/admin/Course.jsx";
import Icons from "../views/admin/Icons.jsx";
import ProfessorTable from "../views/admin/ProfessorTable.jsx";
import CourseTable from "../views/admin/CourseTable.jsx";
import RoomTable from "../views/admin/RoomTable.jsx";
import ScheduleTable from "../views/admin/ScheduleTable.jsx";
import RoomUpdate from "../views/admin/RoomUpdate.jsx";
import CourseUpdate from "../views/admin/CourseUpdate.jsx";
import ProfessorUpdate from "../views/admin/ProfessorUpdate.jsx";
import ScheduleUpdate from "../views/admin/ScheduleUpdate.jsx";
import Vote from "../views/admin/Vote.jsx";

var AdminRoutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/add-professor",
    name: "Add Professor",
    icon: "ni ni-single-02 text-yellow",
    component: <Professor />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/add-schedule",
    name: "Add Schedule",
    icon: "ni ni-calendar-grid-58 text-info",
    component: <Schedule />,
    layout: "/admin",
  },
  {
    path: "/add-room",
    name: "Add Room",
    icon: "ni ni-shop text-red",
    component: <Room />,
    layout: "/admin",
  },
  {
    path: "/add-course",
    name: "Add Course",
    icon: "ni ni-collection text-blue",
    component: <Course />,
    layout: "/admin",
  },
  {
    path: "/course-table",
    name: "Course",
    icon: "ni ni-bullet-list-67 text-red",
    component: < CourseTable/>,
    layout: "/admin",
  },
  {
    path: "/professor-table",
    name: "Professor",
    icon: "ni ni-active-40 text-blue",
    component: < ProfessorTable/>,
    layout: "/admin",
  },
  {
    path: "/room-table",
    name: "Room",
    icon: "ni ni-building text-teal",
    component: < RoomTable/>,
    layout: "/admin",
  },
  {
    path: "/schedule-table",
    name: "Schedule",
    icon: "ni ni-books text-cyan",
    component: < ScheduleTable/>,
    layout: "/admin",
  },
  {
    path: "/update-room",
    name: "update room",
    icon: "ni ni-books text-cyan",
    component: < RoomUpdate/>,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/update-course",
    name: "update course",
    icon: "ni ni-books text-cyan",
    component: < CourseUpdate/>,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/update-professor",
    name: "update professor",
    icon: "ni ni-books text-cyan",
    component: < ProfessorUpdate/>,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/update-schedule",
    name: "update schedule",
    icon: "ni ni-books text-cyan",
    component: < ScheduleUpdate/>,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/vote",
    name: "Vote",
    icon: "ni ni-collection text-blue",
    component: < Vote/>,
    layout: "/admin",
  },
 
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  }
];
export default AdminRoutes;
