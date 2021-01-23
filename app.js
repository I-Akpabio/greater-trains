var localD = localStorage.getItem('greater_trains');
var localO = JSON.parse(localD);

if(localD === null || !localO.hasOwnProperty('users')  
  || !localO.hasOwnProperty('stations') || !localO.hasOwnProperty('trains') 
  || !localO.hasOwnProperty('basket') || !localO.hasOwnProperty('faqs') 
  || !localO.hasOwnProperty('serches') || !localO.hasOwnProperty('wallet') 
  || !localO.hasOwnProperty('returnTicket') || ! localO.hasOwnProperty('bookingTicket')) {
  localStorage.setItem('greater_trains', 
    JSON.stringify(
      {
        "users":
        [
          {
            "email":"inyene@gmail.com",
            "password":"red",
            "telephone":"903900403",
            "fname":"Akpabio",
            "lname":"Akpabio",
            "postcode":"90392",
            "country":"Nigeria",
            "address":"22 dmsndjdfnj"
          }
        ],
        "basket": [],
        "bookingTicket": {
          type: 'Single',
          "fromStation":"Norwich",
          "toStation":"Norwood",
          "dateTime":"2019-08-03 13:00",
          "adult":1,
          "childs":1,
          "departArrive":"one"
        },
        "stations":["Norwich","London Victoria","Norwood","Alexandria","Attadale","Bamber Bridge","Berry Brow","Jordan Hill","St James Park"],
        "faqs":[{"name":"Assisted Travel","id":1,"data":[{"q":"Can Wheelchair users pass through automatic ticket gates?","a":"The ticket gates are.."},{"q":"How do i make a booking for a wheelchair user?","a":"To make a wheelchair booking call our Assited Travel team 080002828"}]},{"name":"Booking","id":2,"data":[]},{"name":"Car Parking","id":3,"data":[]},{"name":"Lost Property","id":4,"data":[]}],
        "wallet":[],
        "returnTicket":null,
        "serches":[]
    }
  ));
}

window.Loc = {
  get: function() {
    return JSON.parse(localStorage.getItem('greater_trains'));
  },

  set: function(name, data) {
    var d = JSON.parse(localStorage.getItem('greater_trains'));
    var o = {};
    o[name] = data;
    localStorage.setItem('greater_trains', JSON.stringify(Object.assign({}, d, o)));
  }
};

// if using a Quasar language pack other than the default "en-us";
// requires the language pack style tag from above
Quasar.lang.set(Quasar.lang.ptBr) // notice camel-case "ptBr"

// if you want Quasar components to use a specific icon library
// other than the default Material Icons;
// requires the icon set style tag from above
Quasar.iconSet.set(Quasar.iconSet.fontawesomeV5) // fontawesomeV5 is just an example

// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files



// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '', component: Home },
  { path: '/', component: Home },
  { path: '/faq', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/find-train', component: FindTrain },
  { path: '/return-train', component: ReturnTrain },
  { path: '/signin', component: SignIn },
  { path: '/register', component: Register },
  { path: '/summary', component: Summary},
  { path: '/payment', component: Payment},
  { path: '/basket', component: Basket },
  { path: '/info', component: Info },
  { path: '/fault', component: FaultReport },
  { path: '/route', component: RouteDetails },
  { path: '/chat', component: Chat},
  { path: '/faqitem/:id', component: FaqItem, props: true },
  { path: '/livedep', component: LiveDeparture },
  { path: '/usingapp', component: UsingApp },
  { path: '/cheap', component: CheapTickets, props: (route) => ({a: route.params}), name: 'cheap' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes: routes // short for `routes: routes`
})

/*
  Example kicking off the UI.
  Obviously, adapt this to your specific needs.
 */

// custom component example, assumes you have a <div id="my-page"></div> in your <body>
Vue.component('my-page', {
  template: '#my-page'
})

//Set up the store

