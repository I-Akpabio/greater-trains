const Payment = { 
  template: `
<div style="background: aliceblue">
    <div class="text-subtitle2" style="padding: 10 10 10 20">Customer Details</div>
    <div class="bg-white" style="padding: 15 20 15 20">
      <div class="subtitle2">Enter Email Address to send ticket to</div>
       <q-input outlined v-model="email" label="Email"></q-input>
    </div>

    <br />

    <div class="text-subtitle2" style="padding: 0 10 10 20">Card Payment</div>
    <div class="bg-white" style="padding-left: 20px">
      <div class="row justify-between" style="font-size: 17px;">
        <div style="margin-top: 10px;" class="col-6">Total Booking Price</div>
        <div style="margin-top: 10px;margin-right: 10px;text-align: right" class="col-4"> $ 220</div>
       </div>

      <q-form class="q-gutter-md" style="margin-top: 10px; padding-right: 9px">
      <q-input
        filled
        type="number"
        v-model="card_num"
        label="Card Number *"
        hint="Number on Card"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      ></q-input>

      <q-input
        filled
        v-model="card_name"
        label="Name on Card *"
        lazy-rules
      ></q-input>

      <div class="row">
        <div class="col-5">
            <q-input
              filled
              v-model="exp"
              label="Expiry Date *"
              hint="MM/YYYY"
              lazy-rules
            ></q-input>
        </div>
        <div class="col-1"></div>
        <div class="col-5">
          <q-input
              filled
              v-model="cvv"
              label="Security Code *"
              lazy-rules
            ></q-input>
        </div>
      </div>

       <q-input
          filled
          v-model="address"
          label="Address *"
          lazy-rules
        ></q-input>

       <q-input
          filled
          v-model="country"
          label="Country *"
          lazy-rules
        ></q-input>


    </q-form>

    <q-btn 
      @click="finalPay()" 
      class="q-ma-sm full-width" 
      color="secondary" 
      label="Pay now"></q-btn>
</div>
`,
   mounted: function() {
    this.$store.commit('setTitle', 'Payment');
     var t = window.Loc.get();
      if(t.bookingTicket !== null) {
          t = t.bookingTicket;
          this.fromStation = t.fromStation;
          this.toStation = t.toStation;
          this.dateTime = t.dateTime;
          this.adult = t.adult;
          this.childs = t.childs;
      }
  },
  data: function() {
    return {
      fromStation: '',
      toStation: '',
      dateTime: '',
      adult: '',
      childs: '',
      email: '',
      card_num: '',
      card_name: '',
      exp: '',
      cvv: '',
      address: '',
      country: ''
    }
  },
  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    show: function() {
      
    },
    finalPay: function() {
      this.$q.dialog({
        title: 'Payment Suceessful',
        message: 'You payment is complete. The ticket will be added to your Ticket wallet'
      }).onOk(() => {
        var ticket = window.Loc.get().bookingTicket;
        var rTicket = window.Loc.get().returnTicket;
        var wallet = window.Loc.get().wallet;
        wallet = wallet.concat([ ticket ]);
        if(ticket.type === "Return") {
          wallet = wallet.concat([rTicket]);
        }

        this.$store.dispatch('ticketPageChange', 'mails');
        window.Loc.set('wallet', wallet);
        this.$router.push('/bar' );
      })
    }
  }  
}
