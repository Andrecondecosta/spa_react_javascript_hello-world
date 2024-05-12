import { PageLayout } from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import Uploadwidget  from "../components/Uploadwidget";
import ImageList from "../components/ImageList";
import Formcategory from "../components/formcategory";
import Formphotos from "../components/formphotos";
import { getAdminResource } from "../services/message.service";

export const AdminPage = () => {
  const [message, setMessage] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getAdminResource(accessToken);

      if (!isMounted) {
     return;
      }

     if (data) {
       setMessage(JSON.stringify(data, null, 2));
     }

     if (error) {
       setMessage(JSON.stringify(error, null, 2));
     }
   };

   getMessage();


  return () => {
    isMounted = false;
  };

 }, [ getAccessTokenSilently]);

 return (
   <PageLayout>
      <Uploadwidget/>
      <ImageList category="articles" />
      <Formcategory/>
      <ImageList category="categories" />
      <Formphotos/>
      <ImageList category="photos" />
   </PageLayout>
 );
};
