import { tableColumnInterface, formColumnInterface } from '@/types/columns';

//获取表格配置项
export function getTableColumns(
	optionColumn: any[],
	menuShow = true,
	menuWidth = 200
): tableColumnInterface[] | [] {
	const tableColumn: tableColumnInterface[] = [];
	optionColumn.forEach((e) => {
		if (!e?.formOnly) {
			const item = {
				title: e.label,
				dataIndex: e.prop,
				ellipsis: e?.ellipsis || true,
				resizable: e?.resizable || true,
				align: e.align || 'center',
				width: e?.tableWidth || 100,
				minWidth: e?.minWidth || 80,
				maxWidth: e?.maxWidth,
				fixed: e?.fixed
			};
			for (const key in item) {
				item[key] ?? delete item[key];
			}
			tableColumn.push(item);
		}
	});
	const menuColumn = {
		title: '操作',
		dataIndex: 'tableMenu',
		width: menuWidth,
		align: 'center',
		fixed: 'right'
	};
	menuShow && tableColumn.push(menuColumn);
	return tableColumn;
}

//获取表单配置项
export function getFormColumns(
	optionColumn: any[]
): formColumnInterface[] | [] {
	const formColumn: formColumnInterface[] = [];
	optionColumn.forEach((e) => {
		// 统一处理规则提示
		if (!e?.tableOnly) {
			e.rules &&
				e.rules.forEach((r) => {
					if (!r.message && !r.validator) {
						!e.type || e.type == 'number'
							? (r.message = `请输入${e.label}`)
							: (r.message = `请选择${e.label}`);
					}
				});
			const item = {
				label: e.label,
				prop: e.prop,
				slot: e.formSlot,
				propName: e.propName,
				type: e.type || 'input',
				value: e?.value,
				selectMode: e?.selectMode,
				dicUrl: e?.dicUrl,
				dicData: e?.dicData,
				dicProp: e?.dicProp,
				min: e?.min,
				max: e?.max,
				rules: e?.rules,
				span: e.span,
				viewHide: e.viewHide,
				editHide: e.editHide,
				addHide: e.addHide
			};
			for (const key in item) {
				item[key] ?? delete item[key];
			}
			formColumn.push(item);
		}
	});
	return formColumn || [];
}

export function getSearchColumns(
	optionColumn: any[]
): formColumnInterface[] | [] {
	const formColumn: formColumnInterface[] = [];
	optionColumn.forEach((e) => {
		if (e?.search) {
			const item = {
				label: e.label,
				prop: e.prop,
				type: e.type || 'input',
				value: e?.searchValue,
				dicUrl: e?.dicUrl,
				dicData: e?.dicData,
				dicProp: e?.dicProp,
				span: e.searchSpan
			};
			for (const key in item) {
				item[key] ?? delete item[key];
			}
			formColumn.push(item);
		}
	});
	return formColumn || [];
}
