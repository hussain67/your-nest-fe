const axios = require("axios");
const { defineConfig } = require("cypress");
//const { preRegister } = require("./src/utils/api/authApi");

module.exports = defineConfig({
	component: {
		devServer: {
			framework: "create-react-app",
			bundler: "webpack"
		}
	},
	env: {
		name: "shahid",
		email: "hussain.msh67@yahoo.com",
		password: "123123"
	},
	e2e: {
		baseUrl: "http://localhost:3000",
		setupNodeEvents(on, config) {
			// implement node event listeners here
			on("task", {
				async setupDB() {
					const result = await axios.post("http://localhost:8000/api/v1/auth/seed");
					console.log(result.data);
					return null;
				}
			});
		}
	}
});
