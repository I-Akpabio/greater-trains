const FaqItem = {
  props: ['id'],
  template: `
  <div style="margin-top: 10px;">
    <div class="text-h6" style="margin-left: 15px;margin-bottom: 30px;">{{name}}</div> 
  
   <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        v-for="x in list"
        :label="x.q">
        <q-card>
          <q-card-section>
            {{x.a}}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

  </div>`,
  mounted: function() {
 
    this.$store.commit('setTitle', 'F.A.Qs');
    var faqs = window.Loc.get().faqs;
    for(var i = 0; i < faqs.length; i++) {
      if(Number(this.id) === faqs[i].id) {
        this.name = faqs[i].name;
        this.list = faqs[i].data;
      }
    }
  },
  data: function() {
    return {
      name: '',
      list: []
    };
  },
  methods: {
   
  }
};
