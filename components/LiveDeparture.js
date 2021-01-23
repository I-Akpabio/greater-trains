const LiveDeparture = { 
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

<div v-if="view==='home'">
<q-card>
  <q-tabs
    style="background-color: #D60829"
    v-model="tab"
    dense
    class="text-white shadow-2"
    active-color="white"
    indicator-color="grey"
    align="justify"
    narrow-indicator
  >
    <q-tab name="mails" label="Departures" />
    <q-tab name="alarms" label="Arrivals" />

  </q-tabs>

  <q-separator />

<br />
    <div class="row">
    
    <div class="col">
      <q-list>
        <q-item @click="selectTrainModal(0)" clickable v-ripple>
        <q-item-section avatar>
            <q-icon color="black" name="location_on"></q-icon>
          </q-item-section>
          <q-item-section> 
            <q-item-label>{{ text1 }}</q-item-label>
            <q-item-label>{{ fromStation }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon color="black" name="keyboard_arrow_down"></q-icon>
          </q-item-section>
        </q-item>
        <q-item @click="selectTrainModal(1)" clickable v-ripple>
        <q-item-section avatar>
            <q-icon color="black" name="location_on"></q-icon>
          </q-item-section>
          <q-item-section> 
            <q-item-label>{{text2}}</q-item-label>
            <q-item-label> {{toStation }} </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon color="black" name="keyboard_arrow_down"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>



</q-card>
<br />

    <q-btn @click="findTrains()" class="full-width" style="background-color: #D60829; color: white" label="Find Trains"></q-btn>

</div>

  <div v-if="view==='results'">
  	<div class="row" style="margin-top: 10px">
		<div class="col-2">
			<q-btn @click="view ='home'" icon="arrow_back"></q-btn>
		</div>
		<div class="col-8">
			<div class="text-subtitle1">
				{{fromStation}} {{ getPlaceText() }}
			</div>
		</div>
		<div class="col-2"></div>
  	</div>
 
  	<br />

  	<q-list bordered>
        <q-item v-for="l in list" style="border-bottom: 1px solid lightgrey;" clickable v-ripple>
 
          <q-item-section> 
            <q-item-label>{{ l.start }}</q-item-label>
            <q-item-label>{{ getPlace(l) }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
          	<div>Platform 1 <q-icon color="black" name="keyboard_arrow_right"></q-icon></div>
          </q-item-section>
        </q-item>

      </q-list>
	
  </div>

   </div>`,
  mounted: function() {
    this.$store.commit('setTitle', 'Live Departures');
    var t = window.Loc.get();
    this.stations = t.stations;
    this.trains = t.trains;
  },
  data: function() {
    return {
      tab: 'mails',
      view: 'home',
      trainStop: '',
      results: '',
      text1: 'Departing from',
      text2: 'Arriving to (Optional)',
      location: false ,
      stations: [],
      results: [],
      selectedTrainType: 0,
      fromStation: 'Norwich',
      toStation: 'Norwood',
      trains: [],
      list: []
    }
  },
  computed:  {},

  watch: {
  	tab: function(val) {
  		if(val === 'mails') {
  			this.text1 = "Departing from";
  			this.text2 = "Arriving to (Optional)"
  		} else {
  			this.text1 = "Arriving to";
  			this.text2 = "Departing from (Optional)";
  		}
  	}
  },

  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    show: function() {
      
    },
    selectTrainModal: function (tType) {
    	this.selectedTrainType = tType;
        this.location = true;
    },
	getPlace: function(l) {
		return this.tab === 'mails' ? l.to : l.from;
	},
	getPlaceText: function() {
		return this.tab === 'mails' ? "Departures" : "Arrivals";
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
    setTrain: function(s) {
        if(this.selectedTrainType === 0) {
            this.fromStation = s;
        } else {
            this.toStation = s;
        }
        this.location = false;
        this.results = [];
        this.trainStop = '';
    },

    findTrains: function() {
		var list = [];
		var now = moment();
		for(var i = 0; i < this.trains.length; i++) {
			var t = this.trains[i];
			if(this.tab === 'mails') { 
				if(this.fromStation === t.from && (this.toStation === "" || this.toStation === t.to)) {}
				else{ continue; }
				} else {
				if(this.fromStation === t.to && (this.toStation === "" || this.toStation === t.from)) {}
				else{ continue; }
			}

			if(now.format("YYYY-MM-DD") !== t.date) {
				continue;
			}

			var tDate = moment(t.date + " "  + t.start);
			if(moment.duration(tDate.diff(now)).asHours() > 2.9) {
				continue;
			}

			list.push(t);

		}

		if(_.isEmpty(list)) {
			this.$q.dialog({
		        title: 'Alert',
		        message: 'There are no available departures for that search.'
		    })
		} else {
			this.view = "results";
			this.list = list;
		}
    	
    	
    }
  }  
}