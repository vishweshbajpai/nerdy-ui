import React from "react";
import LevelsLayout from "../../components/LevelsLayout";
import { Input, Tooltip } from "antd";
import { Handle, Position } from "reactflow";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IUserDetails } from "../../types";
import { LocalStorageKeys } from "../../utils/enum";
import { useRecoilState } from "recoil";
import { ninja } from "../../recoil/atom";
import { getUserBirthYear } from "../../utils/common";

const Ninja = () => {
  const [ninjaValue, setNinjaValue] = useRecoilState(ninja);
  const [getValue] = useLocalStorage();
  const userDetails: IUserDetails = getValue(
    LocalStorageKeys.userDetails
  ) as IUserDetails;
  const binaryValue = getUserBirthYear(userDetails.age)?.toString(2);
  const infoMessage = (
    <span>
      The answer's near, but hard to see,
      <br />
      Illuminate the <b>background</b>, and you'll be free.
    </span>
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNinjaValue(e.target.value);
  };

  return (
    <LevelsLayout
      title="Verify you're a Ninja"
      info={infoMessage}
      audioSrc="/NinjaAudio.wav"
    >
      <div className="relative flex flex-col items-center">
        <div className="flex">
          <img
            src="/Byakugan.png"
            alt="byakugan"
            style={{ transform: "rotateY(180deg)" }}
          />
          <img src="/Byakugan.png" alt="byakugan" />
        </div>
        <div className="mt-24">
          <div className="text-[#242424]">{binaryValue}</div>
        </div>
        <Input
          value={ninjaValue}
          placeholder="Enter PIN"
          onChange={onChangeHandler}
          className="w-[170px]"
        />
        <Tooltip title="Click and Drag">
          <Handle type="source" position={Position.Bottom} />
        </Tooltip>
      </div>
    </LevelsLayout>
  );
};

export default Ninja;
