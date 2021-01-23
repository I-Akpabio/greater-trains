const Foo = {
  template: `
  <div style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">
    <div class="text-h5">Frequently Asked Questions</div>
    <p>Select any filter and click on Apply to see results</p>
    <q-input filled bottom-slots v-model='searchword' @keyup="search" label="Search" :dense="true">
        <template v-slot:before>
          <q-icon name="search" />
        </template>

        <template v-slot:append>
          <q-btn round dense flat icon="send" />
        </template>
    </q-input>

    <q-list bordered style="margin-left: -15px; margin-right: -15px">
      <q-item @click="select(l)" clickable v-ripple v-for='l in searchlist'>
        <q-item-section>{{l.name}}</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="keyboard_arrow_right" />
        </q-item-section>
      </q-item>
      </q-list>
  </div>`,
  mounted: function() {
 
    this.$store.commit('setTitle', 'F.A.Qs');
    this.searchlist = this.list;
  },
  data: function() {
    return {
      searchword: "",
      view: "home",
      list: [
        { name: "Assisted Travel", id: 1, data: [] },
        { name: "Booking", id: 2, data: [] },
        { name: "Car Parking", id: 3, data: [] },
        { name: "Lost Property", id: 4, data: [] }
      ],
      searchlist: []
    };
  },
  methods: {
     changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    select: function(l) {
      this.changeRoute('faqitem/' + l.id);
    },
    search: function(e) {
      if (this.searchword === "") {
        this.searchlist = this.list;
        return;
      }

      var newlist = [];
      var sw = this.searchword;
      this.list.forEach(function(l) {
        if (l.name.search(sw) > -1) {
          newlist.push(l);
        }
      });

      this.searchlist = newlist;
    }
  }
};
