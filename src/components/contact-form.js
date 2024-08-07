import React, { useState } from 'react';

function ContactForm({ showFirstName = true, showLastName = true, showEmail = true, showSubject = true, showMessage = true, selectedPhotos = [], onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if ((!firstName && showFirstName) || (!lastName && showLastName) || (!email && showEmail) || (!subject && showSubject) || (!message && showMessage)) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          subject: subject,
          message: message,
          photo_ids: selectedPhotos
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setSuccessMessage("Message sent successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubject("");
      setMessage("");

      if (onSubmit) {
        onSubmit(); // Chama a função de submissão passada como prop
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <form className='contact-form' onSubmit={handleSubmit}>
        <div className='form-name'>
          {showFirstName && (
            <div className='first-name'>
              <label htmlFor="first-name">First name:*</label><br />
              <input
                type="text"
                id="first-name"
                name="first-name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                aria-label="First name"
              />
            </div>
          )}
          {showLastName && (
            <div className='last-name'>
              <label htmlFor="last-name">Last name:*</label><br />
              <input
                type="text"
                id="last-name"
                name="last-name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                aria-label="Last name"
              /><br /><br />
            </div>
          )}
        </div>
        {showEmail && (
          <div>
            <label htmlFor="email">Email:*</label><br />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Email"
            /><br /><br />
          </div>
        )}
        {showSubject && (
          <div>
            <label htmlFor="subject">Subject:*</label><br />
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              aria-label="Subject"
            /><br /><br />
          </div>
        )}
        {showMessage && (
          <div>
            <label htmlFor="message">Message:*</label><br />
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              aria-label="Message"
            ></textarea><br /><br />
          </div>
        )}
        <input
          className="submit"
          type="submit"
          value="SUBMIT"
          aria-label="Submit form"
        />
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  )
}

export default ContactForm;
