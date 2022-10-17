import { tableColumnInterface } from "./commonHookType";

//获取表格配置项
export function getTableColumns(optionColumn: any[], menuShow = true, menuWidth = 200): tableColumnInterface[] | [] {
  const tableColumn: tableColumnInterface[] = [];
  optionColumn.forEach((e) => {
    if (!e?.formOnly) {
      const item = {
        title: e.label,
        dataIndex: e.prop,
        slot: e.slot,
        type: e.type || "input",
        value: e?.value,
        selectMode: e?.selectMode,
        dicUrl: e?.dicUrl,
        dicData: e?.dicData,
        dicProp: e?.dicProp,
        min: e?.min,
        max: e?.max,
        rules: e?.rules,
        ellipsis: e?.ellipsis || true,
        resizable: e?.resizable || true,
        align: e.align || "center",
        width: e?.tableWidth || e.type != "input" ? 140 : 100,
        minWidth: e?.minWidth || 80,
        maxWidth: e?.maxWidth,
        fixed: e?.fixed,
      };
      for (const key in item) {
        item[key] ?? delete item[key];
      }
      tableColumn.push(item);
    }
  });
  const menuColumn = {
    title: "操作",
    dataIndex: "tableMenu",
    width: menuWidth,
    align: "center",
    fixed: "right",
  };
  menuShow && tableColumn.push(menuColumn);
  return tableColumn;
}
