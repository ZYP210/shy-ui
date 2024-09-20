import type { Graph as GraphType, NodeData as NodeDataType, ElementDatum, EdgeData as EdgeDataType } from "@antv/g6";

declare global {
  declare type GraphDataType = {
    nodes: NodeDataType[];
    edges: EdgeDataType[];
  };
  declare type selectedNodeType = Required<ElementDatum & { targetType?: string }> | null;
}

