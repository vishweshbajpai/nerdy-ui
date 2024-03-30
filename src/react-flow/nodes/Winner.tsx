import { Handle, Position } from "reactflow";
import ChildIcon from "../../assets/icons/ChildIcon";
import FlagIcon from "../../assets/icons/FlagIcon";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IUserDetails } from "../../types";
import { LocalStorageKeys } from "../../utils/enum";

const Winner = () => {
  const [getValue] = useLocalStorage();
  const userDetails: IUserDetails = getValue(
    LocalStorageKeys.userDetails
  ) as IUserDetails;

  return (
    <div>
      <div className="flex">
        <div>
          <FlagIcon />
          <div className="text-5xl">Congratulations {userDetails.name}</div>
        </div>
        <ChildIcon />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default Winner;
