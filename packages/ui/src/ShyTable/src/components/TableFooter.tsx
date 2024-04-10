import { Pagination } from 'ant-design-vue'
import { defineComponent } from 'vue'
import { paginationProps } from '../props'

const TableFooter = defineComponent({
  props: {
    pagination: paginationProps
  },
  setup() {
    return (
      <div class="">
        <Pagination v-bind="pagination" />
      </div>
    )
  }
})

export default TableFooter