const store = new Vuex.Store({
  state: {
    count: 0,
    title: 'Home',
    bookingTicket: null,
    basketCount: !window.Loc.get().basket.length ? 0 : window.Loc.get().basket.length,
    ticketsPage: 'drake',
    auth: {
      isAuth: false,
      data: null
    }
  },
  mutations: {
    editBasket: function(state, count) {
      state.basketCount = count;
    },
    setTitle: function(state, title) {
      state.title = title;
    },
    login: function(state, data) {
      state.auth.isAuth = true;
      state.auth.data = data;
    },
    logout: function(state) {
      state.auth.isAuth = false;
      state.auth.data = null
    },
    ticketPageChange: function(state, data) {
      state.ticketsPage = data;
    }, 
  },
  actions: {
    editBasket: function(contect, count) {
      context.commit('editBasket', payload);
    },
    auth: function(context, payload) {
      context.commit('login', payload);
    },
    authOut: function(context, payload) {
      context.commit('logout');
    },
    ticketPageChange: function(context, payload) {
      context.commit('ticketPageChange', payload);
    }
  }
})

// start the UI; assumes you have a <div id="q-app"></div> in your <body>
var s = new Vue({
  el: '#q-app',
  router: router,
  store: store,
  data: function () {
    return {
      drawer: true,
      left: true
    }
  },
  computed: {
    title: function() {
      return this.$store.state.title;
    },
    route: function() {
      return this.$route.path;
    },
    basketCount: function() { 
      return this.$store.state.basketCount;
    },
    loggedIn: function() {
      return this.$store.state.auth.isAuth;
    },
    homeClass: function () {
      var r = this.$route.path;
      return {
        'text-primary': (r === '' || r === '/') ? true : false,
        'text-grey': (r !== '' && r !== '/') ? true : false
      }
    },
    routeClass: function () {
      return {
        'text-primary': (this.$route.path === '/route') ? true : false,
        'text-grey': (this.$route.path !== '/route') ? true : false
      }
    },
    depClass: function () {
      return {
        'text-grey': (this.$route.path !== '/livedep') ? true : false,
        'text-primary': (this.$route.path === '/livedep') ? true : false,
      }
    },
    tickWalletClass: function() {
      return {
        'text-grey': this.showTicket() ? true : false,
        'text-primary': (this.showTicket() === false) ? true : false,
      }
    },
    homeStyle: function() { return { color: ((this.$route.path === '' || this.$route.path === '/') ? 'blue' : 'black'),fontSize: '10px' } },
    depStyle: function() { return { color: ((this.$route.path === '/livedep') ? 'blue' : 'black'),fontSize: '9px' } },
    tickWalletStyle: function() { return { color: (this.showTicket() ? 'blue' : 'black'),fontSize: '10px' } },
    routeStyle: function() { return { color: ((this.$route.path === '/route') ? 'blue' : 'black'),fontSize: '10px' } }
  },
  methods: {
    changeRoute: function(route) {
      this.$router.push('/' + route);
    },
    checkA: function(r) {
      return this.$route.path === r;
    },
    goBack: function() {
      this.$router.go(-1);
    },
    getRoute: function() {
      return this.$route.path;
    },
    showBasket: function() {
      var r = this.$route.path;
      if(r === '' || r === '/' || r === '/bar' )
        return true;
      else 
        return false;
    },
    showTicket: function() {
      return this.$store.state.ticketsPage === 'mails' && this.$route.path === '/bar';
    },
    showTickets: function() {
      this.$store.dispatch('ticketPageChange', 'mails');
      this.$router.push('/bar' );
    },

    showPurchase: function() {
      this.$store.dispatch('ticketPageChange', 'drake');
      this.$router.push('/bar' );
    },

    showBottombar: function() {
      var r = this.$route.path;
      if(r === '' || r === '/' || r==='/faq' || r==='/basket' || r==='/livedep' || this.showTicket() || r==='/route') 
        return true;
      else 
        return false;
    },

    signOut: function() {
      this.$store.dispatch('authOut');
      this.$q.dialog({
        title: 'Sign out',
        message: 'You have successfully signed out'
      }).onOk(() => {
        console.log('OK')
      })
    },
    onItemClick: function() {

    }
  },
  // ...etc
})
