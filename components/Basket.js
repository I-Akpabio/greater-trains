const Basket = {
  template: `
    <div>
    <div class="text-subtitle1" style="margin-left: 20px; margin-top: 20px">Pending Tickets</div>
    <br />
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
            <span class="cursor-pointer">Continue <q-icon name="arrow_forward"></q-icon></span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
           <div class="text-grey-8">
            <q-btn @click="remove(t)" size="12px" flat dense round icon="delete" />
          </div>
        </q-item-section>
      </q-item>

    </q-list>
    </div>
    `,

  mounted: function() {
    this.$store.commit('setTitle', 'Basket');
    var t = window.Loc.get();
    this.tickets = t.basket;
  },

  data: function() {
    return {
      tickets: []
    };
  }, 

  methods: {
    show: function() {console.log('sD')},
    loadTicket: function(t) {
      window.Loc.set('bookingTicket', t);
      this.$router.replace('bar');
    },

    remove: function(t) {
      var newList = []; 
      this.tickets.forEach(function(r) {
        if ((r.fromStation !== t.fromStation) || (r.toStation !== t.toStation)) {
          newList.push(r);
        }
      }); 

      this.tickets = newList;
      window.Loc.set('basket', newList);
      this.$store.commit('editBasket', newList.length);
    }
  }
};
