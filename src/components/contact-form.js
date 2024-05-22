import React, { useState } from 'react'

function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://127.0.0.1:3000/api/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        subject: subject,
        message: message
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      window.alert('Successfully sent!');
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
      window.alert('An error occurred. Please try again.');
    });
  };

  return (
    <div>
      <form className='contact-form' onSubmit={handleSubmit}>
        <div className='form-name'>
          <div className='first-name'>
            <label htmlFor="first-name">First name:*</label><br />
            <input type="text" id="first-name" name="first-name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div className='last-name'>
            <label htmlFor="last-name">Last name:*</label><br />
            <input type="text" id="last-name" name="last-name" value={lastName} onChange={e => setLastName(e.target.value)} /><br /> <br />
          </div>
        </div>
        <label htmlFor="email">Email:*</label><br />
        <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} /><br /> <br />
        <label htmlFor="subject">Subject:*</label><br />
        <input type="text" id="subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} /><br /><br />
        <label htmlFor="message">Message:*</label><br />
        <textarea id="message" name="message" value={message} onChange={e => setMessage(e.target.value)}></textarea><br /><br />
        <input className="submit" type="submit" value="SUBMIT" />
      </form>
    </div>
  )
}

export default ContactForm
