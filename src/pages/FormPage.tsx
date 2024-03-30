import { ReactFlowProvider } from "reactflow";
import ReactFlowForm from "../react-flow";

const FormPage = () => {
  return (
    <ReactFlowProvider>
      <ReactFlowForm />
    </ReactFlowProvider>
  );
};

export default FormPage;
