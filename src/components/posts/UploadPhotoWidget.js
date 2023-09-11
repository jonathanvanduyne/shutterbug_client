import { useEffect, useRef, useState } from "react";

export const UploadPhotoWidget = ({ onImageUpload }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [uploadedUrl, setUploadedUrl] = useState(null);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dbiwrnyu2",
                uploadPreset: "shutterbugUpload",
            },
            function (error, result) {
                if (!error && result && result.event === "success") {
                    const UrlAddress = result.info.secure_url;
                    setUploadedUrl(UrlAddress);
                    // Call the callback function to update image_url in the parent component
                    onImageUpload(UrlAddress);
                }
            }
        );
    }, []);

    return (
        <button
            className="upload-documentation-button"
            onClick={() => widgetRef.current.open()}
        >
            {uploadedUrl ? "Photo Received" : "Upload Photo"}
        </button>
    );
};
