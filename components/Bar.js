const Bar = { 
  template: `
  <div>
  <q-dialog v-model="card" full-width full-height>
    <q-card>
      <q-card-section>
        <div class="text-h6">Outbound</div>
      </q-card-section>
      <q-card-section>
        <q-btn-toggle v-model="departArrive" spread style="border: 1px solid #027be3" no-caps rounded unelevated toggle-color="grey" color="white" text-color="primary" :options="depOps"></q-btn-toggle>
      </q-card-section>
      <q-card-section>
        <div>
            <q-date v-model="dateTime" mask="YYYY-MM-DD HH:mm" color="red"></q-date><br />
            <q-time v-model="dateTime" mask="YYYY-MM-DD HH:mm" color="red"></q-time>
        </div>
       </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal"><q-btn flat label="OK" v-close-popup></q-btn></q-card-actions>
    </q-card>
  </q-dialog>

   <q-dialog v-model="cardR" full-width full-height>
    <q-card>
      <q-card-section>
        <div class="text-h6">Outbound</div>
      </q-card-section>
      <q-card-section>
        <q-btn-toggle v-model="departArriveR" spread style="border: 1px solid #027be3" no-caps rounded unelevated toggle-color="red" color="white" text-color="primary" :options="depOps"></q-btn-toggle>
      </q-card-section>
      <q-card-section>
        <div>
            <q-date v-model="dateTimeR" mask="YYYY-MM-DD HH:mm" color="red"></q-date><br />
            <q-time v-model="dateTimeR" mask="YYYY-MM-DD HH:mm" color="red"></q-time>
        </div>
       </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal"><q-btn flat label="OK" v-close-popup></q-btn></q-card-actions>
    </q-card>
  </q-dialog>

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
  <q-tabs v-model="tab" style="background-color: #D60829" class="text-white shadow-2">
    <q-tab name="mails" label="My Tickets"></q-tab>
    <q-tab name="drake" label="Purchase"></q-tab>
  </q-tabs>
  <q-seperator></q-seperator>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="mails">
       <q-list bordered class="rounded-borders">

      <q-item v-for="t in tickets">
        <q-item-section avatar>
          <q-icon name="train"></q-icon>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{t.fromStation}} - {{t.toStation}}</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">{{t.dateTime}}</span>
          </q-item-label>
           <q-item-label clickable @click="loadTicket(t)" lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">Show Barcode <q-icon name="arrow_forward"></q-icon></span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
           <div class="text-grey-8">
            <q-btn @click="remove(t)" size="12px" flat dense round icon="delete" />
          </div>
        </q-item-section>
      </q-item>

    </q-list>
    </q-tab-panel>
    <q-tab-panel name="drake">
      <div class="row">
        <div class="col-2 self-center">
          <q-icon color="red" style="font-size: 3em; margin-left: 7px;" name="swap_vert"></q-icon>
        </div>
        <div class="col">
          <q-list>
            <q-item @click="selectTrainModal(0)" clickable v-ripple>
              <q-item-section>From: </q-item-section>
              <q-item-section>{{ fromStation }}</q-item-section>
              <q-item-section avatar>
                <q-icon color="red" name="keyboard_arrow_down"></q-icon>
              </q-item-section>
            </q-item>
            <q-item @click="selectTrainModal(1)" clickable v-ripple>
              <q-item-section>To: </q-item-section>
              <q-item-section>{{ toStation }}</q-item-section>
              <q-item-section avatar>
                <q-icon color="red" name="keyboard_arrow_down"></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <br />
      <br />
      <q-select
        rounded
        outlined
        bottom-slots
        v-model="model"
        :options="options"
        label="Ticket Type"
        :dense="false"
        :options-dense="false"
      >
        <template v-slot:before>
          <q-icon name="train"></q-icon>
        </template>
      </q-select>
      <br />
      <div class="row">
          <div class="col-4">
          Outbound: 
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            {{ departText }}
        </div>
      </div>
      <div class="row">
        
        <div class="col">
          <q-list>
            <q-item @click="card=true" clickable v-ripple>
              <q-item-section>{{ cleanDate(dateTime) }}</q-item-section>
              <q-item-section avatar>
                <q-icon color="red" name="keyboard_arrow_down"></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div v-if="model==='Return'">
        <div class="row">
          <div class="col-4">
          Return Journey: 
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            {{ departTextR }}
        </div>
      </div>
      <div class="row">
        
        <div class="col">
          <q-list>
            <q-item @click="cardR=true" clickable v-ripple>
              <q-item-section>{{ cleanDate(dateTimeR) }}</q-item-section>
              <q-item-section avatar>
                <q-icon color="primary" name="keyboard_arrow_down"></q-icon>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      </div>
       
      <br />
      <div class="row">
        <div class="col-6">
          Adult
        </div>
        <div class="col-1">{{adult}}</div>
        <div class="col">
          <q-btn-group push>
            <q-btn @click="passanger('a', -1)" color="primary" size="sm" outline text-color="grey" push icon="remove"></q-btn>
            <q-btn @click="passanger('a', 1)" color="primary" size="sm" outline text-color="grey" push icon="add"></q-btn>
          </q-btn-group>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-6">
          Children
        </div>
        <div class="col-1">{{childs}}</div>
        <div class="col">
          <q-btn-group push>
            <q-btn @click="passanger('c', -1)" color="primary" size="sm" outline text-color="grey" push icon="remove"></q-btn>
            <q-btn @click="passanger('c', 1)" color="primary" size="sm" outline text-color="grey" push icon="add"></q-btn>
          </q-btn-group>
        </div>
      </div>
      <br /><br />
      <div class="row">
        <div class="col">
          <q-btn class="full-width" style="background-color: #D60829; color: white;" @click="goToTrains()" label="Find Trains"></q-btn>
        </div>
      </div>
    </q-tab-panel>
  </q-tab-panels>
  </div>
  <div v-if="view==='code'">
    <q-img
      src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
      spinner-color="white"
      
    />
    <q-btn @click="view='home'" label="back"></q-btn>
  </div>
</div>
 `,
 mounted: function() {
    this.$store.commit('setTitle', 'Tickets');
    var t = window.Loc.get();
    this.stations = t.stations;
    this.tab = this.$store.state.ticketsPage;
    this.tickets = t.wallet;
    if(t.bookingTicket !== null) {
        t = t.bookingTicket;
        this.fromStation = t.fromStation;
        this.toStation = t.toStation;
        this.dateTime = moment().format("YYYY-MM-DD HH:mm");
        this.adult = t.adult;
        this.childs = t.childs;
        this.departArrive = t.departArrive;
        this.model = t.type || "Single";
    }
 },
 data: function() {
    return {
      tab:  'drake',
      depOps: [{label: 'Depart After', value: 'one'},{label: 'Arrive By', value: 'two'}],
      dialog: false,
      card: false,
      location: false,
      selectedTrainType: 0,
      trainStop: '',
      fromStation: '',
      toStation: '',
      model: 'Single',
      dateTime: moment().format("YYYY-MM-DD HH:mm"),
      departArrive: 'one',
      adult: 1,
      childs: 0,
      options: ['Single', 'Return', 'Seasons'],
      stations: [],
      results: [],
      cardR: false,
      departArriveR: 'one',
      dateTimeR:  moment().format("YYYY-MM-DD HH:mm"),
      tickets: [],
      view: 'home',
      myLocale: {
        /* starting with Sunday */
        days: 'Sunday_Monday_Tuesday_We_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_')
      }
    }
  },

  watch: {
    tab: function(val) {
      this.$store.dispatch('ticketPageChange', val);
    }
  },

  computed: {
    // tab: function() {
    //   return this.$store.state.ticketsPage;
    // },
    departText: function() {
        return this.departArrive === 'one' ? "Departs After" : "Arrives By";
    },
     departTextR: function() {
        return this.departArriveR === 'one' ? "Departs After" : "Arrives By";
    }
  },

  methods: {
    goToTrains: function() {
      var newTicket = {
          fromStation: this.fromStation,
          toStation: this.toStation,
          dateTime: this.dateTime,
          adult: this.adult,
          childs: this.childs,
          departArrive: this.departArrive,
          type: this.model
      };

        var oldBasket = window.Loc.get().basket;
        var that = this;
        var has = oldBasket.some(function(r) {
          return ((r.fromStation === that.fromStation) && (r.toStation === that.toStation));  
        });

        if(has) {
          oldBasket = oldBasket.map(function(r) {
            if ((r.fromStation === that.fromStation) && (r.toStation === that.toStation)) {
              return Object.assign({}, r, newTicket);  
            } else {
              return r;
            } 
          });
        } else {
          oldBasket.push(newTicket);
        }

        if(this.model === 'Return') {
          var returnTicket = Object.assign({}, newTicket, {
            fromStation: newTicket.toStation,
            toStation: newTicket.fromStation,
            dateTime: this.dateTimeR
          });
          window.Loc.set('returnTicket', returnTicket);
        }

        // Handle searches
        var serches = window.Loc.get().serches;
        var hasSearch = false;
        for(var i = 0; i < serches.length; i++) {
          if(serches[i].from === newTicket.fromStation && serches[i].to === newTicket.toStation) {
            hasSearch = true;
            break;
          }
        }
        if(!hasSearch) { serches.push({from: newTicket.fromStation, to: newTicket.toStation}); }

        window.Loc.set('bookingTicket', newTicket);
        window.Loc.set('basket', oldBasket);
        window.Loc.set('serches', serches);
        this.$store.commit('editBasket', oldBasket.length);
        this.changeRoute('find-train');
    },

    changeRoute: function(route) {
      this.$router.push('/' + route);
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
    loadTicket: function() {
      this.view = 'code';
    },

    selectTrainModal: function (tType) {
        this.selectedTrainType = tType;
        this.location = true;
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

    show: function() {
      console.log(this.dateTime);
    },

    passanger: function(type, c) {
        if(type === 'a') this.adult += c;
        else this.childs += c;
    },

    checkRoute: function() {
      var newTicket = {fromStation: this.fromStation,toStation: this.toStation,
        dateTime: this.dateTime,adult: this.adult,childs: this.childs,
        departArrive: this.departArrive};
      window.Loc.set('bookingTicket', newTicket);
      this.changeRoute('route');
    },

    cleanDate: function(cdate) {
      return moment(cdate).format("LLL");
    }

  }
}