import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "../components/page-layout";
import { getAdminResource } from "../services/message.service";
import PhotosByCategory from "../components/photosbycategory";
import ImageListCategories from "../components/ImageListCategories";
import ImageListArticle from "../components/ImageListArticle";
import PhotosAdmin from "../components/photosAdmim";
import CategoryPhotoAdmin from "../components/categoryphoto-admin";

const HorizontalLine = ({ color = 'black', height = '1px' }) => (
  <div style={{ borderTop: `${height} solid ${color}`, width: '100%', margin: '20px 0' }} />
);

export const AdminPage = () => {
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const { data, error } = await getAdminResource(accessToken);

        if (isMounted) {
          if (data) {
            setMessage(JSON.stringify(data, null, 2));
          } else if (error) {
            setMessage(JSON.stringify(error, null, 2));
          }
        }
      } catch (error) {
        if (isMounted) {
          setMessage(`Error: ${error.message}`);
        }
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <PageLayout>
      {message && (
        <div>
          <pre>{message}</pre>
          <HorizontalLine />
        </div>
      )}
      <ImageListArticle />
      <HorizontalLine />
      <ImageListCategories />
      <HorizontalLine />
      <PhotosAdmin />
      <HorizontalLine />
      <CategoryPhotoAdmin />
      <HorizontalLine />
      <PhotosByCategory />
    </PageLayout>
  );
};
