const vm = new Vue({
  el: '#app',
  data: {
    cities: [],
    city: '016010',
    weather: [],
    title: '',
    text: ''
  },
  methods: {
    get_location: function(){
      const request = 'ajax.php?url=http://weather.livedoor.com/forecast/rss/primary_area.xml'
      axios.get(request,{
        timeout: 3000,
        responseType: 'document'
      })
      .then(function (response) {
        const xml = response.data;
        const areas = xml.getElementsByTagName('pref');

        for (var i = 0; i < areas.length; i++) {
          const cities = areas[i].getElementsByTagName('city');
          for (var j = 0; j < cities.length; j++) {
            const obj = {
              name: cities[j].title,
              id: cities[j].id
            };
            vm.$data.cities.push(obj);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    get_weather: function(city){
      const request = 'ajax.php?url=http://weather.livedoor.com/forecast/webservice/json/v1?city=' + city;
      axios.get(request,{
        timeout: 3000,
        responseType: 'json'
      })
      .then(function (response) {
        vm.$data.weather = response.data.forecasts;
        vm.$data.title = response.data.title;
        vm.$data.text = response.data.description.text;
      })
      .catch(function (error) {
        vm.$data.weather = {
          title: 'エラーです'
        }
      });
    }
  },
  created: function(){
    this.get_location()
    this.get_weather(this.city);
  }
});
