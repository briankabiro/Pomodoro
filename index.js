// mustache the numbers, add on click event to + & -, write functions to handle the data

var lengthTimeAdjuster = new Vue({
	el:'#length-time-adjuster',
	data:{
		breaklength:5,
		sessionlength:25
	},
	methods:{
		minusBreakLength: function(){
			this.breaklength = this.breaklength - 1 
		},
		addBreakLength: function(){
			this.breaklength = this.breaklength + 1
		},
		minusSessionLength: function(){
			this.sessionlength = this.sessionlength - 1 
		},
		addSessionLength: function(){
			this.sessionlength = this.sessionlength + 1 
		},
	}
})

