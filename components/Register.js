const Register = {
    template: `
    <div style="margin-left: 12px; margin-right: 12px; margin-bottom: 30px;">
        <q-input type="email" color="purple-12" v-model="email" label="E-mail">
            <template v-slot:prepend>
                <q-icon name="mail"></q-icon>
            </template>
        </q-input>
        <br />

        <q-input type="number" color="purple-12" v-model="telephone" label="Telephone (Optional)">
            <template v-slot:prepend>
                <q-icon name="phone"></q-icon>
            </template>
        </q-input>
        <br/>

        <q-input type="password" color="purple-12" v-model="password" label="Password">
            <template v-slot:prepend>
                <q-icon name="lock"></q-icon>
            </template>
        </q-input>

        <br />
        <q-input color="purple-12" v-model="fname" label="First Name">
            <template v-slot:prepend>
                <q-icon name="person_outline"></q-icon>
            </template>
        </q-input>

        <br />

        <q-input color="purple-12" v-model="lname" label="Last Name">
            <template v-slot:prepend>
                <q-icon name="person_outline"></q-icon>
            </template>
        </q-input>

        <br />

        <q-input color="purple-12" v-model="address" label="Address">
            <template v-slot:prepend>
                <q-icon name="home"></q-icon>
            </template>
        </q-input>

        <br />

        <q-input type="number" color="purple-12" v-model="postcode" label="Postcode">
            <template v-slot:prepend>
                <q-icon name="add_location"></q-icon>
            </template>
        </q-input>

        <br />

        <q-input color="purple-12" v-model="country" label="Country">
            <template v-slot:prepend>
                <q-icon name="location_on"></q-icon>
            </template>
        </q-input>

        <br />


        <q-btn @click="create()" class="full-width" style="background-color: #D60829; color: white" label="Create Account"></q-btn>
    </div>
    `,

    mounted: function() {
        this.$store.commit('setTitle', 'Register');
    },

    data: function() {
        return {
            email: '',
            password: '',
            telephone: '',
            fname: '',
            lname: '',
            postcode: '',
            country: '',
            address: ''
        };
    },

    methods: {
        create: function() {
            var data = JSON.parse(localStorage.getItem('greater_trains'));
            var new_user = {
                email: this.email,
                password: this.password,
                telephone: this.telephone,
                fname: this.fname,
                lname: this.lname,
                postcode: this.postcode,
                country: this.country,
                address: this.address
            };

            data.users.push(new_user);

            localStorage.setItem('greater_trains', JSON.stringify(data));

            this.$q.dialog({
                title: 'Registeration successful',
                message: 'You have successfully registered your account'
            }).onDismiss(() => {
                this.$store.dispatch('auth', new_user);
                this.$router.go(-1);
            });
            
        }
    }
};