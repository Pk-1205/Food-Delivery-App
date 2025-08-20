// import React, { useState } from 'react';
// import './Contact.css';

// const Contact = () => {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // For now: just simulate success
//     setSubmitted(true);
//     setForm({ name: '', email: '', message: '' });
//     setTimeout(() => setSubmitted(false), 4000);
//   };

//   return (
//     <section className="contact-section py-5">
//       <div className="container">
//         <h2 className="text-center mb-4">📬 Get in Touch</h2>
//         <p className="text-center mb-5 text-muted">
//           Have questions or feedback? We’d love to hear from you!
//         </p>

//         <div className="row g-4">
//           {/* Contact Form */}
//           <div className="col-md-7">
//             <div className="card p-4 shadow-sm h-100">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     required
//                     value={form.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     required
//                     value={form.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Message</label>
//                   <textarea
//                     className="form-control"
//                     name="message"
//                     rows="5"
//                     placeholder='Write ur Massage '
//                     required
//                     value={form.message}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">
//                   Send Message
//                 </button>

//                 {submitted && (
//                   <div className="alert alert-success mt-3">
//                     ✅ Message sent successfully!
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>

//           {/* Contact Info */}
//           <div className="col-md-5">
//             <div className="contact-info bg-dark text-white p-4 rounded h-100">
//               <h5 className="mb-3">📞 Contact Information</h5>
//               <p><i className="bi bi-envelope-fill me-2"></i> support@foodiehub.com</p>
//               <p><i className="bi bi-telephone-fill me-2"></i> +91 98765 43210</p>
//               <p><i className="bi bi-geo-alt-fill me-2"></i> 123 Food Street, India</p>

//               <div className="mt-4">
//                 <h6>Follow Us:</h6>
//                 <div className="d-flex gap-3 mt-2">
//                   <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
//                   <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
//                   <a href="#" className="text-light fs-5"><i className="bi bi-twitter-x"></i></a>
//                   <a href="#" className="text-light fs-5"><i className="bi bi-linkedin"></i></a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          access_key: 'cb95edc3-7ba7-44f1-aed8-495df442c904',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Error sending message. Please try again later.');
    }
  };

  return (
    <section className="contact-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">📬 Get in Touch</h2>
        <p className="text-center mb-5 text-muted">
          Have questions or feedback? We’d love to hear from you!
        </p>

        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-md-7">
            <div className="card p-4 shadow-sm h-100">
              <form onSubmit={handleSubmit}>
                {/* Required hidden Web3Forms fields */}
                <input type="hidden" name="access_key" value="cb95edc3-7ba7-44f1-aed8-495df442c904" />
                <input type="checkbox" name="botcheck" className="d-none" style={{ display: 'none' }} />

                <div className="mb-3">
                  <label className="form-label" htmlFor="name" accessKey="n">
                    <u>N</u>ame
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    required
                    accessKey="n"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="email" accessKey="e">
                    <u>E</u>mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                    accessKey="e"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="message" accessKey="m">
                    <u>M</u>essage
                  </label>
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    rows="5"
                    placeholder="Write your message"
                    required
                    accessKey="m"
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100" accessKey="s" disabled={submitted}>
                  {submitted ? 'Message Sent ✅' : <>Send Message (<u>S</u>)</>}
                </button>

                {submitted && (
                  <div className="alert alert-success mt-3">
                    ✅ Message sent successfully!
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger mt-3">
                    ❌ {error}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-5">
            <div className="contact-info bg-dark text-white p-4 rounded h-100">
              <h5 className="mb-3">📞 Contact Information</h5>
              <p><i className="bi bi-envelope-fill me-2"></i> support@foodiehub.com</p>
              <p><i className="bi bi-telephone-fill me-2"></i> +91 98765 43210</p>
              <p><i className="bi bi-geo-alt-fill me-2"></i> 123 Food Street, India</p>

              <div className="mt-4">
                <h6>Follow Us:</h6>
                <div className="d-flex gap-3 mt-2">
                  <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="text-light fs-5"><i className="bi bi-twitter-x"></i></a>
                  <a href="#" className="text-light fs-5"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
