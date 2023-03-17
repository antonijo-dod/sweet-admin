import { useState, ReactElement } from 'react';
import { useUploadImages } from '@/hooks/images';
import { ImageThumbnailWithAction } from '@/components/ui';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const SelectUpload = ({ children }) => {
    return (
        <div className="sm:col-span-6">
            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                Cover photo
            </label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Upload a file</span>
                            {children}
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>
    );
};

const ShowUpload = ({ children }): ReactElement => {
    return <ul className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">{children}</ul>;
};

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
