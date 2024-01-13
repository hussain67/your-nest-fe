import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MainNav from "./components/nav/MainNav";
import SiteFooter from "./components/nav/SiteFooter";
import PrivateRoute from "./components/routes/PrivateRoute";
import { AuthProvider } from "./context/authContext";
import AdView from "./pages/adview/AdView";
import Login from "./pages/auth/login-register/Login";
import Register from "./pages/auth/login-register/Register";
import Home from "./pages/home/Home";
import AdCreate from "./pages/user/ad/AdCreate";
import AdEdit from "./pages/user/ad/AdEdit";
import AdForm from "./components/forms/AdForm";
import Category from "./pages/category/Category";
import Profile from "./pages/auth/profile/Profile";
import ForgotPassword from "./pages/auth/reset-password/ForgotPassword";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/user/dashboard/Dashboard";
import { useState } from "react";
import Info from "./components/info/Info";

function App() {
	const [info, setInfo] = useState(true);
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppLayout>
					<MainNav />
					<Info
						info={info}
						setInfo={setInfo}
					/>
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/account/login"
							element={<Login />}
						/>
						<Route
							path="/account/register"
							element={<Register />}
						/>
						<Route
							path="account/forgot-password"
							element={<ForgotPassword />}
						/>
						<Route
							path="/account/reset-password"
							element={<ResetPassword />}
						/>
						<Route
							path="/category/:type/:action"
							element={<Category />}
						/>
						<Route
							path="/"
							element={<PrivateRoute />}
						>
							<Route
								path="user/dashboard"
								element={<Dashboard />}
							/>

							<Route
								path="ad/create"
								element={<AdCreate />}
							/>

							<Route
								path="ad/create/:action/:type"
								element={<AdForm />}
							/>

							<Route
								path="/ad/:slug"
								element={<AdView />}
							/>
							<Route
								path="user/ad/:slug"
								element={<AdEdit />}
							/>
							<Route
								path="/user/profile"
								element={<Profile />}
							/>
						</Route>
					</Routes>
					{<SiteFooter />}
				</AppLayout>
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
