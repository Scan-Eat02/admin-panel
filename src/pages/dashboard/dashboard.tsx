import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { Button } from "antd";
import { USER_ACCESS_KEY } from "@/utils/enums";

const Dashboard = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    Cookie.remove(USER_ACCESS_KEY.TOKEN);
    navigate("/login");
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};
export default Dashboard;
