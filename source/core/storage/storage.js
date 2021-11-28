import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js";

// Firebase credential file
const configFile = "/config.json";

/** Class that provides interface with Firebase Storage. */
export class Storage {
  /**
   * Uploads a file to the "image" folder in the storage.
   *
   * @async
   * @param {Object} file - An object that represents a file.
   * @param {string} name - The name of the file.
   * @returns {string} URL of uploaded file.
   */
  async uploadImage(file, name) {
    // Fetch Firebase credentials
    let config = await fetch(configFile);
    config = await config.json();

    // Initialize storage connection
    const firebaseApp = initializeApp(config.firebaseConfig);
    const storage = getStorage(firebaseApp);

    // Create a reference to where the file will be stored
    const storageRef = ref(storage, "images/" + name);

    // Upload image to directory specified by reference
    const image = await uploadBytes(storageRef, file);

    // Get uploaded image URL
    const url = await getDownloadURL(ref(storage, image.metadata.fullPath));

    return url;
  }
}
