const btnVNode = defineComponent({
	props: {
		node: {
			type: Object
		}
	},
	render(): any {
		return this.node;
	}
});

export default btnVNode;
