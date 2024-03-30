import { Tooltip } from "antd";
import { ReactNode } from "react";
import InfoIcon from "../assets/icons/InfoIcon";

interface LevelsLayoutProps {
  title: string;
  info: string | ReactNode;
  audioSrc: string;
  children: ReactNode;
}

const LevelsLayout = ({
  title,
  info,
  audioSrc,
  children,
}: LevelsLayoutProps) => {
  const audio = new Audio(audioSrc);

  const testing = (open: boolean) => {
    if (open) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div className="w-[1000px] p-5 flex flex-col items-center gap-52">
      <div className="flex items-center justify-center gap-6 text-white font-semibold text-4xl">
        <h1>{title}</h1>
        <Tooltip
          title={info}
          placement="rightTop"
          overlayClassName="whitespace-nowrap min-w-fit text-[16px]"
          onOpenChange={testing}
        >
          <span>
            <InfoIcon />
          </span>
        </Tooltip>
      </div>
      {children}
    </div>
  );
};

export default LevelsLayout;
