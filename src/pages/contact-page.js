import React from "react";
import { PageLayout } from "../components/page-layout";
import ContactForm from "../components/contact-form";

const ContactPage = () => {

  return (
    <PageLayout>
      <div className="contact-page">
      <h1>Contact</h1>
      <ContactForm />
      </div>
    </PageLayout>
  );
};

export default ContactPage;
