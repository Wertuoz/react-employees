import { Layout, Space, Typography } from "antd";
import { TeamOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { CustomButton } from "../customButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate(`${Paths.login}`);
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="text" ghost>
            <Typography.Title level={3}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="text"
          icon={<LoginOutlined />}
          onClick={onLogoutClick}
        >
          Logout
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton icon={<UserOutlined />} type="text">
              Register
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton icon={<LoginOutlined />} type="text">
              Log In
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
