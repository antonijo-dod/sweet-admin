import { useState } from 'react';
import { useUploadImages } from '@/hooks/images';
import { ImageThumbnailWithAction } from '@/components/ui';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import SelectUpload from './SelectUpload';
import ShowUpload from './ShowUpload';

const UploadImage = () => {
    const uploadImages = useUploadImages();

    const [step, setStep] = useState(1);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const handleImageChange = event => {
        setSelectedImages([...selectedImages, ...event.target.files]);
        const newFiles = [];
        for (let i = 0; i < event.target.files.length; i++) {
            newFiles.push(URL.createObjectURL(event.target.files[i]));
        }
        setPreviewImages([...previewImages, ...newFiles]);
        setStep(2);
    };

    const handleRemoveImage = (imageIndex: number) => {
        setSelectedImages(selectedImages.filter((_, index) => index !== imageIndex));
        setPreviewImages(previewImages.filter((_, index) => index !== imageIndex));
    };

    const handleUploadImages = async () => {
        let formData = new FormData();

        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('photos', selectedImages[i]);
        }

        await uploadImages.mutate(formData, {
            onSuccess: () => {
                console.log("It's uploaded");
            },
        });
    };

    if (step === 1)
        return (
            <SelectUpload>
                <input type="file" multiple onChange={e => handleImageChange(e)} />
            </SelectUpload>
        );
    if (step === 2)
        return (
            <ShowUpload>
                {previewImages.map((image, index) => (
                    <ImageThumbnailWithAction
                        url={image}
                        actions={
                            <button type="button" onClick={() => handleRemoveImage(index)} className="btn btn-sm btn-primary">
                                <XMarkIcon className="h-2 w-2 text-white" aria-hidden="true" />
                            </button>
                        }
                    />
                ))}
                <Button onClick={handleUploadImages}>Upload images</Button>
            </ShowUpload>
        );
};

export default UploadImage;
