import React from "react";
import LevelsLayout from "../../components/LevelsLayout";
import { Handle, Position } from "reactflow";
import { Input } from "antd";
import { useRecoilState } from "recoil";
import { broken } from "../../recoil/atom";
import { HiddenKeys } from "../../utils/enum";
import "./index.css";

const Broken = () => {
  const [brokenValue, setBrokenValue] = useRecoilState(broken);
  const infoMessage = (
    <span>
      Disable the spin, and break the spell.
      <br />
      Look for the error code, where <b>logs</b> dwell
    </span>
  );
  console.log("ERROR CODE: ", HiddenKeys.GHOOMAR);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrokenValue(e.target.value);
  };

  return (
    <LevelsLayout title="Broken" info={infoMessage} audioSrc="/BrokenAudio.wav">
      <div className="abnormal mt-24 relative">
        <Input
          value={brokenValue}
          placeholder="Enter Error Code"
          onChange={onChangeHandler}
          className="text-xl"
        />
        <Handle type="source" position={Position.Bottom} />
      </div>
    </LevelsLayout>
  );
};

export default Broken;
