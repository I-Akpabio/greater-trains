const ReturnTrain = {
	template: `
	<div style="background-color: aliceblue; margin-bottom: 30px">
		<div class="text-white" style="padding-left: 20px;padding-top: 5px;padding-bottom: 5px;background-color: #D60829;">
			<div class="row">
				<div class="col">
					{{ticket.fromStation}}
				</div>
			</div>

			<q-space></q-space>

			<div class="row">
				<div class="col">
					<q-icon name="arrow_forward"></q-icon>
				</div>
				<div class="col">
					{{ticket.toStation}}
				</div>
				<div class="col">
					<q-btn style="display: none;" @click="show()" flat size="sm" label="Refine" icon="menu"></q-btn>
				</div>
			</div>

			<div class="row">
				<div class="col">
					<q-icon name="person"></q-icon>
					{{passengers(ticket)}}
				</div>
				<div class="col">
					<q-btn @click="filterPrice()" flat size="sm" label="Filter Price" icon="menu"></q-btn>
				</div>
			</div>
		</div>

		<br/>
		<div v-if="! trainEmpty()" v-for="t,k in trains" :key="k">
			<div v-if="! trainEmpty(k)" style="padding-left: 20px;margin-top: 20px;" class="text-subtitle2">{{cleanDate(k)}}</div>

			<q-card v-if="! trainEmpty(k)" v-for="x,i in t" :key="i" class='my-card' style="margin-top: 12px">
				<q-card-section>
					<div class="row">
						<div class="col">
							<div class="text-h6">{{x.start}}</div>
						</div>
						<div class="col">
							<div class="text-h6">
							<q-icon name="arrow_forward" style="font-size: 10px"></q-icon>{{x.end}}
							</div>
						</div>
						<div class="col">
							<q-btn flat 
								color="secondary"
								@click="goSummary(x)">
								<div style="font-size: 15px">&pound; {{x.price}}</div>
								<q-icon name="keyboard_arrow_right"></q-icon>
							</q-btn>
						</div>
					</div>
					<br/>
					<q-card-actions>
						<div style="font-size: 12px">
							{{x.platform}} * {{x.time}} * 1 changes
						</div>
					
					</q-card-actions>
				</q-card-section>
			</q-card>
		</div>

		<div style="margin-top: 160px; padding-bottom: 190px" v-if="trainEmpty()">
			<div class="text-h6">There are no tickets for this search</div>
			<br /><br />
			<q-btn @click="changeRoute('bar')" color="red">Change search</q-btn>
		</div>
	</div>
	`,
	data: function() {
		return {
			ticket: {},
			trains: {},
			sort: ''
		};
	},
	mounted: function() {
		this.$store.commit('setTitle', 'Return');
		var t = window.Loc.get();
		this.ticket = t.returnTicket;
		t = t.returnTicket;

		this.trains[t.dateTime] = this.getTrains(t.dateTime);

		var nextDay = moment().add(1, 'days').format("YYYY-MM-DD");
		this.trains[nextDay] = this.getTrains(nextDay);
	},
	computed: {
		
	},
	methods: {
		show: function() {
			console.log(this.trains);
		},

		changeRoute: function(route) {
	      this.$router.push('/' + route);
	    },

		trainEmpty: function(k) {
			if(k !== null && k !== undefined) {
				return _.isEmpty(this.trains[k]);
			}
			if(_.isEmpty(this.trains)) return true;
			for (var key in this.trains) {
			    if (this.trains.hasOwnProperty(key)) {
			        if(! _.isEmpty(this.trains[key])) return false;
			    }
			}
			return true;
		},

		cleanDate: function(d) {
			return new Date(d).toDateString();
		},

		goSummary: function(train) {
			var cheaperTickets = this.checkCheaper(train);
			var t = window.Loc.get().returnTicket;
			t.train = train;
			window.Loc.set('returnTicket', t);

			if(! _.isEmpty(cheaperTickets) ) {
				this.$router.push({
				    name: 'cheap',
				    params: { otherProp: cheaperTickets }
				})
				return;
			}

			this.$router.push('/summary');
		},

		checkCheaper: function(train) {
			var t = window.Loc.get().returnTicket;
			var cheaper = [];

			for (var key in this.trains) {
			    if (this.trains.hasOwnProperty(key)) {
			    	for(var x = 0; x < this.trains[key].length; x++){
			    		var inTrain = this.trains[key][x];
			    		if(inTrain.from === train.from && inTrain.to === train.to &&
				    		inTrain.start === train.start && inTrain.date === train.date &&
				    		inTrain.price < train.price) {
				    		cheaper.push(inTrain);
				    	}
			    	}
				}
			}

			return cheaper;
		},

		passengers: function(t) {
			var r = '';
			if(t.adult && t.adult > 0) r += (t.adult + " adult");
			if(t.childs && t.childs > 0) r += (", " + t.childs + " children");
			return r;
		},

		getTrains: function(dateStr) {
			var t = window.Loc.get();
			var tic = t.returnTicket;
			var trains = t.trains;
			var date = moment(dateStr);
			var dateFmt = date.format("YYYY-MM-DD");
			var finalTrains = [];

			trains = trains.filter(function(t) {
				return t.to === tic.toStation && t.from === tic.fromStation && dateFmt === t.date;
			});

			for(var i = 0; i < trains.length; i++) {
				var train = trains[i];
				var trainDate = moment(train.date+ " " + train.start);
				var hoursDiff = moment.duration(trainDate.diff(date)).asHours();
				if(hoursDiff >= 0) { finalTrains.push(train); }
			}

			return finalTrains;
		},

		filterPrice:  function () {
			var that = this;
		      this.$q.dialog({
		        title: 'Options',
		        message: 'Choose your options',
		        options: {
		          type: 'radio',
		          model: "",
		          // inline: true,
		          items: [
		            { label: 'Lowest to Highest', value: 'asc', color: 'secondary' },
		            { label: 'Highest to Lowest', value: 'desc' },
		            { label: 'None', value: 'none' },
		          ]
		        },
		        cancel: true,
		        persistent: true
		      }).onOk(data => {
	         	that.sort = data;
	         	that.filter();
		      }).onCancel(() => {
		        console.log('>>>> Cancel')
		      }).onDismiss(() => {
		        console.log('I am triggered on both OK and Cancel')
		      })
		},

		filter: function() {
			var t = Object.assign({}, this.trains);
			if(! _.isEmpty(t)) {
				for (var key in t) {
				    if (t.hasOwnProperty(key)) {
				        t[key] = _.orderBy(t[key], ['price'], [this.sort]);
				    }
				}
			}
			this.trains = t;
		}
	}
  
};

