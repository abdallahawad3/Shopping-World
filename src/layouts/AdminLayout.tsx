import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div>
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
