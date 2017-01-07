/* Write variables, link functions to dom, write display function 

fix css and add keyboard shortcuts well

*/
var STOP = 0,
	START = 1,
	BREAK = 2;
var DEFAULT_SESSION = 25,
	DEFAULT_BREAK = 5,
	DEFAULT_TIME = 1500000,
	DEFAULT_BREAK_TIME = 300000;


var app = new Vue({
	el:"#app",
	data:{
		sessionLength:25,
		breakLength:5,
		counter:DEFAULT_TIME,
		state:STOP,
		stateMsg:"SESSION",
		startTime:null,
		limit:null,
		timerID:null, 
		stateMsgStyle:{
			fontSize:'2em'
		}
	},
	computed:{
		display: function(){
			return this.sessionMinutesDisplayer + ':' + this.sessionSecondsDisplayer;
		},
		sessionMinutesDisplayer : function(){
			var sessionMinutes = 0
			if(this.state == STOP){
				sessionMinutes = this.sessionLength
			}else{
				sessionMinutes = ((this.counter / 1000) / 60) | 0;
			}
			if(sessionMinutes < 10) sessionMinutes = '0' + sessionMinutes;
			else return sessionMinutes 
		},

		sessionSecondsDisplayer : function(){
			var sessionSeconds = ((this.counter / 1000) % 60) | 0;
			if (sessionSeconds < 10){
				sessionSeconds = "0" + sessionSeconds 
			}else return sessionSeconds
			return sessionSeconds
		} 
	},

	methods:{
		subtractsBreakLength:function(){
			this.breakLength--
		},
		addsBreakLength: function(){
			this.breakLength++
		},
		subtractsSessionLength: function(){
			this.sessionLength--
		}, 
		addsSessionLength: function(){
			this.sessionLength++
		},
		start:function(){
			if(this.state != START){
				this.state = START;
				this.startTime = Date.now();

				var newLimit = this.sessionLength * 60 * 1000;
			
			if(newLimit != this.limit){
				this.limit = newLimit
				this.counter = newLimit
			}
			if(!this.timerID){
				this.timerID = setInterval(this.countdown, 200)
				}	
			}
			return this.timerID
		},
		countdown:function(){
			if(this.state == START || this.state == BREAK){
				this.counter = this.limit - (Date.now() - this.startTime)
					
					if(this.counter <= 0){
						if(this.state == START){
						this.state = BREAK
						this.stateMsg = 'BREAK'
						this.limit = this.breakLength * 60 * 1000
						this.startTime = Date.now()
					}else if(this.state == BREAK){
						this.state = START
						this.stateMsg = "SESSION"
						this.limit = this.sessionLength * 60 * 1000
						this.startTime = Date.now()
						}	
					}		
			}
			return this.counter
		},
		reset:function(){
			this.counter = DEFAULT_SESSION;
			this.state = STOP;
			clearInterval(this.timerID)
			this.limit = null;
			this.stateMsg = "SESSION";
			this.sessionLength = DEFAULT_SESSION
		}
	}

})