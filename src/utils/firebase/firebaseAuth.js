import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail, confirmPasswordReset, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseUtils";

// Saving user in database
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;
	// It will point to the document
	const userDocRef = doc(db, "users", userAuth.uid);

	//Will get the data from the dock
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			});
		} catch {}
	}
	// console.log(userSnapshot);
};

export const createAuthUserWithEmailAndPassword = async (email, password, name) => {
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const sendUserVerificationEmail = async user => {
	return await sendEmailVerification(user);
	// const verifiedUser = auth.currentUser;
	// console.log(verifiedUser);
};
// Update user profile
export const updateUserProfile = async update => {
	return await updateProfile(auth.currentUser, {
		...update
	});
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

// Forgot password email
export const forgotPassword = async email => {
	return await sendPasswordResetEmail(auth, email, { url: process.env.REACT_APP_LOGIN_URL });
};

// Reset password

export const resetPassword = async (oobCode, newPassword) => {
	return await confirmPasswordReset(auth, oobCode, newPassword);
};
export const onAuthStateChangedListener = callback => {
	return onAuthStateChanged(auth, callback);
};
export const signOutUser = async () => {
	return await signOut(auth);
};
