
// mustache the numbers, add on click event to + & -, write functions to handle the data
// how to set a timer that counts down the time when start button is pressed, how to play a sound when time is up

// create a new component, get data from child which is the sessionlength, then take data to parent sessionlengthtime
/* define different outer variables, write contents of data in app instance, write computed functions for 
the session length, write start and reset functions
try and use my own understanding to build

*/
var STOP = 0,
	START= 1,
	BREAK = 2,
	PAUSE = 3,
	TIMEOUT=4,
	DEFAULT_TIME = 1500000,
	DEFAULT_BREAK_TIME=300000;
	var DEFAULT_MINUTE = 25,
 	DEFAULT_BREAK = 5;


var app = new Vue({
	el:"#app",
	data:{
		limit: DEFAULT_TIME,
		_limit: DEFAULT_TIME,
		counter:DEFAULT_TIME,
		sessionLength:25,
		breakLength:5,
		startTime:null,
		timerID:null,
		state:STOP,
		stateMsg:'Session',
	},
	computed:{
		display:function(){
			return this.sessionMinute + ':' + this.sessionSecond;
		},
		sessionMinute:function(){
			var sessionMinutes = 0;
			if(this.state == STOP){
				sessionMinutes = this.sessionLength;
			}else{
				sessionMinutes = ((this.counter / 1000) / 60) | 0;
			}
			if(sessionMinutes < 10) return '0' + sessionMinutes;
			else return sessionMinutes;
		},
		sessionSecond:function(){
			var sessionSeconds = ((this.counter / 1000) % 60) | 0;
			if(sessionSeconds < 10) return '0' + sessionMinutes;
			else return sessionMinutes;
		}
	}, 
	ready: function(){

	},
	methods:{
		addSessionLength: function(){
			this.sessionLength = this.sessionLength + 1;
		},
		minusSessionLength: function(){
			this.sessionLength = this.sessionLength - 1;
		},
		addBreakLength: function(){
			this.breakLength = this.breakLength + 1;
		},
		minusBreakLength: function(){
			this.breakLength = this.breakLength - 1; 
		},

		start:function(){
			if(this.state != START){
				this.state = START;
				this.startTime = Date.now();

				var newLimit = this.sessionLength * 60 * 1000;

				if(newLimit != this.limit) {
					this.limit = newLimit;
					this.counter = newLimit;
				}
				if (!this.timerID){
					this.timerID = setInterval(this.countdown.bind(this), 100);
				}
			}
			return this.timerID;
		},

		countdown:function(){
			if (this.state = START || this.state == BREAK){
				this.counter = this.limit - (Date.now() - this.startTime);

				if(this.counter <= 0){
					if(this.state == BREAK){
						this.state = START;
						this.stateMsg = 'Session';
						this.startTime = Date.now();
						this.limit = this.sessionLength * 60 * 1000;
					}else if(this.state == START) {
						this.state = BREAK;
						this.startTime = Date.now();
						this.limit = this.breakLength * 60 * 1000;
						this.stateMsg = '-Break-';
					}
				}
			}
			return this.counter;
		},

		reset: function(){
			this.state = STOP;
			this.stateMsg = 'Session';
			this.sessionLength = DEFAULT_MINUTE;
			this.breakLength = DEFAULT_BREAK;
			clearInterval(this.timerID);
			this.startTimer = this.timerID = null;
			this.counter = this.limit = this._limit = DEFAULT_MINUTE;
			return this.counter;
		}

	}

});


