const Info = { 
  template: `
  <div>
    <q-list v-if="view=='home'" style="margin-top: 10px" seperator>

      <q-item @click="changeRoute('usingapp')" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="phone"></q-icon>
        </q-item-section>
        <q-item-section>Using our app</q-item-section>
      </q-item>

      <q-item @click="view='hs'" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="web"></q-icon>
        </q-item-section>
        <q-item-section>Help and Support</q-item-section>
      </q-item>

    </q-list>

    <div view="hs" v-if="view=='hs'">
       <q-list style="margin-top: 10px" seperator>

          <q-item @click="changeRoute('chat')" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="phone"></q-icon>
            </q-item-section>
            <q-item-section>Chat With Customer Care</q-item-section>
          </q-item>

          <q-item @click="changeRoute('fault')" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="web"></q-icon>
            </q-item-section>
            <q-item-section>Fault Report</q-item-section>
          </q-item>

        </q-list>
        <br />
        <q-btn @click="view='home'" color="red">Back</q-btn>
    </div>

  </div>`,
   mounted: function() {
    this.$store.commit('setTitle', 'Information');
  },
  data: function() {
    return { view: 'home' };
  },
  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    show: function() {
      
    }
  }  
}