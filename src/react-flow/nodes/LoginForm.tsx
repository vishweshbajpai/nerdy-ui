import { useEffect } from "react";
import { Form, Input, Card } from "antd";
import { Handle, Position } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { formSource, loginForm } from "../../recoil/atom";
import { useForm } from "antd/es/form/Form";
import { FieldNames } from "../../utils/enum";

const LoginForm = () => {
  const [formData, setFormData] = useRecoilState(loginForm);
  const formSourceValue = useRecoilValue(formSource);
  const [form] = useForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      formInstance: {
        getFieldsValue: form.getFieldsValue,
        resetFields: form.resetFields,
        validateFields: form.validateFields,
      },
    });
  }, [form]);

  return (
    <>
      <Card
        bordered
        className={`w-[400px] transition-all duration-500 ${
          formSourceValue === "login"
            ? "shadow-2xl shadow-white"
            : "shadow-2xl shadow-black"
        }`}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label={<span className="font-medium text-lg">Email</span>}
            name={FieldNames.email}
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email address!" },
            ]}
          >
            <Input onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-lg">Password</span>}
            name={FieldNames.password}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default LoginForm;
