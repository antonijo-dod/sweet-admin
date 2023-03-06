import React, { ReactElement, useState, useEffect } from "react";
import { Modal, ImageThumbnailWithAction } from "@/components/ui";
import { ImageCard, Button, EmptyFile } from "@/components";

const IMAGES = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
        id: 2,
        url: "https://plus.unsplash.com/premium_photo-1670195121695-1f9c96ac6221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
        id: 3,
        url: "https://plus.unsplash.com/premium_photo-1663844169349-4f831b83aa6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1674569894883-5afe52e070b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
        id: 5,
        url: "https://images.unsplash.com/photo-1674641672189-f3de2f2cfc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
];

type TFeatureImageProps = {
    value: { id: number; url: string };
    onChange: (event: number | null) => void;
};
const SingleUploadImage = ({
    onChange,
    value,
}: TFeatureImageProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const [selectedImage, setSelectedImage] = useState<{
        id: number;
        url: string;
    } | null>(value || {});

    const handleOnSelectImage = ({ id, url }: { id: number; url: string }) => {
        setSelectedImage({ id, url });
    };

    const handleRemoveImage = (id: number) => {
        setSelectedImage(null);
    };

    useEffect(() => {
        if (selectedImage !== null) {
            onChange(selectedImage.id);
        }
    }, [selectedImage, onChange]);

    return (
        <>
            {!selectedImage?.url ? (
                <EmptyFile onClick={() => setIsOpen(true)} />
            ) : (
                <ImageThumbnailWithAction
                    url={selectedImage.url}
                    actions={
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="btn btn-sm btn-primary"
                        >
                            Change image
                        </button>
                    }
                />
            )}
            <Modal
                isModalOpen={isOpen}
                title="Featured image"
                closeModal={() => setIsOpen(false)}
            >
                <hr className="mb-4" />
                <div className="flex w-full justify-end">
                    <Button onClick={() => setIsUploadModalOpen(true)}>
                        Add more assets
                    </Button>
                </div>
                {IMAGES.length > 0 ? (
                    <ul className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                        {IMAGES.map(({ id, url }) => (
                            <ImageCard
                                key={id}
                                id={id}
                                url={url}
                                isChecked={selectedImage?.id === id}
                                onSelect={(value) => handleOnSelectImage(value)}
                            />
                        ))}
                    </ul>
                ) : (
                    "<div>Empty</div>"
                )}
            </Modal>
            <Modal
                isModalOpen={isUploadModalOpen}
                title="Add new assets"
                closeModal={() => setIsUploadModalOpen(false)}
            >
                <div className="sm:col-span-6">
                    <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Cover photo
                    </label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
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
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SingleUploadImage;
