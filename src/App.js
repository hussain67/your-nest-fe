import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</BrowserRouter>
	);
}

export default App;
