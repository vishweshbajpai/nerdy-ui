import { Panel } from "reactflow";
import InfoIcon from "../../assets/icons/InfoIcon";

const InfoPanel = () => {
  return (
    <Panel
      position="top-right"
      className="bg-yellow-200 rounded text-black text-sm px-4 py-1"
    >
      <div className="flex items-center gap-1">
        Hover on
        <span className="info-panel-icon">
          <InfoIcon />
        </span>{" "}
        for hints
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span>Connect</span>
        <span className="info-panel-black-dot" /> <span>to</span>
        <span className="info-panel-white-dot" />
      </div>
    </Panel>
  );
};

export default InfoPanel;
