import React from "react";
import LevelsLayout from "../../components/LevelsLayout";
import { Input } from "antd";
import { Handle, Position } from "reactflow";
import { useRecoilState } from "recoil";
import { treasureKey } from "../../recoil/atom";
import TreasureIcon from "../../assets/icons/TreasureIcon";

const Treasure = () => {
  const [treasureKeyValue, setTreasureKeyValue] = useRecoilState(treasureKey);
  const infoMessage = (
    <span>
      In a secret vault, a storage deep, <br />A <b>token</b> rests, encrypted
      and unseen. <br />
      Decode its secrets, unveil its might,
      <br />
      Enter the <b>key</b>, to claim your right.
    </span>
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTreasureKeyValue(e.target.value);
  };

  return (
    <LevelsLayout
      title="The Treasure"
      info={infoMessage}
      audioSrc="/TreasureAudio.wav"
    >
      <div className="relative">
        <TreasureIcon />
        <Input
          value={treasureKeyValue}
          placeholder="Enter Key"
          onChange={onChangeHandler}
          className="text-xl mt-24"
        />
        <Handle type="source" position={Position.Bottom} />
      </div>
    </LevelsLayout>
  );
};

export default Treasure;
