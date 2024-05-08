import { useEffect, useRef, useState } from "react";

function UploadWidget( {category}) {
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  const [category, setCategory] = useState("default");

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "dcvtrregd",
      uploadPreset: "nlbftnhv",
      folder: category,
    }, function (error, result) {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
      }
    });
  }, [category]);

  const handleUpload = () => {
    // Set the category based on user input before opening the widget
    setCategory("HomePage");
    widgetRef.current.open();
  }

  return (
    <button onClick={handleUpload}>Upload</button>
  )
}

export default UploadWidget;
