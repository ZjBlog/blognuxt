import Vue from 'vue'

import {
  Pagination,
  Message,
  Row,
  Col,
  Menu,
  MenuItem,
  Input,
  Switch,
  Button,
  Form,
  FormItem,
  Loading,
  MessageBox
} from 'element-ui'

export default () => {
  Vue.use(Pagination)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Input)
  Vue.use(Switch)
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Loading)
  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox.confirm
}
