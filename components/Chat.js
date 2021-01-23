const Chat = { 
  template: `
  <div>
    <div class="q-pa-md" style="height: 74vh">
     <q-chat-message
        name="Jane - Customer Service"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="['how r you doing today?']"
      />
       <q-chat-message
        name="Jane - Customer Service"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="['I am available to guide you?']"
      />
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['I have an issue?']"
        sent
      />
     
    </div>

   <q-input style="height: 10vh" rounded outlined v-model="text">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="send"></q-icon>
          </q-avatar>
        </template>
      </q-input>
   </div>`,
   mounted: function() {
    this.$store.commit('setTitle', 'Customer Care');
  },
  data: function() {
    return {text: ''};
  },
  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    show: function() {
      
    }
  }  
}