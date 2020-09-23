import Vue from 'vue'
import vuetify from "@/plugins/vuetify"
import App from './App.vue'

new Vue({
    vuetify: vuetify,
    template: '<App></App>',
    components: {
        App,
    }
}).$mount('#app')
