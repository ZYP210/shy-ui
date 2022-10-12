<template>
	<a-form :model="formData" ref="formRef">
		<a-row type="flex">
			<a-col
				:span="item?.span || 12"
				:order="item?.order"
				v-for="(item, index) in formOption.columns"
				:key="index"
			>
				<a-form-item
					:label-col="formOption.labelCol || item.labelCol"
					:label="item.label"
					:rules="item?.rules"
					:v-bind="item.prop"
					:name="item.prop"
				>
					<template v-if="item.slot">
						<slot :name="item.prop" :data="formData" :column="item"></slot
					></template>
					<template v-else>
						<a-input
							v-if="item.type == 'input'"
							v-model:value="formData[item.prop]"
							:disabled="item.disabled"
							:placeholder="'请输入' + item.label"
						/>
						<a-select
							:mode="item.selectMode"
							:disabled="item.disabled"
							v-else-if="item.type == 'select'"
							v-model:value="formData[item.prop]"
							:options="item.dicData || []"
							:placeholder="'请选择' + item.label"
						/>
						<a-tree-select
							v-else-if="item.type == 'treeSelect'"
							v-model:value="formData[item.prop]"
							:tree-data="item.dicData"
							tree-checkable
							allow-clear
							:placeholder="'请选择' + item.label"
						/>
						<a-input-number
							v-else-if="item.type == 'number'"
							:max="item.max"
							:min="item.min"
							:disabled="item.disabled"
							v-model:value="formData[item.prop]"
							:defaultValue="item.value"
						/>
						<a-checkbox-group
							v-else-if="item.type == 'checkbox'"
							v-model:value="formData[item.prop]"
							:name="item.checkboxName || 'checkboxgroup'"
							:options="item.dicData"
						/>
						<a-radio-group
							v-else-if="item.type == 'radio'"
							v-model:value="formData[item.prop]"
							:options="item.dicData"
						/>
						<a-date-picker
							v-else-if="item.type == 'date'"
							v-model:value="formData[item.prop]"
							:disabled="item.disabled"
							:value-format="item?.valueFormat || 'YYYY-MM-DD'"
						/>
						<a-textarea
							v-else-if="item.type == 'textarea'"
							:disabled="item.disabled"
							v-model:value="formData[item.prop]"
						/>
					</template>
				</a-form-item>
			</a-col>
		</a-row>
	</a-form>
</template>
<script lang="ts" setup>
import { isEmpty } from '@/utils/is';
import { deepClone } from '@/utils/index';
import { useFormStore } from '@/store';
const { form } = storeToRefs(useFormStore());
const props = defineProps({
	option: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

const formData = reactive({});
const formRef = ref(null);

const formOption = reactive({
	labelCol: { style: { width: '100px' } },
	columns: []
});

//处理colmuns中的下拉选择
const dealSelect = () => {
	formOption.columns.forEach((item) => {
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

watch(
	() => form.value,
	(newVal) => {
		if (isEmpty(newVal)) {
			for (let key in formData) {
				delete formData[key];
			}
		} else {
			formData;
			Object.assign(formData, newVal);
		}
	},
	{
		deep: true,
		immediate: true
	}
);

watch(
	() => props.option,
	(newVal) => {
		//这里必须深克隆对象，否则不停触发监听事件
		Object.assign(formOption, deepClone(newVal));
		dealSelect();
	},
	{
		deep: true,
		immediate: true
	}
);

defineExpose({
	formData,
	formRef
});
</script>
