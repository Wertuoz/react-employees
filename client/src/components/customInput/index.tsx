import { Form, Input } from "antd";
import { FC } from "react";

type Props = { name?: string; placeholder?: string; type?: string };

export const CustomInput: FC<Props> = ({
  name,
  placeholder,
  type = "text",
}) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate
      rules={[{ required: true, message: "Required field" }]}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};
