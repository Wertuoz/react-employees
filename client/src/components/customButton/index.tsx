import React, { FC } from "react";
import { Button, Form } from "antd";
import { ButtonHTMLType, ButtonShape, ButtonType } from "antd/es/button";

type Props = {
  children: React.ReactNode;
  htmlType?: ButtonHTMLType;
  onClick?: () => void;
  type?: ButtonType;
  danger?: boolean;
  loading?: boolean;
  shape?: ButtonShape;
  icon?: React.ReactNode;
  ghost?: boolean;
  style?: React.CSSProperties;
};

export const CustomButton: FC<Props> = ({
  children,
  htmlType = "button",
  onClick,
  type,
  danger,
  loading,
  shape,
  icon,
  ghost,
  style,
}) => {
  return (
    <Form.Item>
      <Button
        type={type}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        ghost={ghost}
        style={style}
        // style={{
        //   background: "#f0f",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   verticalAlign: "center",
        // }}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
