import Vue from "vue";
import Element from "element-ui";
import "../element-variables.scss";
Vue.use(Element);
Vue.use(Element.Loading.directive);
Vue.prototype.$loading = Element.Loading.service;
Vue.prototype.$msgbox = Element.MessageBox;
Vue.prototype.$alert = Element.MessageBox.alert;
Vue.prototype.$confirm = Element.MessageBox.confirm;
Vue.prototype.$prompt = Element.MessageBox.prompt;