<template>
	<transition name="fade" mode="out-in">
		<section
			class="shy-table-search"
			v-if="searchOption.columns.length > 0"
			v-show="searchOption.visible"
		>
			<a-form :model="formSearch">
				<a-row :gutter="24">
					<template v-for="(e, i) in searchOption.columns" :key="i">
						<a-col :span="e.span || searchOption.span">
							<a-form-item
								:label="e.label"
								:name="e.prop"
								:labelCol="{ span: e.labelCol }"
								:wrapperCol="{ span: e.wrapperCol }"
							>
								<a-input
									v-if="e.type == 'input'"
									v-model:value="formSearch[e.prop]"
									:placeholder="'请输入' + e.label"
									:allowClear="true"
								/>
								<a-select
									v-else-if="e.type == 'select'"
									v-model:value="formSearch[e.prop]"
									:options="e.dicData || []"
									:placeholder="'请选择' + e.label"
									:allowClear="true"
								/>
							</a-form-item>
						</a-col>
					</template>
					<a-col :span="4">
						<a-form-item>
							<a-space>
								<a-button type="primary" @click="search"
									><template #icon>
										<SearchOutlined />
									</template>
									搜 索
								</a-button>
								<a-button @click="empty">
									<template #icon>
										<clear-outlined />
									</template>
									清 空</a-button
								>
							</a-space>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</section>
	</transition>
</template>

<script setup lang="ts">
import { deepClone } from '@/utils/index';
import { isEmpty } from '@/utils/is';
import { useConfigStore } from '@/store';
const { tableSearchShow } = storeToRefs(useConfigStore());
const props = defineProps({
	option: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

let formSearch = reactive({});
const searchOption = reactive({
	columns: [],
	span: 6,
	visible: true
});

//处理colmuns中的下拉选择
const dealSelect = () => {
	searchOption.columns.forEach((item) => {
		if ((item.type == 'select' || item.type == 'cascader') && item.dicUrl) {
			item.dicUrl(item.dicParams || {}).then((res) => {
				item.dicProp
					? (item.dicData = res.map((e) => {
							return {
								label: e[item.dicProp.label],
								value: e[item.dicProp.value]
							};
					  }))
					: (item.dicData = res);
			});
		}
	});
};

const emit = defineEmits(['search']);
const search = () => {
	//清除为空的字段
	for (let k in formSearch) {
		isEmpty(formSearch[k]) ? delete formSearch[k] : false;
	}
	emit('search', formSearch);
};

const empty = () => {
	for (let key in formSearch) {
		delete formSearch[key];
	}
	emit('search', {});
};

watch(
	() => props.option,
	(newVal) => {
		//这里必须深克隆对象，否则不停触发监听事件
		Object.assign(searchOption, deepClone(newVal));
		dealSelect();
	},
	{
		deep: true,
		immediate: true
	}
);

watch(
	() => tableSearchShow.value,
	(newVal) => {
		searchOption.visible = newVal;
	},
	{ immediate: true }
);
</script>
