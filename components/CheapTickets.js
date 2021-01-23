const CheapTickets = { 
  props: ['a'],
  template: `
  <div>
    <div class="q-pa-md" v-if="view==='home'">
      <div class="text-subtitle1">
        We have found cheaper tickets for the selected trip
      </div>
     <q-btn @click="view='tickets'"> View Cheaper Tickets</q-btn>

     <br /> <br />
     <q-btn @click="proceed()">Proceed with selected</q-btn>
    </div>

    <div v-if="view=='tickets'">
      <div style="margin-left: 20px;margin-top: 20px;" class="text-h6">
        Select Ticket
      </div>
      <br />
      <q-card  v-for="x,i in list" :key="i" class='my-card' style="margin-top: 12px">
        <q-card-section>
         <div class="row">
            <div class="col">
              <div class="text-h6">{{x.start}}</div>
            </div>
            <div class="col">
              <div class="text-h6">
              <q-icon name="arrow_forward" style="font-size: 10px"></q-icon>{{x.end}}
              </div>
            </div>
            <div class="col">
              <q-btn flat 
                color="secondary"
                @click="choose(x)">
                <div style="font-size: 15px">$ {{x.price}}</div>
                <q-icon name="keyboard_arrow_right"></q-icon>
              </q-btn>
            </div>
          </div>
          <br/>
          <q-card-actions>
            <div style="font-size: 12px">
              {{x.platform}} * {{x.time}} * 1 changes
            </div>
          
          </q-card-actions>
        </q-card-section>
      </q-card>
      <br />
      <q-btn style="margin-left: 20px" @click="proceed()">Proceed With Selected</q-btn>
    </div>
    

   </div>`,
   mounted: function() {
    this.$store.commit('setTitle', 'Cheaper Tickets');
    this.list = this.a.otherProp || [];
  },
  data: function() {
    return {
      view: 'home',
      list: []
    };
  },
  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
      console.log(this.list);
    },
    show: function() {},

    proceed: function() {
      this.$router.push('/summary');
    },

    choose: function(newTrain) {
      var t = window.Loc.get().bookingTicket;
      t.train = newTrain;
      window.Loc.set('bookingTicket', t);
      this.$router.push('/summary');
    }
  }  
}