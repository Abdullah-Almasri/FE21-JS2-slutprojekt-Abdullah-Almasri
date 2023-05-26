export class DisplayToDom {
  public hideRegisterElements(): void {
    const dropdown: HTMLElement = document.querySelector("#gender-choice");
    dropdown.style.display = "none";
    const textarea: HTMLElement = document.querySelector("#user-bio");
    textarea.style.display = "none";
    const registerBtn: HTMLElement = document.querySelector("#register-user");
    registerBtn.style.display = "none";
  }
  public fillInEveryBlock(): void {
    const inputError: HTMLElement = document.getElementById("title");
    inputError.innerText = "Fill all inputs";
  }

  public wrongUserOrPassword(): void {
    const wrongPw: HTMLElement = document.getElementById("title");
    wrongPw.innerText = "Wrong username or password";
  }
  public doesntExist(): void {
    const noUser: HTMLElement = document.getElementById("title");
    noUser.innerText = "User doesn't exist.";
  }
  public alreadyUser(): void {
    const alreadyAnUser: HTMLElement =
      document.getElementById("title");
    alreadyAnUser.innerText =
      "Username already exists, choose another";
  }

  public hideAndShowLoginPage(): void {
    document.getElementById("register").addEventListener("click", (e) => {
      e.preventDefault();
      const div: HTMLElement = document.getElementById("form-title-container");
      const loginTitle: HTMLElement = document.getElementById("login-title");
      const username = document.getElementById("username") as HTMLInputElement;
      const passwordTitle: HTMLElement =
        document.getElementById("password-title");
      const dropdown: HTMLElement = document.querySelector("#gender-choice");
      const password = document.getElementById("password") as HTMLInputElement;
      const login: HTMLElement = document.getElementById("login");
      const alreadyAccount: HTMLElement = document.getElementById("register");
      const textarea: HTMLElement = document.querySelector("#user-bio");
      const registerBtn: HTMLElement = document.querySelector("#register-user");
      const profilePicture: HTMLElement = document.querySelector("#userIMG");

      profilePicture.style.display = "block";
      registerBtn.style.display = "center";
      loginTitle.style.display = "center";
      username.style.display = "center";
      password.style.display = "center";
      username.value = "";
      password.value = "";
      div.style.height = "900px";
      login.style.display = "none";
      dropdown.style.display = "block";
      textarea.style.display = "block";
      loginTitle.innerText = "Choose a username";
      passwordTitle.innerText = "Type password";
      registerBtn.style.display = "block";
      alreadyAccount.innerHTML =
        'Already registered? <a id="return" href="">Click here</a>';

      document.getElementById("return").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        dropdown.style.display = "none";
        textarea.style.display = "none";
        loginTitle.innerText = "Log in";
        username.value = "";
        password.value = "";
        passwordTitle.style.display = "none";
        registerBtn.style.display = "none";
        login.style.display = "revert";
        alreadyAccount.style.display = "center";
        profilePicture.style.display = "none";
        div.style.height = "500px";
        alreadyAccount.innerHTML =
          'No account? <a id="return" href="">Register here</a>';
      });
    });
  }
}
