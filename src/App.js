import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainNav from "./components/nav/MainNav";
import PrivateRoute from "./components/routes/PrivateRoute";
import { AuthProvider } from "./context/authContext";
import AccessAccount from "./pages/auth/access/AccessAccount";
import AccountActivate from "./pages/auth/activate/AccountActivate";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import LoginRegister from "./pages/auth/login-register/LoginRegister";
//import Home from "./pages/home/Home";
import AdCreate from "./pages/user/ad/AdCreate";
import RentHouse from "./pages/user/ad/RentHouse";
import RentLand from "./pages/user/ad/RentLand";
import SellHouse from "./pages/user/ad/SellHouse";
import SellLand from "./pages/user/ad/SellLand";
import Dashboard from "./pages/user/dashboard/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<MainNav />
				<Routes>
					{/* <Route
						path="/"
						element={<Home />}
					/> */}
					<Route
						path="/account/login-register"
						element={<LoginRegister />}
					/>

					<Route
						path="/auth/account-activate/:token"
						element={<AccountActivate />}
					/>
					<Route
						path="/auth/forgot-password"
						element={<ForgotPassword />}
					/>
					<Route
						path="/auth/access-account/:token"
						element={<AccessAccount />}
					/>
					<Route
						path="/"
						element={<PrivateRoute />}
					>
						<Route
							path="dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="ad/create"
							element={<AdCreate />}
						/>
						<Route
							path="ad/create/sell/house"
							element={<SellHouse />}
						/>
						<Route
							path="ad/create/sell/land"
							element={<SellLand />}
						/>
						<Route
							path="ad/create/rent/house"
							element={<RentHouse />}
						/>
						<Route
							path="ad/create/rent/land"
							element={<RentLand />}
						/>
					</Route>
				</Routes>
			</AuthProvider>
			<ToastContainer
				position="top-center"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				data-cy="toast-modal"
			/>
		</BrowserRouter>
	);
}

export default App;
