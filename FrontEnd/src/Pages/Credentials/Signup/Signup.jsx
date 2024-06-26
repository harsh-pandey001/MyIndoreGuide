import React, { useState } from "react";
import style from "./signup.module.css";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API;

const Signup = (props) => {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    num: "",
    nationality: "",
    gender: "",
    email: "",
    password: "",
  });

  const isPasswordValid = (password) => {
    // Regular expressions for password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, num, nationality, gender, email, password } = credentials;

    if (!name || !num || !nationality || !gender || !email || !password) {
      props.showalert("Please fill in all fields", "danger");
      return;
    }
    if (!isPasswordValid(password)) {
      props.showalert("Password must be at least 6 characters long and contain at least one special character, one numerical digit, and one capital letter.", "danger");
      return;
    }

    const response = await fetch(`${apiUrl}/form/email/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Only send email for 
      mode: 'cors'
    });

    if (response.ok) {
      props.showalert("Login with the Credential", "success");
      history("/login");
      const createUserResponse = await fetch(`${apiUrl}/form/signup/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          num,
          nationality,
          gender,
          email,
          password,
        }),
      });

      //optional code to check any unexpected error
      if (createUserResponse.ok) {
        const json = await createUserResponse.json();
      } else {
        console.error("Error creating user:", createUserResponse.statusText);
      }
    } else {
      props.showalert("Email is already in use", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className={style.big}>
        <div className={style.container}>
          <div className={style.heading}>Sign In</div>
          <form onSubmit={handleSubmit} className={style.form} action="">
            <input
              placeholder="Name"
              id="name"
              name="name"
              onChange={onChange}
              type="name"
              className={style.input}
              required=""
            />
            <input
              placeholder="Phone number"
              id="num"
              name="num"
              type="number"
              onChange={onChange}
              className={style.input}
              required=""
            />

            <select
              id="gender"
              name="gender"
              onChange={onChange}
              className={style.input}
            >
              <option disabled selected value className={style.input}>
                {" "}
                Gender{" "}
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              placeholder="Nationality"
              id="nationality"
              name="nationality"
              onChange={onChange}
              type="nationality"
              className={style.input}
              required=""
            />
            <input
              placeholder="E-mail"
              id="email"
              name="email"
              onChange={onChange}
              type="email"
              className={style.input}
              required=""
            />
            <input
              placeholder="Password"
              id="password"
              onChange={onChange}
              name="password"
              type="password"
              className={style.input}
              required=""
            />
            <i class="bi bi-eye"id="togglePassword"></i>

            <input
              value="Sign In"
              type="submit"
              className={style.login_button}
            />
          </form>
          <div className={style.social_account_container}>
            <span className={style.title}>Or Sign in with</span>
            <div className={style.social_accounts}>
              <button className={`${style.social_button} ${style.google}`}>
                <svg viewBox="0 0 488 512" height="1em" className={style.svg}>
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
              </button>
              <button className={`${style.social_button} ${style.apple}}`}>
                <svg
                  viewBox="0 0 384 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className={style.svg}
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
              </button>
              <button className={`${style.social_button} ${style.twitter}`}>
                <svg
                  viewBox="0 0 512 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className={style.svg}
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
