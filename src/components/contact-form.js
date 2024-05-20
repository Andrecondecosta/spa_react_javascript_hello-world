import React from 'react'

function ContactForm() {
  return (
    <div>
      <form className='contact-form'>
        <div className='form-name'>
          <div className='first-name'>
            <label htmlFor="first-name">First name:*</label><br />
            <input type="text" id="first-name" name="first-name" />
          </div>
          <div className='last-name'>
            <label htmlFor="last-name">Last name:*</label><br />
            <input type="text" id="last-name" name="last-name" /><br /> <br />
          </div>
        </div>
        <label htmlFor="email">Email:*</label><br />
        <input type="text" id="email" name="email" /><br /> <br />
        <label htmlFor="subject">Subject:*</label><br />
        <input type="text" id="subject" name="subject" /><br /><br />
        <label htmlFor="message">Message:*</label><br />
        <textarea id="message" name="message"></textarea><br /><br />
        <input className="submit" type="submit" value="SUBMIT" />
      </form>
    </div>
  )
}

export default ContactForm
