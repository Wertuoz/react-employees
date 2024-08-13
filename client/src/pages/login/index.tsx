import React, { useState } from "react";
import { Layout } from "../../components/layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { CustomInput } from "../../components/customInput";
import { PasswordInput } from "../../components/passwordInput";
import { CustomButton } from "../../components/customButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/errorCheck";
import { ErrorMessage } from "../../components/errorMessage";

export const Login = () => {
  const navigate = useNavigate();

  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState("");

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate(Paths.home);
    } catch (err) {
      const possibleError = isErrorWithMessage(err);
      if (possibleError) {
        setError(err.data.message);
      } else {
        setError("Unknown issue");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Enter" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton type="primary" htmlType="submit">
              Log In
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              No Account? <Link to={Paths.register}>Sign Up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
