import { Panel } from "reactflow";
import LinkedinIcon from "../../assets/icons/LinkedinIcon";
import GithubIcon from "../../assets/icons/GithubIcon";
import { SocialMediaHandleLinks } from "../../utils/enum";

const ContactPanel = () => {
  return (
    <Panel
      position="bottom-left"
      className="bg-white rounded text-black text-sm px-4 py-1"
    >
      <div className="flex items-center gap-1">
        Developed with <span style={{ color: "red" }}>♥️</span> by Vishwesh
        Bajpai
        <a
          href={SocialMediaHandleLinks.linkedIn}
          target="_blank"
          className="cursor-pointer"
        >
          <LinkedinIcon />
        </a>
        <a
          href={SocialMediaHandleLinks.github}
          target="_blank"
          className="cursor-pointer"
        >
          <GithubIcon />
        </a>
      </div>
    </Panel>
  );
};

export default ContactPanel;
