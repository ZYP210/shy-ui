<template>
	<main class="shy-table">
		<slot></slot>
	</main>
</template>

<script setup lang="ts"></script>

<style lang="less">
.shy-table {
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background: @background-color;
	padding: 10px;
	&-header {
		.flex-b-c();
		padding-bottom: 6px;
		border-bottom: @border;
	}
	&-search {
		padding: 10px 0;
		.ant-form-item {
			margin-bottom: 12px;
		}
	}

	.ant-table-wrapper {
		width: 100%;
		flex: 1 1 auto;
		overflow: hidden;
		.ant-spin-nested-loading {
			height: 100%;
			.ant-spin-container {
				height: 100%;
				display: flex;
				flex-direction: column;
			}
		}
		.ant-table {
			flex: auto;
			overflow: hidden;
			&-container {
				height: 100%;
				overflow-y: scroll;
				display: flex;
				flex-direction: column;
			}
			&-sticky-holder {
				overflow: visible !important;
			}
			&-table-sticky-scroll {
				display: none !important;
			}
			&-pagination.ant-pagination {
				margin: 6px 0 0 0;
			}
		}
	}
}

.ant-form-inline .ant-form-item {
	margin-bottom: 6px;
}
</style>
