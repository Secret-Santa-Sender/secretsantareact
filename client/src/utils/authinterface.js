import API from "../utils/API";

const authState = {
	loggedIn : true
}

// API.checkForSession()
//       .then(res => {
//         console.log("check for session from auth interface", res)
//         authState.loggedIn = true
//       })
//       .catch((err) => {console.log(err)});

export default authState;