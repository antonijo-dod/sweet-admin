import React from "react";

const IMAGES = [
    { id: 1, url: "https://picsum.photos/id/1/200/300" },
    { id: 2, url: "https://picsum.photos/id/2/200/300" },
    { id: 3, url: "https://picsum.photos/id/3/200/300" },
    { id: 4, url: "https://picsum.photos/id/4/200/300" },
    { id: 5, url: "https://picsum.photos/id/5/200/300" },
    { id: 6, url: "https://picsum.photos/id/6/200/300" },
];

const UploadWrapper = () => {
    const [images, setImages] = React.useState([]);
    const [selectedImage, setSelectedImage] = React.useState([]);

    // I have to return image id and url

    return <div>UploadWrapper</div>;
};

export default UploadWrapper;
