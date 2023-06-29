import { axios } from "../utils/requestUtils";

export function signInWithEmailAndPassword(username, password) {
	return new Promise((resolve, reject) => {
		axios
			.get("users/authorization", {
				headers: { "Content-Type": "application/json", Authorization: "Basic " + btoa(username + ":" + password) },
			})
			.then((response) => {
				if (response && response.status === 200) {
          saveUserData(response.data, true);
					resolve(response.data);
				} else {
					console.log(`loginServices: status=${response?.status}, data=`, response?.data);
					reject(new Error(`El inicio de sesion ha fallado, ${response?.message}`));
				}
			})
			.catch((error) => {
				console.log({ error });
        reject(new Error(`El inicio de sesion ha fallado, ${error?.message}`));
			});
	});
}

export function registerUser(registerData) {
	return new Promise((resolve, reject) => {
		axios
			.post("users/signup", registerData)
			.then((response) => {
				if (response && response.status === 200) {
          saveUserData(response.data, true);
					resolve(response.data);
				} else {
					reject(new Error(`El registro ha fallado, ${response?.message}`));
				}
			})
			.catch((error) => {
				console.log({ error });
        reject(new Error(`El registro ha fallado, ${error?.message}`));
			});
	});
}

export function saveUserData(data, hasToken) {
	if (hasToken) {
		// Storing user token
		localStorage.setItem("tokenDentelX", data.authorization_token);
	}

	// Storing default user id and doctor id
	localStorage.setItem("userId", data.userId ?? data._id);
	localStorage.setItem("doctorId", data.doctorId);
	localStorage.setItem("_id", data._id);
	localStorage.setItem("username", data.email);
	localStorage.setItem("nombres", data.doctor_nombre);
	localStorage.setItem("roleUser", data.role);
}

export function getAuthToken() {
	return localStorage.getItem("tokenDentelX");
}

export function clearUserData() {
	localStorage.clear();
}