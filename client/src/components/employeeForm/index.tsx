import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import React, { FC } from "react";
import { CustomInput } from "../customInput";
import { ErrorMessage } from "../errorMessage";
import { CustomButton } from "../customButton";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};
export const EmployeeForm: FC<Props<Employee>> = ({
  btnText,
  onFinish,
  title,
  employee,
  error,
}) => {
  return (
    <Card title={title} style={{ widows: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="Name" />
        <CustomInput type="text" name="lastName" placeholder="Last name" />
        <CustomInput type="text" name="age" placeholder="Age" />
        <CustomInput type="text" name="address" placeholder="Address" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
