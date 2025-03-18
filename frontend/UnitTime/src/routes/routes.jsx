import adminRoutes from "../routes/AdminRoutes";
import userRoutes from "../routes/UserRoutes";

const routes = [...adminRoutes, ...userRoutes];
 
export default routes;
