import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainNav from "./components/nav/MainNav";
import { AuthProvider } from "./context/authContext";
import AccountActivate from "./pages/auth/activate/AccountActivate";
import LoginRegister from "./pages/auth/login-register/LoginRegister";
import Home from "./pages/home/Home";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<MainNav />
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/account/login-register"
						element={<LoginRegister />}
					/>

					<Route
						path="/auth/account-activate/:token"
						element={<AccountActivate />}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
