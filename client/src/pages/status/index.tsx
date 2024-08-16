import { Button, Result, Row } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Paths } from "../../paths";

const Statuses: Record<string, string> = {
  created: "User created successfully",
  updated: "User updated successfully",
  deleted: "User deleted successfully",
};

export const Status = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? "success" : 404}
        title={status ? Statuses[status] : "Not found"}
        extra={
          <Button key="dashboard">
            <Link to={Paths.home}>To home</Link>
          </Button>
        }
      />
    </Row>
  );
};
