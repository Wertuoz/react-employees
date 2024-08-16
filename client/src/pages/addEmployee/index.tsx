import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employeeForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { Employee } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/errorCheck";

export const AddEmployee = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [navigate, user]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      navigate(`${Paths.status}/created`);
    } catch (err) {
      const possibleError = isErrorWithMessage(err);

      if (possibleError) setError(err.data.message);
      else setError("Unknown issue");
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Edit employee"
          btnText="Add"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};
