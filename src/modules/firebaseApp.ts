import { initializeApp } from "firebase/app";
import { ref, update, get, child, getDatabase } from "firebase/database";
import { DisplayToDom } from "./display";

const firebaseConfig = {
  apiKey: "AIzaSyCexZFL-UQD10-gtaKkDSWW2JJKPicFWNU",
  authDomain: "social-app-77c66.firebaseapp.com",
  databaseURL: "https://social-app-77c66-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "social-app-77c66",
  storageBucket: "social-app-77c66.appspot.com",
  messagingSenderId: "1045537447102",
  appId: "1:1045537447102:web:53718ef30c0859e6e612ef",
  measurementId: "G-0955YWKYJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const dbRef = ref(db, "/users/userInfo/");
const display = new DisplayToDom();
export class UserSign {
  public username: HTMLInputElement;
  public password: HTMLInputElement;
  public gender: HTMLInputElement;
  public bio: HTMLInputElement;
  public pic: HTMLInputElement;
  constructor(username?: HTMLInputElement, password?: HTMLInputElement) {
    this.username = username;
    this.password = password;
  }

  public createUser(): void {
    document
      .getElementById("register-user-to-site")
      .addEventListener("click", (e) => {
        e.preventDefault;

        this.username = document.querySelector("#username");
        this.password = document.querySelector("#password");
        const bio: HTMLInputElement = document.querySelector("#bio");
        const radio: NodeListOf<HTMLInputElement> =
          document.querySelectorAll(".form-radio");
        let img: string;
        radio.forEach((key: HTMLInputElement): void => {
          if (key.checked) {
            img = key.value;
          }
        });

        const newUsername: string = this.username.value.toLowerCase();
        let profilePic: string = img;

        if (
          newUsername === "" ||
          this.password.value === "" ||
          bio.value === ""
        ) {
          display.fillInEveryBlock();
        } else {
          const addUser = {
            username: (document.querySelector("#username") as HTMLInputElement)
              .value,
            password: (document.querySelector("#password") as HTMLInputElement)
              .value,
            gender: (document.querySelector("#gender") as HTMLInputElement)
              .value,
            bio: (document.querySelector("#bio") as HTMLInputElement).value,
            profilePic: img,
          };
          get(child(dbRef, `/${newUsername}`)).then((snapshot) => {
            if (snapshot.exists()) {
              display.alreadyUser();
            } else {
              if (
                newUsername != "" &&
                this.password.value != "" &&
                bio.value != "" &&
                profilePic
              ) {
                const newKey: string = newUsername;
                const newUser = {};
                newUser[newKey] = addUser;
                update(dbRef, newUser);
                sessionStorage.setItem("user", `${addUser.username}`);
                sessionStorage.setItem("gender", `${addUser.gender}`);
                sessionStorage.setItem("bio", `${addUser.bio}`);
                sessionStorage.setItem("pic", `${addUser.profilePic}`);
                window.location.href = "./profile.html";
              }
            }
          });
        }
      });
  }
  public logIn(): void {
    document.getElementById("login").addEventListener("click", (e) => {
      e.preventDefault();

      this.username = document.querySelector("#username");
      this.password = document.querySelector("#password");
      this.gender = document.querySelector("#gender");
      this.bio = document.querySelector("#bio");
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/userInfo/${this.username.value}`)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            if (this.username.value == "" || this.password.value == "") {
              display.fillInEveryBlock();
            } else if (this.password.value != snapshot.val().password) {
              display.wrongUserOrPassword();
            } else if (this.password.value == snapshot.val().password) {
              window.location.href = "./home.html";
            }
            sessionStorage.setItem("user", `${snapshot.val().username}`);
            sessionStorage.setItem("gender", `${snapshot.val().gender}`);
            sessionStorage.setItem("bio", `${snapshot.val().bio}`);
            sessionStorage.setItem("pic", `${snapshot.val().profilePic}`);
          } else {
            display.wrongUserOrPassword();
          }
        }
      );
    });
  }
}
