const user = Object.defineProperties({}, {
    name: {
        get:function(){
            console.log("Get:"+this.value);
        },
        set:function(val){
            console.log("Set:"+val);
            this.value = val;
            setUsername(this.value)
        }
    },
    email: {
        get:function(){
            console.log("Get:"+this.value);
        },
        set:function(val){
            console.log("Set:"+val);
            this.value = val;
        }
    }
});


const setUsername = (val) => {
    const navbar_username = document.querySelector('#navbar-username')
    navbar_username.textContent = val
}