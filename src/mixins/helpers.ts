import Vue from 'vue'
export default Vue.extend ({
  methods:{
    toHHMMSS: function toHHMMSS(sec_params: number): string {
      const sec_num = sec_params; // don't forget the second param
      const hours   = isNaN(Math.floor(sec_num / 3600)) ? 0 : Math.floor(sec_num / 3600);
      const minutes = isNaN(Math.floor((sec_num - (hours * 3600)) / 60)) ? 0 : Math.floor((sec_num - (hours * 3600)) / 60);
      const seconds = isNaN(Math.floor(sec_num - (hours * 3600) - (minutes * 60))) ? 0 : Math.floor(sec_num - (hours * 3600) - (minutes * 60));

      let hoursString   = hours.toString()
      let minutesString = minutes.toString()
      let secondsString = seconds.toString()

      if (hours   < 10) {hoursString   = "0"+hours;}
      if (minutes < 10) {minutesString = "0"+minutes;}
      if (seconds < 10) {secondsString = "0"+seconds;}
      return hoursString+'h '+minutesString+'m '+secondsString+' s';
    },
    toMETERS: function(mm: number): number{
      return Math.round(mm/10)/100
    }
  }
})
