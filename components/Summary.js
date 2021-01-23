const Summary = { 
  template: `
  <div>
    <div style="padding-left: 15px;padding-right: 15px;">

        <q-card class='my-card' style="margin-top: 12px">
            <q-card-section>

                <div class="row justify-between">
                    <div class="col-4">
                        <div class="text-subtitle1">{{toStation}}</div>
                    </div>
                    <div class="col-4">
                        <div color="primary" style="text-align: right" class="text-subtitle1">$ {{train.price}}</div>
                    </div>
                </div>
            </q-card-section>

            <q-separator></q-separator>
            <q-card-section>
                <div class="subtitle2">{{ cleanDate(train.date) }}</div>
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col">
                        <div class="text-h6">{{train.start}}</div>
                        <div>{{fromStation}}</div>
                    </div>
                    <div class="col self-center">
                        <q-icon style="font-size: 2.0em" name="arrow_forward"></q-icon>
                    </div>
                    <div class="col">
                        <div class="text-h6">{{train.end}}</div>
                        <div>{{toStation}}</div>
                    </div>
                </div>
             </q-card-section>
                <br/>
            <q-card-section>
                {{train.time}}
            </q-card-section>
            <q-card-actions>
                <q-btn flat class="full-width" label="View Details"></q-btn>

            </q-card-actions>
   
        </q-card>

        <q-card class='my-card' style="margin-top: 12px">
            <q-card-section>

                <div class="row">
                    <div class="col">
                        <div class="text-subtitle1">Passenger Information</div>
                    </div>

                </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section>
                <q-icon name="person"></q-icon>
                {{adult}} Adult & {{childs}} children
            </q-card-section>
        </q-card>
    </div>
  
    <br />
    <q-btn 
      style="padding-left: 15px;margin-right: 15px;" 
      @click="changeRoute('payment')"  
      class="q-ma-sm full-width" 
      color="red"
      > Buy now $ {{train.price}}
    </q-btn>
  </div>
`,
   mounted: function() {
    this.$store.commit('setTitle', 'Summary');
     var t = window.Loc.get();
      if(t.bookingTicket !== null) {
          t = t.bookingTicket;
          this.fromStation = t.fromStation;
          this.toStation = t.toStation;
          this.dateTime = t.dateTime;
          this.adult = t.adult;
          this.childs = t.childs;;
          this.train = t.train
      }
  },
  data: function() {
    return {
      fromStation: '',
      toStation: '',
      dateTime: '',
      adult: '',
      childs: '', 
      train: {}
    }
  },
  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    cleanDate: function(d) {
      return new Date(d).toDateString();
    },
  }  
}