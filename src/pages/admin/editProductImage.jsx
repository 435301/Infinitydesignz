import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchProductById } from '../../redux/actions/productAction';
import { toast } from 'react-toastify';
import BASE_URL from '../../config/config';

const EditProductImages = ({ product }) => {
    const dispatch = useDispatch();

    const [singlePreviews, setSinglePreviews] = useState({});
    const [multiplePreviews, setMultiplePreviews] = useState({});
    const [filesMap, setFilesMap] = useState({});
    const [existingImages, setExistingImages] = useState({
        main_image: null,
        multiple_images: [],
        variants: {},
    });
    const [isRemoving, setIsRemoving] = useState(false);

    const variants = product?.variants || [];

    useEffect(() => {
        if (product?.images) {
            const variantImages = {};
            const variantsData = product.images.variants || {};

            Object.keys(variantsData).forEach((variantId) => {
                const variant = variantsData[variantId];
                variantImages[variantId] = {
                    main_image: variant.main || null,
                    multiple_images: variant.additional || [],
                };
            });

            setExistingImages({
                main_image: product.images.main || null,
                multiple_images: product.images.additional || [],
                variants: variantImages,
            });

            setSinglePreviews({});
            setMultiplePreviews({});
            setFilesMap({});
        }
    }, [product]);

    const handleSingleImageChange = (e, key) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setSinglePreviews(prev => ({ ...prev, [key]: reader.result }));
            setFilesMap(prev => ({ ...prev, [key]: file }));
        };
        reader.readAsDataURL(file);
    };

    const handleMultipleImageChange = async (e, key) => {
        const files = Array.from(e.target.files);
        const previews = await Promise.all(
            files.map(file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve({ preview: reader.result, file });
                reader.onerror = reject;
                reader.readAsDataURL(file);
            }))
        );

        setMultiplePreviews(prev => ({
            ...prev,
            [key]: previews.map(p => p.preview),
        }));

        setFilesMap(prev => ({
            ...prev,
            [key]: previews.map(p => p.file),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        let hasFiles = false;

        if (filesMap['productSingle']) {
            formData.append('main_image', filesMap['productSingle']);
            hasFiles = true;
        }
        if (filesMap['productMultiple']) {
            filesMap['productMultiple'].forEach(file =>
                formData.append('multiple_images', file)
            );
            hasFiles = true;
        }

        variants.forEach(variant => {
            const singleKey = `variant_${variant.id}_Single`;
            const multipleKey = `variant_${variant.id}_Multiple`;

            if (filesMap[singleKey]) {
                formData.append(`variant_${variant.id}_main`, filesMap[singleKey]);
                hasFiles = true;
            }
            if (filesMap[multipleKey]) {
                filesMap[multipleKey].forEach(file =>
                    formData.append(`variant_${variant.id}_multiple`, file)
                );
                hasFiles = true;
            }
        });

        if (!hasFiles) {
            toast.warn('No images selected');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${BASE_URL}/images/${product?.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Images uploaded successfully');
            dispatch(fetchProductById(product?.id));
        } catch (err) {
            toast.error('Upload failed');
        }
    };

    const renderPreviewImages = (images = [], onRemove) => (
        <div className="row mt-2">
            {images.map((img, i) => (
                <div key={i} className="col-3 position-relative mb-2">
                    <img src={img} alt="preview" className="img-thumbnail" style={{ height: '100px', width:'100%', objectFit: 'cover' }} loading ="lazy" />
                    {onRemove && (
                        <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                            onClick={() => onRemove(i)}
                            style={{ borderRadius: '50%', padding: '0 6px' }}
                        >×</button>
                    )}
                </div>
            ))}
        </div>
    );


    const renderExistingImages = (images = [], onRemove) => (
        <div className="row mt-2">
            {images.map((img, i) => (
                <div key={img.id || i} className="col-3 position-relative mb-2">
                    <img
                        src={`${BASE_URL}/Uploads/products/${img.url}`}
                        alt="existing"
                        className="img-thumbnail"
                        style={{ height: '100px', with:'100%', objectFit: 'cover' }}
                        loading="lazy"
                    />
                    {onRemove && (
                        <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                            onClick={() => onRemove(img.id, i)}
                            disabled={isRemoving}
                            style={{ borderRadius: '50%', padding: '0 6px' }}
                        >×</button>
                    )}
                </div>
            ))}
        </div>
    );

    const handleRemoveSinglePreview = (key) => {
        setSinglePreviews(prev => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });
        setFilesMap(prev => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });
    };

    const handleRemoveMultiplePreview = (key, index) => {
        setMultiplePreviews(prev => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index),
        }));
        setFilesMap(prev => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index),
        }));
    };

    const handleRemoveExistingImage = async (imageId, type, variantId = null) => {
        if (!imageId) return;

        try {
            setIsRemoving(true);
            const token = localStorage.getItem('token');
            await axios.delete(`${BASE_URL}/images/${imageId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (type === 'main') {
                setExistingImages(prev => ({ ...prev, main_image: null }));
            } else if (type === 'multiple') {
                setExistingImages(prev => ({
                    ...prev,
                    multiple_images: prev.multiple_images.filter(img => img.id !== imageId),
                }));
            } else if (type === 'variant-main') {
                setExistingImages(prev => ({
                    ...prev,
                    variants: {
                        ...prev.variants,
                        [variantId]: {
                            ...prev.variants[variantId],
                            main_image: null,
                        },
                    },
                }));
            } else if (type === 'variant-multiple') {
                setExistingImages(prev => ({
                    ...prev,
                    variants: {
                        ...prev.variants,
                        [variantId]: {
                            ...prev.variants[variantId],
                            multiple_images: prev.variants[variantId].multiple_images.filter(img => img.id !== imageId),
                        },
                    },
                }));
            }

            toast.success('Image removed');
        } catch (err) {
            toast.error('Failed to remove image');
        } finally {
            setIsRemoving(false);
        }
    };


    return (
        <div className="container py-4">
            <form onSubmit={handleSubmit}>
                <div className="card mb-4">
                    <div className="card-header"><strong>Main Product Image</strong></div>
                    <div className="card-body">
                        <input type="file" onChange={(e) => handleSingleImageChange(e, 'productSingle')} className="form-control" />
                        {singlePreviews['productSingle'] &&
                            renderPreviewImages([singlePreviews['productSingle']], () => handleRemoveSinglePreview('productSingle'))}
                        {existingImages.main_image?.url &&
                            renderExistingImages([existingImages.main_image], (id) => handleRemoveExistingImage(id, 'main'))}
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-header"><strong>Multiple Product Images</strong></div>
                    <div className="card-body">
                        <input type="file" multiple onChange={(e) => handleMultipleImageChange(e, 'productMultiple')} className="form-control" />
                        {renderPreviewImages(
                            multiplePreviews['productMultiple'],
                            (index) => handleRemoveMultiplePreview('productMultiple', index)
                        )}
                        {renderExistingImages(
                            existingImages.multiple_images,
                            (id) => handleRemoveExistingImage(id, 'multiple')
                        )}
                    </div>
                </div>

                {variants.map((variant) => {
                    const variantId = variant.id;
                    const singleKey = `variant_${variantId}_Single`;
                    const multipleKey = `variant_${variantId}_Multiple`;
                    const variantImages = existingImages.variants[variantId] || {};

                    return (
                        <div className="card mb-4" key={variantId}>
                            <div className="card-header">
                                <strong>Variant: {variant.size?.title || ''} / {variant.color?.label || ''}</strong>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Single Image</label>
                                    <input type="file" onChange={(e) => handleSingleImageChange(e, singleKey)} className="form-control" />
                                    {singlePreviews[singleKey] &&
                                        renderPreviewImages([singlePreviews[singleKey]], () => handleRemoveSinglePreview(singleKey))}
                                    {variantImages.main_image?.url &&
                                        renderExistingImages([variantImages.main_image], (id) => handleRemoveExistingImage(id, 'variant-main', variantId))}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Multiple Images</label>
                                    <input type="file" multiple onChange={(e) => handleMultipleImageChange(e, multipleKey)} className="form-control" />
                                    {renderPreviewImages(multiplePreviews[multipleKey], (index) =>
                                        handleRemoveMultiplePreview(multipleKey, index)
                                    )}
                                    {renderExistingImages(variantImages.multiple_images, (id) =>
                                        handleRemoveExistingImage(id, 'variant-multiple', variantId)
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className="text-end">
                    <button type="submit" className="btn btn-primary">Upload All Images</button>
                </div>
            </form>
        </div>
    );
};

export default EditProductImages;
