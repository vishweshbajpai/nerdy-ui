import { Handle, Position } from "reactflow";
import ChildIcon from "../../assets/icons/ChildIcon";
import FlagIcon from "../../assets/icons/FlagIcon";

const Winner = () => {
  return (
    <div>
      <div className="flex items-center">
        <div className="flex flex-col items-center gap-6">
          <FlagIcon />
        </div>
        <ChildIcon />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default Winner;
