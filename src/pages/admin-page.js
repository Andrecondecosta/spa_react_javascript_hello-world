import { PageLayout } from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getAdminResource } from "../services/message.service";
import PhotosByCategory from "../components/photosbycategory";
import ImageListCategories from "../components/ImageListCategories";
import ImageListArticle from "../components/ImageListArticle";
import PhotosAdmim from "../components/photosAdmim";
import CategoryPhotoAdmin from "../components/categoryphoto-admin";

export const AdminPage = () => {
  const [message, setMessage] = useState("");

  const { getAccessTokenSilently } = useAuth0();
  const HorizontalLine = ({ color = 'black', height = '1px' }) => (
    <div style={{ borderTop: `${height} solid ${color}`, width: '100%' }} />
  );

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
      <ImageListArticle />
      <HorizontalLine />
      <ImageListCategories />
      <HorizontalLine />
      <PhotosAdmim />
      <HorizontalLine />
      <CategoryPhotoAdmin/>
      <HorizontalLine />
      <PhotosByCategory/>
    </PageLayout>
  );
};
