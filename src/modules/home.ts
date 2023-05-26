import { ref, get } from "firebase/database";
import { db } from "./firebaseApp";
import { logOut } from "./logout";

const profilRef = ref(db, "/users/userInfo");

get(profilRef).then((snapshot) => {
  console.log(snapshot.val());
  const users = Object.keys(snapshot.val());
  for (const user of users) {
    const usersDIV: HTMLDivElement = document.createElement("div");
    document.body.append(usersDIV);
    let usernames: HTMLParagraphElement = document.createElement("p");
    usernames.classList.add("profile-links");
    usernames.innerText = user;
    usersDIV.appendChild(usernames);
    usersDIV.style.width = '30%';
    usersDIV.style.margin = 'auto';
    usernames.style.margin = '2vh';
    usernames.addEventListener("click", function (e) {
      sessionStorage.setItem("targetUser", usernames.textContent);
      window.location.href = "./profile.html";
    });
  }
});

logOut();
