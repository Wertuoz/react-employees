import React from "react";
import { Layout } from "../../components/layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { CustomInput } from "../../components/customInput";
import { PasswordInput } from "../../components/passwordInput";
import { CustomButton } from "../../components/customButton";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";

export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Register" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <CustomButton type="primary" htmlType="submit">
              Register
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already registered? <Link to={Paths.login}>Log In</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
