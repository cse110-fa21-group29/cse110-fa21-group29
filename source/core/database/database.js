import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { child, get, getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

export class Database {
  async getRecipes() {
    let response = await fetch('../../../config.json');
    response = await response.json();
    
    const app = initializeApp(response.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());
    let data = undefined;

    await get(child(dbRef, `recipes`)).then((snapshot) => {
    if (snapshot.exists()) {
        data = snapshot.val();
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

    return data;
  }

  async writeUserData(object) {
    let response = await fetch('../../../config.json');
    response = await response.json();
    
    const app = initializeApp(response.firebaseConfig);
    const database = getDatabase(app);
    const dbRef = ref(getDatabase());
    let data = undefined;

    await get(child(dbRef, `recipes`)).then((snapshot) => {
    if (snapshot.exists()) {
        data = snapshot.val();
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

    set(ref(database, "recipes/" + data.length), object);
  }
}
