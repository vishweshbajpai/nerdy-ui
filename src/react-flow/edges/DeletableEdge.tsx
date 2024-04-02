import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import { useSetRecoilState } from "recoil";
import { formSource } from "../../recoil/atom";
import { Tooltip } from "antd";

function DeletableEdge({ id, sourceX, sourceY, targetX, targetY }: any) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const setFormSource = useSetRecoilState(formSource);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
          onClick={() => {
            setEdges((edges) => edges.filter((edge) => edge.id !== id));
            setFormSource(null);
          }}
        >
          <Tooltip title="Remove">
            <div className="bg-white text-2xl font-semibold h-6 w-6 flex items-center justify-center rounded-full text-red-500 border border-red-500">
              -
            </div>
          </Tooltip>
        </button>
      </EdgeLabelRenderer>
    </>
  );
}

export default DeletableEdge;
