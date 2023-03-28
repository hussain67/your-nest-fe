const axios = require("axios");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
	component: {
		devServer: {
			framework: "create-react-app",
			bundler: "webpack"
		}
	},

	e2e: {
		baseUrl: "http://localhost:3000",
		setupNodeEvents(on, config) {
			// implement node event listeners here
			on("task", {
				async seedDatabase() {
					axios.post("http://localhost:8000/api/v1/auth/seed");
					return null;
				}
			});
		}
	}
});
