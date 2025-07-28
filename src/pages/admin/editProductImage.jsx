import React, { useState, useEffect } from 'react';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import axios from 'axios';
import BASE_URL from '../../config/config';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/actions/productAction';
import { toast } from 'react-toastify';

const EditProductImages = ({updatedVariantIds}) => {
    console.log('updatedVariantIds',updatedVariantIds)
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.products || {});

    const [singlePreviews, setSinglePreviews] = useState({});
    const [multiplePreviews, setMultiplePreviews] = useState({});
    const [filesMap, setFilesMap] = useState({});
    const [existingImages, setExistingImages] = useState({
        main_image: null,
        multiple_images: [],
        variants: {},
    });

    const variants = product?.variants || [];

    // Fetch product data
    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    // Initialize existing images from product data
    useEffect(() => {
        if (product && product.images) {
            const updatedVariants = variants.reduce((acc, variant) => {
                return {
                    ...acc,
                    [variant.id]: {
                        main_image: variant.images?.main || null,
                        multiple_images: variant.images?.multiple || [],
                    },
                };
            }, {});

            setExistingImages({
                main_image: product.images?.main || null,
                multiple_images: product.images?.multiple || [],
                variants: updatedVariants,
            });
        }
    }, [product, variants]);

    useEffect(() => {
  if (
    product &&
    product.variants &&
    updatedVariantIds.length > 0
  ) {
    const filteredVariants = product.variants.filter(v =>
      updatedVariantIds.includes(v.id)
    );

    const updatedVariants = filteredVariants.reduce((acc, variant) => {
      acc[variant.id] = {
        main_image: variant.images?.main || null,
        multiple_images: variant.images?.multiple || [],
      };
      return acc;
    }, {});

    setExistingImages(prev => ({
      ...prev,
      variants: updatedVariants,
    }));
  }
}, [product, updatedVariantIds]);




    const handleSingleImageChange = (e, key) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSinglePreviews((prev) => ({ ...prev, [key]: reader.result }));
                setFilesMap((prev) => ({ ...prev, [key]: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMultipleImageChange = (e, key) => {
        const files = Array.from(e.target.files);
        const previews = [];
        const selectedFiles = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                previews.push(reader.result);
                selectedFiles.push(file);
                if (previews.length === files.length) {
                    setMultiplePreviews((prev) => ({ ...prev, [key]: previews }));
                    setFilesMap((prev) => ({ ...prev, [key]: selectedFiles }));
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveSingle = (key) => {
        setSinglePreviews((prev) => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
        });
        setFilesMap((prev) => {
            const newState = { ...prev };
            delete newState[key];
            return newState;
        });
    };

    const handleRemoveMultiple = (key, index) => {
        setMultiplePreviews((prev) => {
            const updated = [...(prev[key] || [])];
            updated.splice(index, 1);
            return { ...prev, [key]: updated };
        });

        setFilesMap((prev) => {
            const updated = [...(prev[key] || [])];
            updated.splice(index, 1);
            return { ...prev, [key]: updated };
        });
    };

    const handleRemoveExistingImage = async (type, variantId = null, imageId = null) => {
        try {
            const token = localStorage.getItem('token');
            let url = `${BASE_URL}/images/${id}`;
            if (type === 'main') {
                url += '/main';
            } else if (type === 'multiple' && imageId) {
                url += `/multiple/${imageId}`;
            } else if (type === 'variant_main' && variantId) {
                url += `/variant/${variantId}/main`;
            } else if (type === 'variant_multiple' && variantId && imageId) {
                url += `/variant/${variantId}/multiple/${imageId}`;
            }
            await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update existing images state
            if (type === 'main') {
                setExistingImages((prev) => ({ ...prev, main_image: null }));
            } else if (type === 'multiple' && imageId) {
                setExistingImages((prev) => ({
                    ...prev,
                    multiple_images: prev.multiple_images.filter((img) => img.id !== imageId),
                }));
            } else if (type === 'variant_main' && variantId) {
                setExistingImages((prev) => ({
                    ...prev,
                    variants: {
                        ...prev.variants,
                        [variantId]: { ...prev.variants[variantId], main_image: null },
                    },
                }));
            } else if (type === 'variant_multiple' && variantId && imageId) {
                setExistingImages((prev) => ({
                    ...prev,
                    variants: {
                        ...prev.variants,
                        [variantId]: {
                            ...prev.variants[variantId],
                            multiple_images: prev.variants[variantId].multiple_images.filter(
                                (img) => img.id !== imageId
                            ),
                        },
                    },
                }));
            }
            alert('Image removed successfully!');
        } catch (error) {
            console.error('Error removing image:', error);
            alert('Failed to remove image.');
        }
    };

    const handleReset = () => {
        setSinglePreviews({});
        setMultiplePreviews({});
        setFilesMap({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Main Product
        if (filesMap['productSingle']) {
            formData.append('main_image', filesMap['productSingle']);
        }
        if (filesMap['productMultiple']) {
            filesMap['productMultiple'].forEach((file) => formData.append('multiple_images', file));
        }

        // Variants
        variants.forEach((variant) => {
            const singleKey = `variant_${variant.id}_Single`;
            const multipleKey = `variant_${variant.id}_Multiple`;

            if (filesMap[singleKey]) {
                formData.append(`variant_${variant.id}_main`, filesMap[singleKey]);
            }
            if (filesMap[multipleKey]) {
                filesMap[multipleKey].forEach((file) =>
                    formData.append(`variant_${variant.id}_multiple`, file)
                );
            }
        });

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/images/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            // alert('Images uploaded successfully!');
            toast.succes('Images uploaded successfully!')
            console.log(response.data);
            handleReset();
            dispatch(fetchProductById(id)); // Refresh product data
        } catch (error) {
            console.error('Upload failed:', error);
            // alert('Image upload failed.');
            toast.error('Image upload failed')
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header py-3">
                            <h5 className="text-dark mb-0">Edit Product Images</h5>
                        </div>
                        <div className="card-block">
                            <form
                                className="app-form mt-3"
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                                onReset={handleReset}
                            >
                                {/* Main Product Section */}
                                <div>
                                    <h6 className="sub-heading">Main Product Images</h6>
                                    <div className="row">
                                        {/* Single Main Image */}
                                        <div className="col-lg-4 col-md-6 mb-3">
                                            <label className="form-label">Main Product Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={(e) => handleSingleImageChange(e, 'productSingle')}
                                            />
                                            {singlePreviews['productSingle'] && (
                                                <div className="image-preview" style={{ display: 'block' }}>
                                                    <img src={singlePreviews['productSingle']} alt="Preview" />
                                                    <button
                                                        type="button"
                                                        className="remove-image"
                                                        onClick={() => handleRemoveSingle('productSingle')}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                            {existingImages.main_image?.url && !singlePreviews['productSingle'] && (
                                                <div className="image-preview" style={{ display: 'block' }}>
                                                    <img
                                                        src={`${BASE_URL}/Uploads/products/${existingImages.main_image.url}`}
                                                        alt="Existing Main"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="remove-image"
                                                        onClick={() => handleRemoveExistingImage('main')}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Multiple Main Images */}
                                        <div className="col-lg-8 col-md-6 mb-3">
                                            <label className="form-label">Upload Multiple Product Images</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleMultipleImageChange(e, 'productMultiple')}
                                            />
                                            <div className="multiple-image-preview">
                                                {(multiplePreviews['productMultiple'] || []).map((img, i) => (
                                                    <div className="image-preview" key={`new-${i}`}>
                                                        <img src={img} alt="Preview" />
                                                        <button
                                                            type="button"
                                                            className="remove-image"
                                                            onClick={() => handleRemoveMultiple('productMultiple', i)}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                                {(existingImages.multiple_images || []).map((img, i) => (
                                                    <div className="image-preview" key={`existing-${img.id || i}`}>
                                                        <img
                                                            src={`${BASE_URL}/Uploads/products/${img.url}`}
                                                            alt="Existing Multiple"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="remove-image"
                                                            onClick={() => handleRemoveExistingImage('multiple', null, img.id)}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Variant Sections */}
                                {variants.map((variant) => {
                                    const variantLabel = `${variant.size?.title || ''} / ${variant.color?.label || ''}`;
                                    const singleKey = `variant_${variant.id}_Single`;
                                    const multipleKey = `variant_${variant.id}_Multiple`;
                                    const variantImages = existingImages.variants[variant.id] || {
                                        main_image: null,
                                        multiple_images: [],
                                    };

                                    return (
                                        <div key={variant.id}>
                                            <h6 className="sub-heading">Variant: {variantLabel}</h6>
                                            <div className="row">
                                                {/* Single Variant Image */}
                                                <div className="col-lg-4 col-md-6 mb-3">
                                                    <label className="form-label">Main Image</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        accept="image/*"
                                                        onChange={(e) => handleSingleImageChange(e, singleKey)}
                                                    />
                                                    {singlePreviews[singleKey] && (
                                                        <div className="image-preview" style={{ display: 'block' }}>
                                                            <img src={singlePreviews[singleKey]} alt="Preview" />
                                                            <button
                                                                type="button"
                                                                className="remove-image"
                                                                onClick={() => handleRemoveSingle(singleKey)}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    )}
                                                    {variantImages.main_image?.url && !singlePreviews[singleKey] && (
                                                        <div className="image-preview" style={{ display: 'block' }}>
                                                            <img
                                                                src={`${BASE_URL}/Uploads/products/${variantImages.main_image.url}`}
                                                                alt="Existing Variant Main"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="remove-image"
                                                                onClick={() => handleRemoveExistingImage('variant_main', variant.id)}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Multiple Variant Images */}
                                                <div className="col-lg-8 col-md-6 mb-3">
                                                    <label className="form-label">Upload Multiple Images</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={(e) => handleMultipleImageChange(e, multipleKey)}
                                                    />
                                                    <div className="multiple-image-preview">
                                                        {(multiplePreviews[multipleKey] || []).map((img, i) => (
                                                            <div className="image-preview" key={`new-${i}`}>
                                                                <img src={img} alt="Preview" />
                                                                <button
                                                                    type="button"
                                                                    className="remove-image"
                                                                    onClick={() => handleRemoveMultiple(multipleKey, i)}
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {(variantImages.multiple_images || []).map((img, i) => (
                                                            <div
                                                                className="image-preview"
                                                                key={`existing-${img.id || i}`}
                                                            >
                                                                <img
                                                                    src={`${BASE_URL}/Uploads/products/${img.url}`}
                                                                    alt="Existing Variant Multiple"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="remove-image"
                                                                    onClick={() =>
                                                                        handleRemoveExistingImage('variant_multiple', variant.id, img.id)
                                                                    }
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Submit / Reset Buttons */}
                                <div className="row">
                                    <div className="col-lg-12 text-center my-4">
                                        <button type="submit" className="btn btn-primary py-2 px-5 me-2">
                                            Upload Images
                                        </button>
                                        <button type="reset" className="btn btn-secondary py-2 px-5">
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProductImages;