import React, { useEffect, useState, useCallback } from 'react';
import { PageLayout } from '../components/page-layout';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/contacts`);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.message);
    }
  };

  if (error) {
    return <PageLayout>Error: {error}</PageLayout>;
  }

  if (isLoading) {
    return <PageLayout>Loading contacts...</PageLayout>;
  }

  return (
    <PageLayout>
      <section>
        <h1>Contacts</h1>
        {contacts.map(contact => (
          <article key={contact.id} className="contactlist-form">
          <button
            onClick={() => deleteContact(contact.id)}
            className="contact-deleteButton"
          >
            &times;
          </button>
          <p className='contactlist-contacts'><strong>Name:</strong> {contact.first_name} {contact.last_name}</p>
          <p className='contactlist-contacts'><strong>Email:</strong> {contact.email}</p>
          <p className='contactlist-contacts'><strong>Subject:</strong> {contact.subject}</p>
          <p className='contactlist-contacts'><strong>Message:</strong> {contact.message}</p>
          <div>
            <h4>Photos:</h4>
            {contact.photos && contact.photos.length > 0 ? (
              contact.photos.map(photo => (
                <img className='contactlist-photo'
                  key={photo.id}
                  src={photo.image_data}
                  alt={photo.title}
                  // Adicione classes para as imagens, se necessário
                />
              ))
            ) : <p>No photos available.</p>}
          </div>
        </article>
        ))}
      </section>
    </PageLayout>
  );
};

export default ContactsList;
