const RouteDetails = { 
  template: `
  <div>
    <q-dialog v-model="location" full-width full-height>
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-10">
            <q-input @keyup="search" color="purple-12" v-model="trainStop" label="Enter Train Station">
              <template v-slot:prepend>
                <q-icon name="train"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col">
            <q-btn @click="location=false" label="X"></q-btn>
          </div>
        </div>
      </q-card-section>
      <q-list>
        <q-item v-for="s in results" @click="setTrain(s)" clickable v-ripple>
          <q-item-section>{{ s }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
     <div class="row">
        <div class="col-2 self-center">
          <q-icon color="red" style="font-size: 3em; margin-left: 7px;" name="swap_vert"></q-icon>
        </div>
        <div class="col">
          <q-list>
            <q-item @click="" clickable v-ripple>
              <q-item-section>Current: </q-item-section>
              <q-item-section>Location</q-item-section>
              <q-item-section avatar>
                <q-icon color="red" name="keyboard_arrow_down"></q-icon>
              </q-item-section>
            </q-item>
            <q-item @click="location='true'" clickable v-ripple>
              <q-item-section>Destination: </q-item-section>
              <q-item-section>{{ ticket.fromStation }}</q-item-section>
              <q-item-section avatar>
                <q-icon color="red" name="keyboard_arrow_down"></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        </div>
        <div id="map" style="width: 100%; height: 270px;"></div>

      <br />
        <div class="row" v-for="s in steps" style="margin-bottom: 10px;">
          <div class="col-2" style="padding-left: 10px">
            <q-icon style="font-size: 30px; font-weight: bold;" :name="decideIcon(s.instructions)"></q-icon>
          </div>
          <div class="col-10">
            <div v-html="s.instructions"></div>
          </div>
        </div>

   </div>`,
   mounted: function() {
    this.$store.commit('setTitle', 'Route Details');
    var t = window.Loc.get();
    this.ticket = t.bookingTicket;
    this.stations = t.stations;

    this.mapOperations(Loc.get().bookingTicket);
  },
  data: function() {
    return {
      steps: [],
      ticket: {},
      location: false,
      trainStop: '',
      results: [],
      stations: [],
    };
  },
  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    decideIcon: function(html) {
     
      if(html.search("<b>left</b>") >= 0)
        return "subdirectory_arrow_left";
      else if(html.search("<b>right</b>") >= 0)
        return "subdirectory_arrow_right";
      else if(html.search("left") >= 0)
        return "arrow_left";
      else if(html.search("right") >= 0)
        return "arrow_right";
      else if(html.search("Continue") >= 0)
        return "arrow_upward";
      else if(html.search("Merge") >= 0)
        return "merge_type";
      else
        return "";
    },
    show: function() {
      
    },
    setTrain: function(s) {
      this.ticket.fromStation = s;
      this.location = false;
      this.mapOperations(this.ticket);

    },
     search: function() {
        if (this.trainStop === "") {
            this.results = [];
            return;
        }

        var newlist = [];
        var sw = this.trainStop.toLowerCase();
        this.stations.forEach(function(l) {
            if (l.toLowerCase().search(sw) > -1) {
                newlist.push(l);
            }
        });

        this.results = newlist;
    },
    mapOperations: function(t) {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
    
      var that = this;
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
      });
      directionsDisplay.setMap(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          directionsService.route({
            origin: `${pos.lat},${pos.lng}`,
            destination: t.fromStation + " train station uk",
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {
              var steps = response.routes[0].legs[0].steps;
              that.steps = steps;
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
          
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

    }
  }  
}