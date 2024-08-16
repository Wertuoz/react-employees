import React, { FC, useEffect } from "react";
import { Layout } from "../../components/layout";
import { CustomButton } from "../../components/customButton";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

const columns: ColumnsType<Employee> = [
  { title: "Name", dataIndex: "firstName", key: "firstName" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Address", dataIndex: "address", key: "address" },
];

export const Employees: FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      navigate(`${Paths.login}`);
    }
  }, [navigate, user]);

  const onAddEmployee = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={onAddEmployee}
        icon={<PlusCircleOutlined />}
      >
        Add employee
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`${Paths.employee}/${record.id}`);
            },
          };
        }}
      />
    </Layout>
  );
};
