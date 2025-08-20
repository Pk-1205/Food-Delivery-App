// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";
// import axios from "axios";

// function Signup() {
//   const navigate = useNavigate();
  
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8080/api/foods/signup", {
//         name,
//         email,
//         password,
//       });
//       setSuccess("Signup successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="vh-100 d-flex flex-column flex-md-row">
//       {/* Left Side - Food Image */}
//       <div
//         className="d-none d-md-flex align-items-center justify-content-center"
//         style={{
//           flex: 1,
//           backgroundImage: `url(${assets.Biryani})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           borderTopRightRadius: "20px",
//           borderBottomRightRadius: "20px",
//         }}
//       ></div>

//       {/* Right Side - Form */}
//       <div
//         className="d-flex align-items-center justify-content-center flex-grow-1"
//         style={{
//           background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
//           padding: "40px",
//         }}
//       >
//         <div
//           className="card shadow-lg p-4 rounded-4"
//           style={{ maxWidth: "420px", width: "100%", border: "none" }}
//         >
//           {/* Logo */}
//           <div className="text-center mb-3">
//             <img
//               src={assets.logo}
//               alt="App Logo"
//               style={{ width: "70px", height: "70px", borderRadius: "50%" }}
//             />
//           </div>

//           <h2 className="text-center mb-4 fw-bold" style={{ color: "#ff6600" }}>
//             Sign Up
//           </h2>

//           {/* Error / Success Messages */}
//           {error && <p className="text-danger text-center">{error}</p>}
//           {success && <p className="text-success text-center">{success}</p>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label fw-bold">Full Name</label>
//               <input
//                 type="text"
//                 className="form-control rounded-3"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-bold">Email address</label>
//               <input
//                 type="email"
//                 className="form-control rounded-3"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-bold">Password</label>
//               <input
//                 type="password"
//                 className="form-control rounded-3"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-bold">Confirm Password</label>
//               <input
//                 type="password"
//                 className="form-control rounded-3"
//                 placeholder="Re-enter password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn w-100 py-2 fw-bold rounded-3"
//               style={{
//                 backgroundColor: "#ff6600",
//                 border: "none",
//                 color: "white",
//                 fontSize: "16px",
//               }}
//             >
//               Sign Up
//             </button>
//           </form>

//           <p className="text-center mt-3">
//             Already have an account?{" "}
//             <Link to="/login" className="fw-bold" style={{ color: "#ff6600" }}>
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AuthProvider } from "../context/AuthProvider";
import { AuthContext } from "../context/AuthProvider";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/foods/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error("Signup failed");
      const data = await res.json();
      loginUser({ name, email }); // auto login after signup
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Email may already be used");
    }
  };

  return (
    <div className="vh-100 d-flex flex-column flex-md-row">
      {/* Left Image */}
      <div className="d-none d-md-flex align-items-center justify-content-center" style={{ flex: 1, backgroundImage: `url(${assets.Biryani})`, backgroundSize: "cover", backgroundPosition: "center", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}></div>

      {/* Right Form */}
      <div className="d-flex align-items-center justify-content-center flex-grow-1" style={{ background: "linear-gradient(135deg, #ffffff, #f8f9fa)", padding: "40px" }}>
        <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "420px", width: "100%", border: "none" }}>
          <div className="text-center mb-3">
            <img src={assets.logo} alt="App Logo" style={{ width: "70px", height: "70px", borderRadius: "50%" }} />
          </div>
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#ff6600" }}>Sign Up</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label fw-bold">Full Name</label>
              <input type="text" className="form-control rounded-3" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email address</label>
              <input type="email" className="form-control rounded-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input type="password" className="form-control rounded-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Confirm Password</label>
              <input type="password" className="form-control rounded-3" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn w-100 py-2 fw-bold rounded-3" style={{ backgroundColor: "#ff6600", border: "none", color: "white", fontSize: "16px" }}>Sign Up</button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login" className="fw-bold" style={{ color: "#ff6600" }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
