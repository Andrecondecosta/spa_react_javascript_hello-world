import React, { useEffect } from "react";
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
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      if (isMounted) {
        const accessToken = await getAccessTokenSilently();
        await getAdminResource(accessToken);
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <PageLayout>
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
