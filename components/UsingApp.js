const UsingApp = { 
  template: `
  <div>
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="red"
        navigation
        padding
        arrows
        :fullscreen.sync="fullscreen"
        class="bg-white text-black shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <img src="img1.jpg" style="height: 420px" alt="" />
          <div class="q-mt-md text-center">
            {{text.style}}
          </div>
          <q-btn @click="slide='tv'" color="red" label="Next"></q-btn>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <img src="img2.jpg" style="height: 420px" alt="" />
          <div class="q-mt-md text-center">
            {{ text.tv }}
          </div>
          <q-btn @click="slide='layers'" color="red" label="Next"></q-btn>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
           <img src="img3.jpg" style="height: 420px" alt="" />
          <div class="q-mt-md text-center">
            {{ text.layers }}
          </div>
          <q-btn @click="slide='terrain'" color="red" label="Next"></q-btn>
        </q-carousel-slide>
         <q-carousel-slide name="terrain" class="column no-wrap flex-center">
           <img src="img4.jpg" style="height: 420px" alt="" />
          <div class="q-mt-md text-center">
            {{ text.terrain }}
          </div>
          <q-btn @click="slide='last'" color="red" label="Next"></q-btn>
        </q-carousel-slide>
        <q-carousel-slide name="last" class="column no-wrap flex-center">
          <img src="img5.jpg" style="height: 420px" alt="" />
          <div class="q-mt-md text-center">
            {{ text.last }}
          </div>
          <q-btn @click="close()" label="Close"></q-btn>
        </q-carousel-slide>
      </q-carousel>

  </div>`,
  mounted: function() {
    this.$store.commit('setTitle', 'Using app');
  },
  data: function() {
    return {
      slide: 'style',
      fullscreen: true,
      lorem: 'red',
      text: {
        style: "Home page gives options to purchace tickets, view live departures and view e-tickets",
        tv: "Ticket purchase page for choosing details of tickets to purchase",
        layers: "Live departures page shows trains leaving or arriving around that time",
        terrain: "View e-tickets from tickets that have been purchased",
        last: "Scan q/r code at the train station to check in"
      }
    }
  },
  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    loadTicket: function(t) {
      var ticket = window.Loc.get().bookingTicket;
      ticket.fromStation = t.from;
      ticket.toStation = t.to;
      window.Loc.set('bookingTicket', ticket);
      this.$store.dispatch('ticketPageChange', 'drake');
      this.$router.push('bar');
    },
    showPurchase: function() {
      this.$store.dispatch('ticketPageChange', 'drake');
      this.$router.push('/bar' );
    },

    close: function() {
      this.$router.go(-1);
    }
  }  
}