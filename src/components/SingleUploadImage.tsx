import { ReactElement, useState, useEffect } from 'react';
import { Modal, ImageThumbnailWithAction } from '@/components/ui';
import { ImageCard, Button, EmptyFile, UploadImage } from '@/components';
import { useGetImages } from '@/hooks/images';
import { Pagination } from './elements';

type TFeatureImageProps = {
    value: { id: number; url: string };
    onChange: (event: number | null) => void;
};

const SingleUploadImage = ({ onChange, value }: TFeatureImageProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [imagePage, setImagePage] = useState(1);
    const images = useGetImages({ page: imagePage });

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

    if (images.isLoading) return <>Loading</>;

    return (
        <>
            {!selectedImage?.url ? (
                <EmptyFile onClick={() => setIsOpen(true)} />
            ) : (
                <ImageThumbnailWithAction
                    url={selectedImage.url}
                    actions={
                        <button type="button" onClick={() => setIsOpen(true)} className="btn btn-sm btn-primary">
                            Change image
                        </button>
                    }
                />
            )}
            <Modal isModalOpen={isOpen} title="Featured image" closeModal={() => setIsOpen(false)}>
                <hr className="mb-4" />
                <div className="flex w-full justify-end">
                    <Button onClick={() => setIsUploadModalOpen(true)}>Add more assets</Button>
                </div>
                {images.data.data.length > 0 ? (
                    <>
                        <ul className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                            {images.data.data.map(({ id, url }) => (
                                <ImageCard
                                    key={id}
                                    id={id}
                                    url={url}
                                    isChecked={selectedImage?.id === id}
                                    onSelect={value => handleOnSelectImage(value)}
                                />
                            ))}
                        </ul>
                        <Pagination currentPage={imagePage - 1} pageCount={images.data.meta.totalPages} onPageChange={e => setImagePage(e)} />
                    </>
                ) : (
                    '<div>Empty</div>'
                )}
            </Modal>
            <Modal isModalOpen={isUploadModalOpen} title="Add new assets" closeModal={() => setIsUploadModalOpen(false)}>
                <UploadImage />
            </Modal>
        </>
    );
};

export default SingleUploadImage;
