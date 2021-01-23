const FaultReport = { 
  template: `
  <div style="margin-bottom: 20px">
    <q-tabs
      v-model="tab"
      style="background-color: #D60829;"
      class="text-white shadow-2"
      dense
      >
     <q-tab name="info" label="Information"></q-tab>
     <q-tab name="jour" label="Journey"></q-tab>
     <q-tab name="fault" label="Fault"></q-tab>

    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="info">
      <q-form class="q-gutter-md" style="margin-top: 10px; padding-right: 9px">
        <div class="row">
          <div class="col-5">
              <q-input
                filled
                v-model="fname"
                label="First Name*"
                lazy-rules
              ></q-input>
          </div>
          <div class="col-1"></div>
          <div class="col-6">
            <q-input
                filled
                v-model="lname"
                label="Last Name *"
                lazy-rules
              ></q-input>
          </div>
        </div>
        <q-input outlined v-model="email" label="Email *"></q-input>
        <q-input outlined v-model="phone" label="Telephone *"></q-input>
        <q-input outlined v-model="address1" label="Address Line 1"></q-input>
        <q-input outlined v-model="address2" label="Address Line 2"></q-input>
        <q-input outlined v-model="city" label="City *"></q-input>
        <q-input outlined v-model="county" label="County *"></q-input>
        <q-input outlined v-model="postcode" label="Post Code *"></q-input>
        <q-select square outlined :options="countries" v-model="country" label="Country *"></q-select>

        <q-btn @click="tab='jour'" class="full-width" label="Next"></q-btn>
      </q-form>
      </q-tab-panel>

      <q-tab-panel name="jour">
        <q-form class="q-gutter-md" style="margin-top: 10px; padding-right: 9px">
          <div>Date of Travel</div>
          <q-input type="date" filled v-model="desc"></q-input>

          <q-input outlined v-model="dstation" label="Departure Station"></q-input>

          <div>Departure Time</div>
          <q-input type="time" filled v-model="dtime"></q-input>

          <q-input outlined v-model="astation" label="Arrival Station"></q-input>

          <div>Arrival Time</div>
          <q-input type="time" filled v-model="atime"></q-input>

          <q-btn @click="tab='fault'" class="full-width" label="Next"></q-btn>
        </q-form>
      </q-tab-panel>

      <q-tab-panel name="fault">
        <q-form class="q-gutter-md" style="margin-top: 10px; padding-right: 9px">
          <q-input type="textarea" label="Fault report *" filled v-model="fdesc"></q-input>

          <q-input type="textarea" label="What can we do for you?" filled v-model="wdesc"></q-input>

          <br />

          <q-btn @click="complete()" style="background-color: #D60829; color: white" class="full-width" label="Submit"></q-btn>
        </q-form>
      </q-tab-panel>

    
    </q-tab-panels>

  </div>`,

  mounted: function() {
    this.$store.commit('setTitle', 'Fault Report');
  },

  data: function() {
    return {
      tab: 'info',
      fname: '',
      lname: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      county: '',
      postcode: '',
      phone: '',
      desc: '',
      dstation: '',
      astation: '',
      atime: '',
      dtime: '',
      fdesc: '',
      wdesc: '',
      countries: ["Paraguay","Panama",'Nigeria', "United Kingdom", "United States"]
    };
  },

  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    show: function() {
      
    },
    complete: function() {
      this.$q.dialog({
        title: 'Fault Report',
        message: 'You report has been successfully submitted'
      }).onOk(() => {
        console.log('OK')
      });

      this.fname= '';
      this.lname= '';
      this.email= '';
      this.address1= '';
      this.address2= '';
      this.city= '';
      this.country= '';
      this.county= '';
      this.postcode= '';
      this.phone= '';
      this.desc= '';
      this.dstation= '';
      this.astation= '';
      this.atime= '';
      this.dtime= '';
      this.fdesc = '';
      this.wdesc = '';
    }
  }  
}