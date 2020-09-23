import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import ru from 'vuetify/es5/locale/ru'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify, {
    directives: {
        Ripple
    }
})

const opts = {
    lang: {
        locales: { ru },
        current: 'ru'
    },
    theme: {
        light: true,
        themes: {
            light: {
                primary: colors.green.darken3,
                secondary: colors.red.lighten3,
            }
        }
    },
}

export default new Vuetify(opts)
