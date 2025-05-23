import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Register() {
  const [mode, setMode] = useState('sign-in');
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    tpNum: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });


  // Set default mode on mount
  useEffect(() => {
    setMode('sign-in');
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };


  // Mimic delay for visual mode switch if needed
  useEffect(() => {
    const timer = setTimeout(() => {
      setMode('sign-in');
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // 💡 One-time refresh to fix CSS conflict
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      if (performance.navigation.type !== 1) {
        window.location.reload();
      }
    }, 0);

    return () => clearTimeout(refreshTimer);
  }, []);

  const toggle = () => {
    setMode((prev) => (prev === 'sign-in' ? 'sign-up' : 'sign-in'));
  };


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


 const handleSubmit = async (e) => {
  e.preventDefault();

  const { firstName, lastName, tpNum, email, password, confirmPassword, image } = formData;

  // Required fields check
  if (!firstName || !lastName || !tpNum || !email || !password || !confirmPassword || !image) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill in all required fields.",
      confirmButtonColor: "#f39c12",
    });
    return;
  }

  // Phone number validation (10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(tpNum)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone Number",
      text: "Telephone number must be exactly 10 digits.",
      confirmButtonColor: "#e74c3c",
    });
    return;
  }

  // Password match check
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Password Mismatch",
      text: "Passwords do not match!",
      confirmButtonColor: "#e74c3c",
    });
    return;
  }

  try {
    // 🚨 Check if email already exists
    const userRes = await fetch("http://localhost:8086/api/user/");
    if (!userRes.ok) throw new Error("Failed to fetch existing users");
    const users = await userRes.json();

    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      Swal.fire({
        icon: "error",
        title: "Email Exists",
        text: "The email you entered is already registered.",
        confirmButtonColor: "#e74c3c",
      });
      return;
    }

    // ✅ If email is unique, prepare FormData
    const formDataPayload = new FormData();
    const userData = { firstName, lastName, tpNum, email, password };
    formDataPayload.append("user", new Blob([JSON.stringify(userData)], { type: "application/json" }));
    formDataPayload.append("image", image);

    const response = await fetch("http://localhost:8086/api/user/create", {
      method: "POST",
      body: formDataPayload,
    });

    if (!response.ok) throw new Error("User creation failed");

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "User created successfully!",
      confirmButtonColor: "#3085d6",
    });

    setFormData({
      firstName: '',
      lastName: '',
      tpNum: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: null,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong. Please try again.",
      confirmButtonColor: "#d33",
    });
  }
};




  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8086/api/user/login', loginData);
      console.log('Login success:', response.data);

      // Store user data
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("user", JSON.stringify(response.data));
      const userRole = response.data.role;

      console.log('Login response:', response.data);  // Ensure this contains `id` and `role`


      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'Login successful!',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        // Navigate and trigger auto-refresh after 2 seconds
        if (userRole === 'ADMIN') {
          navigate('/admin/add-professor');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (userRole === 'USER') {
          navigate('/user/home');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Unknown Role',
            text: 'No route assigned for this role.',
          });
        }
      });
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password',
        confirmButtonColor: '#d33'
      });
    }
  };



  return (
    <div>
      <div id="container" className={`container ${mode}`}>
        {/* FORM SECTION */}
        <div className="row">
          {/* SIGN UP */}
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper align-items-center">
              <form className="form sign-up" onSubmit={handleSubmit}>
                <div className="input-group">
                  <i className="bx bxs-user" />
                  <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <i className="bx bxs-user" />
                  <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <i className="bx bxs-image" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <i className="bx bxs-user" />
                  <input type="text" placeholder="Telephone Number" name="tpNum" value={formData.tpNum} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <i className="bx bx-mail-send" />
                  <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt" />
                  <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <i className="bx bxs-lock-alt" />
                  <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>

                <button type="submit">Sign up</button>
                <p>
                  <span>Already have an account?</span>
                  <b onClick={toggle} className="pointer">Sign in here</b>
                </p>
              </form>
            </div>
          </div>
          {/* END SIGN UP */}

          {/* SIGN IN */}
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper align-items-center">
              <div className="form sign-in">
                <form onSubmit={handleLoginSubmit}>
                  <div className="input-group">
                    <i className="bx bxs-user" />
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="input-group">
                    <i className="bx bxs-lock-alt" />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <button type="submit">Sign in</button>
                </form>

                <p><b>Forgot password?</b></p>
                <p>
                  <span>Don't have an account?</span>
                  <b onClick={toggle} className="pointer">Sign up here</b>
                </p>
              </div>
            </div>

          </div>
          {/* END SIGN IN */}
        </div>

        {/* CONTENT SECTION */}
        <div className="row content-row">
          <div className="col align-items-center flex-col">
            <div className="text sign-in">
              <h2>Welcome</h2>
            </div>
            <div className="img sign-in" />
          </div>
          <div className="col align-items-center flex-col">
            <div className="img sign-up" />
            <div className="text sign-up">
              <h2>Join with us</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
