
async function fetchUser(){
    try{
        const response = await axios.get('http://localhost:5000/api/auth/whoami', {withCredentials: true});
        user_data = response.data.id;
        user.name = user_data.given_name;
        user.email = user_data.email
        console.log(user)
        // setUsername()
    }catch(error){
        console.log('Error sending google auth request.')
    }
}

// function setUsername(){
//     console.log(user)
//     if (user.name != '' & user.email != ''){
//         const navbar_username = document.getElementById("navbar-username");
//         navbar_username.textContent = user.name
//     }
// }

fetchUser()
