import { Input, Tooltip } from "antd";
import AirplaneIcon from "../../assets/icons/AirplaneIcon";
import RightArrowIcon from "../../assets/icons/RightArrowIcon";
import LevelsLayout from "../../components/LevelsLayout";
import { HiddenKeys, LocalStorageKeys } from "../../utils/enum";
import { Handle, Position } from "reactflow";
import { useRecoilState } from "recoil";
import { destination } from "../../recoil/atom";
import { IUserDetails } from "../../types";
import useLocalStorage from "../../hooks/useLocalStorage";

const Journey = () => {
  const [getValue] = useLocalStorage();
  const userDetails: IUserDetails = getValue(
    LocalStorageKeys.userDetails
  ) as IUserDetails;
  const [destinationValue, setDestinationValue] = useRecoilState(destination);
  const infoMessage = (
    <span>
      Embarking on a journey, a ticket in hand,
      <br />
      To a destination, across sea and land.
      <br />
      But look closer now, <b>inspect</b> with care,
      <br />
      The answer lies hidden in destination, if you dare.
    </span>
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationValue(e.target.value);
  };

  return (
    <LevelsLayout
      title="Beginning of a Journey"
      info={infoMessage}
      audioSrc="/JourneyAudio.wav"
    >
      <div className="relative text-black text-2xl font-bold">
        <AirplaneIcon />
        <div className="flex gap-6 items-center absolute top-[274px] left-48">
          <span className="">{userDetails.city}</span>
          <RightArrowIcon />
          <Input
            id={HiddenKeys.TREASURE_ISLAND}
            value={destinationValue}
            placeholder="Destination"
            onChange={onChangeHandler}
            className="w-[170px]"
          />
        </div>
      </div>
      <Tooltip title="Click and Drag">
        <Handle type="source" position={Position.Bottom} />
      </Tooltip>
    </LevelsLayout>
  );
};

export default Journey;
