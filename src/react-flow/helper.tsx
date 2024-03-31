import { Node, ReactFlowInstance } from "reactflow";
import DeletableEdge from "./edges/DeletableEdge";
import SignupForm from "./nodes/SignupForm";
import LoginForm from "./nodes/LoginForm";
import CommonButton from "./nodes/CommonButton";
import Journey from "./nodes/Journey";
import { NodeIds, NodeTypes } from "../utils/enum";
import Broken from "./nodes/Broken";
import Ninja from "./nodes/Ninja";
import Treasure from "./nodes/Treasure";
import Winner from "./nodes/Winner";
import { IButtonNodePositionOfLevel, LevelId } from "../types";

export const initialNodes: Node<
  {
    label: string;
  },
  string | undefined
>[] = [
  {
    id: NodeIds.signup,
    type: NodeTypes.signup,
    position: { x: -350, y: 0 },
    data: { label: "" },
  },
  {
    id: NodeIds.login,
    type: NodeTypes.login,
    position: { x: 350, y: 150 },
    data: { label: "" },
  },
  {
    id: NodeIds.button,
    type: NodeTypes.button,
    position: { x: 100, y: 1000 },
    data: { label: "" },
  },
  {
    id: NodeIds.journey,
    type: NodeTypes.journey,
    position: { x: 2000, y: -100 },
    data: { label: "" },
    hidden: true,
  },
  {
    id: NodeIds.broken,
    type: NodeTypes.broken,
    position: { x: 2000, y: -2000 },
    data: { label: "" },
    hidden: true,
  },
  {
    id: NodeIds.ninja,
    type: NodeTypes.ninja,
    position: { x: -350, y: -2000 },
    data: { label: "" },
    hidden: true,
  },
  {
    id: NodeIds.treasure,
    type: NodeTypes.treasure,
    position: { x: -2350, y: -2000 },
    data: { label: "" },
    hidden: true,
  },
  {
    id: NodeIds.winner,
    type: NodeTypes.winner,
    position: { x: -2350, y: 0 },
    data: { label: "" },
    hidden: true,
  },
];

export const nodeTypes: Record<NodeTypes, () => JSX.Element> = {
  [NodeTypes.signup]: SignupForm,
  [NodeTypes.login]: LoginForm,
  [NodeTypes.button]: CommonButton,
  [NodeTypes.journey]: Journey,
  [NodeTypes.broken]: Broken,
  [NodeTypes.ninja]: Ninja,
  [NodeTypes.treasure]: Treasure,
  [NodeTypes.winner]: Winner,
};

export const edgeTypes = {
  "deletable-edge": DeletableEdge,
};

export const ButtonLabels: Record<NodeIds, string> = {
  [NodeIds.button]: "",
  [NodeIds.login]: "Login",
  [NodeIds.signup]: "Sign Up",
  [NodeIds.journey]: "Fly ✈️",
  [NodeIds.broken]: "Fix 😵‍💫",
  [NodeIds.ninja]: "Byakugan! 🥷🏻",
  [NodeIds.treasure]: "Open 🗝️",
  [NodeIds.winner]: "Celebrate 🎉",
};

export const ButtonNodePositionOfLevel: IButtonNodePositionOfLevel = {
  [NodeIds.journey]: {
    x: 2350,
    y: 1000,
  },
  [NodeIds.broken]: {
    x: 2350,
    y: -1000,
  },
  [NodeIds.ninja]: {
    x: 0,
    y: -1000,
  },
  [NodeIds.treasure]: {
    x: -2000,
    y: -1000,
  },
  [NodeIds.winner]: {
    x: -2000,
    y: 1000,
  },
};

export const fitToView = (
  nodes:
    | (Partial<Node> & {
        id: string;
      })[]
    | undefined,
  reactFlow: ReactFlowInstance<any, any>,
  duration = 1000
) => {
  setTimeout(() => {
    reactFlow.fitView({
      nodes,
      duration,
      padding: 0.1,
      includeHiddenNodes: true,
    });
  }, 300);
};

export const updateLevels = (
  levelIds: LevelId[],
  reactFlow: ReactFlowInstance<any, any>
) => {
  if (reactFlow) {
    const nodes = reactFlow.getNodes();
    const updatedNodes = nodes.map((node) => ({ ...node }));
    levelIds.forEach((levelId) => {
      const levelNode = updatedNodes.find(
        (node) => node.id === levelId.toString()
      );
      if (levelNode) {
        levelNode.hidden = false;
      }
    });
    const lastLevelId = levelIds[levelIds.length - 1];
    const buttonNode = updatedNodes.find((node) => node.id === NodeIds.button);
    if (buttonNode) {
      buttonNode.position = ButtonNodePositionOfLevel[lastLevelId];
    }
    reactFlow.setNodes(updatedNodes);
    const fitToViewNodes = [
      { id: lastLevelId.toString() },
      { id: NodeIds.button },
    ];
    fitToView(fitToViewNodes, reactFlow);
  }
};

export const hideAllLevels = (reactFlow: ReactFlowInstance<any, any>) => {
  const nodes = reactFlow.getNodes();
  const updatedNodes = nodes.map((node) => ({ ...node }));
  updatedNodes.forEach((node) => {
    if (
      node.id !== NodeIds.button &&
      node.id !== NodeIds.signup &&
      node.id !== NodeIds.login
    ) {
      node.hidden = true;
    }
  });
  reactFlow.setNodes(updatedNodes);
};
