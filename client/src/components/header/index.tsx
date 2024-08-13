import { Layout, Space, Typography } from "antd";
import { TeamOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { CustomButton } from "../customButton";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Header = () => {
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
    </Layout.Header>
  );
};
