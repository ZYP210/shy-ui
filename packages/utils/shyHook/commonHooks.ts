import type { TableProps } from 'ant-design-vue';
import { useFormStore } from '@/store';
import {
	apiInterface,
	dialogInterface,
	commonHookOption
} from './commonHookType';
import {
	getTableColumns,
	getFormColumns,
	getSearchColumns
} from '@/utils/formatOption';
import { message } from 'ant-design-vue';

type dialogCallBackType = {
	begin: Function;
	done: Function;
	hiatus: Function;
};

export function useCommonOption(
	$api: apiInterface,
	columns: Object[],
	commonDialogRef,
	commonFormRef,
	option?: commonHookOption
) {
	const formStore = useFormStore();

	/**
	 * 头部
	 */

	//头部按钮点击事件
	const headerBtnHanlder = (playload) => {
		const { type } = playload;
		switch (type) {
			case 'add':
				openDialog('add');
				break;
			case 'delete':
				handlerDeleate(null);
				break;
			case 'search':
				searchOption.visible = !searchOption.visible;
				break;
		}
	};

	//搜索事件
	const searchHanlder = (playload) => {
		tableOption.query.current = 1;
		headOption.params = playload;
		onLoad(playload);
	};

	//头部配置
	const headOption = reactive({
		searchBtn: getSearchColumns(columns).length,
		params: {}
	});

	/**
	 * 表单
	 */
	//表单配置
	const formOption = reactive({
		addApi: $api['add'],
		editApi: $api['update'],
		detailApi: $api['getDetail'],
		viewBordered: true,
		columns: getFormColumns(columns),
		...option?.formOption
	});

	/**
	 * 表格
	 */

	//表格选择事件
	const rowSelection: TableProps['rowSelection'] = {
		fixed: true,
		onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
			tableOption.selectedRowKeys = selectedRowKeys;
			tableOption.selectedRows = selectedRows;
		}
	};
	//表格拖拽列事件
	const tableResizeColumn = (w, col) => {
		col.width = w;
	};
	//表格改变事件
	const tableChange = (pagination) => {
		tableOption.query = pagination;
		onLoad();
	};

	//表格菜单统一操作
	const tableMenuHanlder = (type: string, record: any) => {
		if (type == 'del') {
			handlerDeleate(record);
		} else {
			openDialog(type, record);
		}
	};

	//表格配置
	const tableOption = reactive<{
		selectedRowKeys: Key[];
		loading: boolean;
		[propName: string]: any;
	}>({
		// scroll: { x: '100%', y: '100%' },
		rowSelection,
		tableResizeColumn,
		tableChange,
		loading: false,
		selectedRowKeys: [],
		selectedRows: [],
		data: [],
		query: {
			current: 1,
			pageSize: 10
		},
		params: {},
		pagination: {
			showSizeChanger: true,
			pageSizeOptions: ['10', '20', '50', '100'],
			showQuickJumper: true,
			total: 0,
			showTotal: (total, range) => `共${total}条，当前${range[0]}-${range[1]}条`
		},
		tableMenuOption: {},
		columns: getTableColumns(
			columns,
			option?.tableOption?.menuShow,
			option?.tableOption?.menuWidth
		),
		...option?.tableOption
	});

	/**
	 * 搜索项配置
	 */
	const searchOption = reactive({
		visible: true,
		columns: getSearchColumns(columns),
		...option?.searchOption
	});

	/**
	 * 弹窗
	 */

	//弹窗配置
	const dialogOption: dialogInterface = reactive({
		type: 'view',
		title: ' ',
		...option?.dialogOption
	});

	//打开弹窗
	const openDialog = async (type: string, record: any = {}) => {
		//在弹窗弹出前如果有表单校验，移除表单校验效果
		commonFormRef?.value?.formRef?.resetFields();
		dialogOption.type = type;
		let data = record;
		commonDialogRef.value.visible = true;
		commonDialogRef.value.spinningShow = true;
		//正常的表格增查改弹窗
		if (['edit', 'view', 'add'].includes(type)) {
			dialogOption.width = '60%';
			dialogOption.footer ? false : (dialogOption.footer = undefined);
			//特殊处理当前弹窗类型不显示字段过滤
			formOption.columns = getFormColumns(columns).filter((e) => {
				return !e[type + 'Hide'];
			});
			type == 'add'
				? (dialogOption.title = '新 增')
				: type == 'edit'
				? (dialogOption.title = '修 改')
				: (dialogOption.title = '查 看');
			if (type !== 'add') {
				$api['getDetail'] && (data = await $api['getDetail'](record.id));

				formStore.setForm(data);
			} else {
				formStore.setForm(data);
			}
		} else {
			formStore.setForm(data);
		}
		commonDialogRef.value.spinningShow = false;
	};

	//弹窗确定事件
	const submitHandler = async (callback: dialogCallBackType) => {
		const { type } = dialogOption;
		//如果是新增，修改接口
		if (['add', 'edit'].includes(type) && formOption[`${type}Api`]) {
			commonFormRef.value.formRef.validateFields().then(async () => {
				let { formData } = commonFormRef.value;
				callback.begin();
				option?.formateSubmitData &&
					(formData = option.formateSubmitData(formData));
				const { code, msg } = await formOption[`${type}Api`](formData);
				if (code) {
					callback.hiatus();
					message.error(msg);
				} else {
					message.success('操作成功！');
					callback.done();
					onLoad();
				}
			});
		} else {
			//自定义提交事件，需要外部传进来
			option?.submitEvent(callback);
		}
	};

	/**
	 *  数据删除事件
	 */
	const handlerDeleate = async (record: any) => {
		const msgStr = '删除成功';
		if (record) {
			const { msg } = await $api['remove'](record.id);
			message.success(msg ? msg : msgStr);
			onLoad();
		} else {
			if (tableOption.selectedRowKeys.length == 0) {
				message.warning('请选择至少一条数据');
			} else {
				const { msg } = await $api['remove'](
					tableOption.selectedRowKeys.join(',')
				);
				message.success(msg ? msg : msgStr);
				onLoad();
			}
		}
	};

	/**
	 *  分页事件
	 */
	const onLoad = async (params = {}) => {
		const query = {
			...tableOption.params,
			...params
		};
		tableOption.loading = true;
		try {
			if (option.noPage) {
				const data = await $api['getList'](query);
				tableOption.data = data || [];
			} else {
				const { records, total } = await $api['getList'](
					tableOption.query.current,
					tableOption.query.pageSize,
					query
				);

				tableOption.data = records || [];
				tableOption.pagination.total = total;
			}
			option.afterOnLoad
				? (tableOption.data = option.afterOnLoad(tableOption.data))
				: false;
			tableOption.loading = false;
		} catch (err) {
			tableOption.loading = false;
		}
	};

	return {
		headerBtnHanlder,
		submitHandler,
		searchHanlder,
		handlerDeleate,
		tableMenuHanlder,
		onLoad,
		openDialog,
		searchOption,
		dialogOption,
		tableOption,
		formOption,
		headOption
	};
}
