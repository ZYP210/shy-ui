<template>
	<header class="shy-table-header">
		<a-space>
			<a-button
				type="primary"
				@click="headerBtnHanlderFn('add')"
				v-if="btnOption.addShow"
			>
				<template #icon><PlusCircleOutlined /></template>
				{{ btnOption.addText }}</a-button
			>
			<a-popconfirm
				v-if="btnOption.delShow"
				title="是否删除选中数据？"
				ok-text="确认"
				cancel-text="取消"
				@confirm="headerBtnHanlderFn('delete')"
			>
				<a-button type="primary" danger>
					<template #icon><DeleteOutlined /></template>
					{{ btnOption.delText }}</a-button
				>
			</a-popconfirm>

			<slot name="headerLeft"></slot>
		</a-space>
		<a-space>
			<slot name="headerRight"></slot>
			<a-button
				@click="headerBtnHanlderFn('search')"
				v-if="btnOption.searchShow"
			>
				<template #icon><ColumnHeightOutlined /></template>
			</a-button>
			<a-button @click="handleFullScreen()" v-if="configStore.isFullShow">
				<template #icon>
					<fullscreen-exit-outlined v-if="configStore.isFullactive" />
					<fullscreen-outlined v-else />
				</template>
			</a-button>
		</a-space>
	</header>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store';
import { handleFullScreen } from '@/utils/control';

const configStore = useConfigStore();
const props = defineProps({
	option: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

const btnOption = reactive({
	addShow: true,
	addText: '新 增',
	delShow: true,
	delText: '删 除',
	searchShow: true
});

watch(
	() => props.option,
	(newVal) => {
		Object.assign(btnOption, newVal);
	},
	{
		immediate: true
	}
);

const emit = defineEmits(['headerBtnHanlder']);
const headerBtnHanlderFn = (type: string, e?: any) => {
	emit('headerBtnHanlder', { type, e });
};
</script>

<style lang="less" scoped></style>
