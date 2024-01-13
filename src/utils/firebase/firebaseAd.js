import { doc, updateDoc, getDoc, deleteDoc, getDocs, addDoc, collection, query, serverTimestamp, orderBy, where, limit, startAfter } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

import { db, storage } from "./firebaseUtils";
import { v4 as uuidv4 } from "uuid";

export const storeImage = async (uid, image) => {
	// console.log(image);
	return new Promise((resolve, reject) => {
		const filename = `${uid}-${uuidv4()}`;
		const storageRef = ref(storage, filename);
		const uploadTask = uploadBytesResumable(storageRef, image);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion

		uploadTask.on(
			"state_changed",
			snapshot => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
						console.log("Ok");
				}
			},
			error => {
				// Handle unsuccessful uploads
				reject(error);
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
					console.log("File available at", downloadURL);
					resolve(downloadURL);
				});
			}
		);
	});
};

// Delete Image

export const deleteImage = async file => {
	return new Promise((resolve, reject) => {
		const storageRef = ref(storage, file);
		deleteObject(storageRef, file)
			.then(() => resolve("success"))
			.catch(error => {
				reject("Failor");
				console.log(error);
			});
	});
};

//DOCUMENT RELATED FUNCTIONS

export const addDocument = async (collectionKey, ad) => {
	const adToSave = { ...ad, timeStamp: serverTimestamp() };
	const docRef = await addDoc(collection(db, collectionKey), adToSave);
	if (docRef) {
		console.log(docRef);
	}
};

// Update an app
export const updateAd = async (collectionKey, id, ad) => {
	const docRef = doc(db, collectionKey, id);
	const updatedAd = await updateDoc(docRef, { ...ad, timeStamp: serverTimestamp() });
	console.log(updatedAd);
};

// Get all documents
export const getDocuments = async (type, action, noOfAds) => {
	try {
		const listingRef = collection(db, "listings");
		const q = query(listingRef, where("type", "==", type), where("action", "==", action), orderBy("timeStamp", "desc"), limit(noOfAds));
		const querySnap = await getDocs(q);
		const lastVisible = querySnap.docs[querySnap.docs.length - 1];
		const listings = [];
		querySnap.forEach(doc => {
			return listings.push({
				id: doc.id,
				data: doc.data()
			});
		});
		// console.log(listings);
		return { listings, lastVisible };
		// console.log(listings);
	} catch (error) {
		console.log(error);
	}
};
export const getAllDocuments = async uid => {
	try {
		const listingRef = collection(db, "listings");
		const q = query(listingRef, where("userRef", "==", uid), orderBy("timeStamp", "desc"));
		const querySnap = await getDocs(q);

		const listings = [];
		querySnap.forEach(doc => {
			return listings.push({
				id: doc.id,
				data: doc.data()
			});
		});
		// console.log(listings);
		return listings;
		// console.log(listings);
	} catch (error) {
		console.log(error);
	}
};
export const getMoreDocuments = async (type, action, noOfAds, lastFetchedAds) => {
	try {
		const listingRef = collection(db, "listings");
		const q = query(listingRef, where("type", "==", type), where("action", "==", action), orderBy("timeStamp", "desc"), startAfter(lastFetchedAds), limit(noOfAds));
		const querySnap = await getDocs(q);
		const lastVisible = querySnap.docs[querySnap.docs.length - 1];
		console.log(lastVisible);
		const listings = [];
		querySnap.forEach(doc => {
			return listings.push({
				id: doc.id,
				data: doc.data()
			});
		});
		// console.log(listings);
		return { listings, lastVisible };
		// console.log(listings);
	} catch (error) {
		console.log(error);
	}
};

// Get a specific ad with id

export const getAd = async id => {
	const docRef = doc(db, "listings", id);

	const docSnap = await getDoc(docRef);
	return docSnap.data();
};

// Delete an ad
export const deleteAd = async id => {
	await deleteDoc(doc(db, "listings", id));
};

// Get landlord information

export const getAdvertiser = async userRef => {
	try {
		const docRef = doc(db, "users", userRef);
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	} catch (error) {
		//toast.error("Could not get landlord data");
	}
};
