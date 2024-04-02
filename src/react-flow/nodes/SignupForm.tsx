import { Form, Input, Card, Tooltip } from "antd";
import { Handle, Position } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { formSource, signupForm } from "../../recoil/atom";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef } from "react";
import { FieldNames } from "../../utils/enum";

const SignupForm = () => {
  const [formData, setFormData] = useRecoilState(signupForm);
  const formSourceValue = useRecoilValue(formSource);
  const [form] = useForm();
  const containerRef = useRef<HTMLDivElement>(null);

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
          formSourceValue === "signup"
            ? "shadow-2xl shadow-white"
            : "shadow-2xl shadow-black"
        }`}
        ref={containerRef}
        title={<span className="text-3xl text-center">Sign Up</span>}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label={<span className="font-medium text-lg">Name</span>}
            name={FieldNames.name}
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-lg">Email</span>}
            name={FieldNames.email}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email address" },
            ]}
          >
            <Input onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-lg">Password</span>}
            name={FieldNames.password}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-lg">Age</span>}
            name={FieldNames.age}
            rules={[
              { required: true, message: "Please enter your age" },
              {
                validator: (_, value) => {
                  if (value >= 12) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Age should be 12 or above");
                },
              },
            ]}
          >
            <Input type="number" onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-lg">City</span>}
            name={FieldNames.city}
            rules={[{ required: true, message: "Please enter your city" }]}
          >
            <Input onChange={handleInputChange} />
          </Form.Item>
        </Form>
      </Card>
      <Tooltip title="Click and Drag">
        <Handle type="source" position={Position.Bottom} />
      </Tooltip>
    </>
  );
};

export default SignupForm;
