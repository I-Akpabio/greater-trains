const Home = { 
  template: `
  <div>
    <div style="background-color: #D60829; color: white">
      <q-btn-group spread>
        <q-btn @click="showPurchase()" stack label="Plan & Buy" icon="timeline"></q-btn>
        <q-btn @click="show()" stack label="Voice Action" icon="visibility"></q-btn>
      </q-btn-group>
    </div>

    <div>
    <div class="text-subtitle1" style="margin-left: 20px; margin-top: 20px"><q-icon name="star"></q-icon>Favourite Journeys</div>
    <br />
    <q-list bordered class="rounded-borders" v-if="favs.length > 0">

      <q-item v-for="t in searches" v-ripple clickable>
        <q-item-section avatar>
          <q-icon name="star"></q-icon>
        </q-item-section>

        <q-item-section>
         {{t}}
        </q-item-section>

         <q-item-section avatar>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>

      </q-item>

    </q-list>
    <div style="margin-left: 20px;" class="text-subtitle2">Your favourite journeys will be shown here</div>
    </div>

    <div>
    <div class="text-subtitle1" style="margin-left: 20px; margin-top: 20px"> <q-icon name="redo"></q-icon> Recent Searches</div>
    <br />
    <q-list bordered class="rounded-borders">

      <q-item @click="loadTicket(t)" v-for="t in searches" v-ripple clickable>
        <q-item-section avatar>
          <q-icon name="star_border"></q-icon>
        </q-item-section>

        <q-item-section>
         {{t.from}} to {{t.to}}
        </q-item-section>

         <q-item-section avatar>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>

      </q-item>

    </q-list>
    </div>

   </div>`,
   mounted: function() {
    this.$store.commit('setTitle', 'Home');
  },
  data: function() {
    return {
      favs: [],
      searches: window.Loc.get().serches || []
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

    show: function() {
      
    }
  }  
}