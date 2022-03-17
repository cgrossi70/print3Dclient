import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en.json'
import es from '@/locales/es.json'


Vue.use(VueI18n)

export default new VueI18n({
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
      "en": en,
      "es": es
    }
})
