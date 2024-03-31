import { useCallback, useEffect } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Connection,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { celebrate, formSource } from "../recoil/atom";
import { useQuery } from "@tanstack/react-query";
import {
  EdgeTypes,
  LocalStorageKeys,
  NodeIds,
  ReactQueryKeys,
} from "../utils/enum";
import { getLevelsOfUserService } from "../services";
import useLocalStorage from "../hooks/useLocalStorage";
import { updateLevels, edgeTypes, initialNodes, nodeTypes } from "./helper";
import { IUserDetails } from "../types";
import ContactPanel from "./panels/ContactPanel";
import Confetti from "react-confetti";

function ReactFlowForm() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const setFormSource = useSetRecoilState(formSource);
  const celebrateValue = useRecoilValue(celebrate);
  const [getValue] = useLocalStorage();
  const reactFlow = useReactFlow();

  const fetchLatestUserDetails = () => {
    const userDetails: IUserDetails = getValue(
      LocalStorageKeys.userDetails
    ) as IUserDetails;
    return userDetails;
  };

  const { data: response, isError } = useQuery({
    queryKey: [ReactQueryKeys.Levels],
    queryFn: () => getLevelsOfUserService(fetchLatestUserDetails().id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (response) {
      if (isError) return;
      updateLevels(response.data.levels, reactFlow);
    }
  }, [response]);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        type: EdgeTypes.deletableEdge,
        animated: true,
      };
      setEdges(() => addEdge(edge, []));
      setFormSource(connection.source as NodeIds);
      console.log("Connection: ", connection);
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnScroll
        panOnScrollSpeed={1}
        minZoom={0.3}
      >
        <MiniMap pannable nodeStrokeWidth={3} />
        <ContactPanel />
      </ReactFlow>
      {celebrateValue && <Confetti />}
      <audio />
    </div>
  );
}

export default ReactFlowForm;
