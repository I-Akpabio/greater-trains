const SignIn = {
  template: `
    <div>
      <div v-if="view==='home'">
        <q-input color="purple-12" v-model="email" label="E-mail">
            <template v-slot:prepend>
              <q-icon name="mail"></q-icon>
            </template>
        </q-input>
        <br />

        <q-input type="password" color="purple-12" v-model="password" label="Password">
        <template v-slot:prepend>
            <q-icon name="lock"></q-icon>
        </template>
        </q-input>

        <br />

        <q-btn class="full-width" @click="login()" style="background-color: #D60829; color: white" label="Sign In"></q-btn>
        <a @click="view='forgot'" href="#/signin">Forgot password</a>
      </div>

      <div v-if="view==='forgot'">
      <div class="text-subtitle2">
        Reset
      </div>
        <q-input color="purple-12" v-model="email1" label="E-mail">
            <template v-slot:prepend>
              <q-icon name="mail"></q-icon>
            </template>
        </q-input>
        <br />

        <q-input type="password" color="purple-12" v-model="password1" label="Password">
        <template v-slot:prepend>
            <q-icon name="lock"></q-icon>
        </template>
        </q-input>

        <br />

        <q-input type="password" color="purple-12" v-model="npassword" label="New Password">
        <template v-slot:prepend>
            <q-icon name="lock"></q-icon>
        </template>
        </q-input>

        <br />

        <q-input type="password" color="purple-12" v-model="cpassword" label="New Password">
        <template v-slot:prepend>
            <q-icon name="lock"></q-icon>
        </template>
        </q-input>

        <br />

        <q-btn class="full-width" @click="reset()" style="background-color: #D60829; color: white" label="Reset"></q-btn>
        <a @click="view='home'" href="#/signin">Login</a>
      </div>
    </div>
    `,

  mounted: function() {
    this.$store.commit('setTitle', 'Sign In');
  },

  data: function() {
    return {
      email: "",
      password: "",
      view: "home",
      email1: "",
      password1: "",
      npassword: "",
      cpassword: ""
    };
  }, 

  methods: {
      login: function() {
          var data = JSON.parse(localStorage.getItem('greater_trains'));
          var f = false;
          var d = null;
          for(var i = 0; i < data.users.length; i++) {
              var u = data.users[i];
              if(u.email === this.email && u.password === this.password) {
                  f = true;
                  d = u;
                  break;
              }
          }

          if(f) {
              this.$q.dialog({
                title: 'Login successful',
                message: 'You have successfully logged in'
              }).onDismiss(() => {
                this.$store.dispatch('auth', d);
                this.$router.go(-1);
              });
          } else {
            this.$q.dialog({
              title: 'Login Unsuccessful',
              message: 'No User found'
            }).onDismiss(() => {

            });
          }
       
      },

      reset: function() {
        if(this.npassword !== this.cpassword) {
          this.$q.dialog({
              title: 'Password not match',
              message: 'Password do not match'
            });
          return;
        }

         var data = JSON.parse(localStorage.getItem('greater_trains'));
         var f = false;
         var d = null;
          for(var i = 0; i < data.users.length; i++) {
              var u = data.users[i];
              if(u.email === this.email1 && u.password === this.password1) {
                f = true;
                d = u;
                break;
              }
          }

        if( !f ) {
           this.$q.dialog({
              title: 'No user found',
              message: 'No user found'
            });
        } else {
           u.password = this.npassword;
           window.Loc.set('users', data);
           this.$q.dialog({
              title: 'Reset Successful',
              message: 'The message was successfully reset'
            });
           this.password1 = "";
           this.npassword = "";
           this.cpassword = "";
           this.email1 = "";
           
        }
      }
  }
};
