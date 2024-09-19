import { Graph } from "@antv/g6";
import type { Graph as GraphType, NodeData as NodeDataType, ElementDatum, EdgeData as EdgeDataType } from "@antv/g6";
import { cloneDeep, debounce } from "lodash-es";
import type { Ref } from "vue";

export const baseNodeStyle = { size: 15, fill: "#ebe5fd", lineWidth: 1, stroke: "#a166f6" } as const;

export const baseEdgeStyle = {
  stroke: "#7a9aff",
  lineWidth: 1,
  endArrow: true,
  endArrowType: "triangle",
  endArrowSize: 3,
} as const;

export const animation = {
  duration: 500,
  easing: "linear",
};

let graph: GraphType | null = null;

const nodes: Ref<NodeDataType[]> = ref([]);
const edges: Ref<EdgeDataType[]> = ref([]);
const selectedNode: Ref<selectedNodeType | null> = ref(null);

watch(
  selectedNode,
  (newNode: any, oldNode: selectedNodeType) => {
    if (newNode?.id === oldNode?.id) {
      const { id, style, targetType } = newNode;
      if (targetType === "node") {
        graph?.updateData({
          nodes: [
            {
              id,
              type: style?.shape,
              style,
            },
          ],
        });
      } else if (targetType === "edge") {
        graph?.updateData({
          edges: [
            {
              id,
              style,
            },
          ],
        });
      }
      graph?.draw();
    }
  },
  {
    deep: true,
  },
);

const updateGraphData = () => {
  nodes.value = graph?.getNodeData()!;
  edges.value = graph?.getEdgeData()!;
};

const setGraphData = (data: GraphDataType) => {
  for (let index = 0; index < data?.nodes?.length; index++) {
    const element = data.nodes[index];
    element.style = element.style ?? cloneDeep(baseNodeStyle);
  }
  for (let index = 0; index < data?.edges?.length; index++) {
    const edge = data.edges[index];
    edge.style = edge.style ?? cloneDeep(baseEdgeStyle);
  }
  graph?.setData(data);
  graph?.render();
  updateGraphData();
};

const resize = () => {
  graph?.resize();
  graph?.fitCenter();
};

const initGraphEvents = () => {
  graph!.on("click", (event: any) => {
    if (event.eventPhase === 3) {
      const { id, type } = event.target!;
      const curr = graph!.getElementData(id);
      selectedNode.value = { ...curr, targetType: type } as any;
    } else {
      selectedNode.value = null;
    }
  });
};

const initGraph = () => {
  graph = new Graph({
    container: "container",
    autoFit: "center",
    layout: {
      type: "force-atlas2",
      preventOverlap: true,
      kr: 20,
    },
    behaviors: [
      {
        type: "hover-activate",
        degree: 1, // 👈🏻 Activate relations.
        state: "highlight",
        trigger: ["shift"],
      },
      {
        type: "click-select",
        state: "onActivated",
      },
      "zoom-canvas",
      "drag-canvas",
      "drag-element",
    ],
    node: {
      state: {
        onActivated: {
          halo: true,
          lineWidth: 3,
          stroke: "#a166f6",
          haloStroke: "#873bf4",
          haloLineWidth: 20,
        },
        highlight: {
          halo: true,
          lineWidth: 1,
          haloStroke: "#873bf4",
          haloLineWidth: 20,
          stroke: "#a166f6",
        },
      },
    },
    edge: {
      style: {
        labelAutoRotate: false,
      },
      state: {
        onActivated: {
          halo: true,
          haloStroke: "#85a4ff",
          lineWidth: 1,
          haloLineWidth: 5,
        },
        highlight: {
          halo: true,
          haloStroke: "#85a4ff",
          lineWidth: 1,
          haloLineWidth: 5,
        },
      },
    },
  });

  onMounted(() => {
    window.addEventListener("resize", debounce(resize, 100));
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });

  initGraphEvents();
};

type UseGraph = {
  graph: GraphType | null;
  setGraphData: (data: GraphDataType) => void;
  nodes: Ref<NodeDataType[]>;
  edges: Ref<EdgeDataType[]>;
  selectedNode: Ref<selectedNodeType>;
  updateGraphData: () => void;
};

export const useGraph = (): UseGraph => {
  if (!graph) {
    initGraph();
  }
  return {
    graph,
    setGraphData,
    edges,
    nodes,
    selectedNode,
    updateGraphData,
  };
};

