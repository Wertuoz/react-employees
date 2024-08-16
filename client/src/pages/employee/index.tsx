import React, { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { Layout } from "../../components/layout";
import { Descriptions, Divider, Modal, Space } from "antd";
import { CustomButton } from "../../components/customButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../components/errorMessage";
import { isErrorWithMessage } from "../../utils/errorCheck";

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) return <span>Loading</span>;

  if (!data) return <Navigate to={Paths.home} />;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = async () => {
    setIsModalOpen(false);
    try {
      await removeEmployee(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
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
      <Descriptions title="Info about employee" bordered>
        <Descriptions.Item
          label="Name"
          span={3}
        >{`${data.firstName} ${data.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Age" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Edit
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Remove
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Approve deletion"
        open={isModalOpen}
        onOk={handleDeleteEmployee}
        onCancel={hideModal}
        okText="Approve"
        cancelText="Cancel"
      >
        Are you sure you want to delete employee from table?
      </Modal>
    </Layout>
  );
};
