import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCFXQy_l26cVpfdAdaLFdUvJ6adwRxRHBU",
  authDomain: "pokedexapp-2540c.firebaseapp.com",
  databaseURL: "https://pokedexapp-2540c-default-rtdb.firebaseio.com",
  projectId: "pokedexapp-2540c",
  storageBucket: "pokedexapp-2540c.appspot.com",
  messagingSenderId: "793316458362",
  appId: "1:793316458362:web:585027c696225361f960c3"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };

// we import the database into the components, and import the components into the app.