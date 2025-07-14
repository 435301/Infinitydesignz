import React, { useState } from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CreatePromotion = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', formData);
        // TODO: Add form submit logic (API call)
    };

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>

                <div className="content-wrapper p-3">
                    <div className="container-fluid">
                        <div className="row py-4">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">Create Promotion</h5>
                                        <a href="/admin/home-screen-create-promotion" className="btn btn-primary btn-sm">Manage</a>
                                    </div>

                                    <div className="card-block">
                                        <form className="app-form" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-12 mb-3">
                                                    <h6 className="text-info mb-0">Promotion Basic Details</h6>
                                                    <hr />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Title <span className="text-danger">*</span></label>
                                                    <input name="title" className="form-control" onChange={handleChange} placeholder="Title" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Priority</label>
                                                    <select name="priority" className="form-control" onChange={handleChange}>
                                                        <option value="">Please select position</option>
                                                        <option value="1">Top</option>
                                                        <option value="2">Middle</option>
                                                        <option value="3">Bottom</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Display Position <span className="text-danger">*</span></label>
                                                    <select name="display_position" className="form-control" onChange={handleChange}>
                                                        <option value="">--Choose--</option>
                                                        <option value="homepage">Homepage</option>
                                                        <option value="product_page">Product Page</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Image <span className="text-danger">*</span></label>
                                                    <input name="app_icon" type="file" className="form-control" onChange={handleChange} accept="image/*" />
                                                </div>

                                                <div className="col-lg-12 mb-3 mt-4">
                                                    <h6 className="text-info">Promotion Based On</h6>
                                                    <hr />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Menu <span className="text-danger">*</span></label>
                                                    <select name="menu" className="form-control" onChange={handleChange}>
                                                        <option value="">--Choose Menu--</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Sub Menu <span className="text-danger">*</span></label>
                                                    <select name="sub_menu" className="form-control" onChange={handleChange}>
                                                        <option value="">--Choose Sub Menu--</option>
                                                    </select>
                                                    <div className="mt-1" style={{ fontSize: '10px' }}>
                                                        <a href="#">Create Sub Menu</a> | <a href="#">Create Brand</a>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">List Sub Menu <span className="text-danger">*</span></label>
                                                    <select name="list_sub_menu" className="form-control" onChange={handleChange}>
                                                        <option value="">--Choose List Sub Menu--</option>
                                                    </select>
                                                    <div className="mt-1" style={{ fontSize: '10px' }}>
                                                        <a href="#">Create List Sub Menu</a>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Brand</label>
                                                    <input name="brand" className="form-control" onChange={handleChange} placeholder="Enter brand" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Seller</label>
                                                    <input name="seller" className="form-control" onChange={handleChange} placeholder="Enter seller" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Min Price</label>
                                                    <input name="min_price" className="form-control" onChange={handleChange} placeholder="Enter minimum price" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Max Price</label>
                                                    <input name="max_price" className="form-control" onChange={handleChange} placeholder="Enter maximum price" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Offer(%) From</label>
                                                    <input name="offer_from" className="form-control" onChange={handleChange} placeholder="Offer % from" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Offer(%) To</label>
                                                    <input name="offer_to" className="form-control" onChange={handleChange} placeholder="Offer % to" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">SEO Title</label>
                                                    <input name="seo_title" className="form-control" onChange={handleChange} placeholder="SEO Title" type="text" />
                                                </div>

                                                <div className="col-lg-4 mb-3">
                                                    <label className="form-label">Status</label>
                                                    <select name="status" className="form-control" onChange={handleChange}>
                                                        <option value="">- Select Status -</option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label">SEO Description</label>
                                                    <textarea name="seo_description" className="form-control" onChange={handleChange} rows="2"></textarea>
                                                </div>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label">SEO Keywords</label>
                                                    <textarea name="seo_keywords" className="form-control" onChange={handleChange} rows="2"></textarea>
                                                </div>

                                                <div className="col-lg-12 text-center my-4">
                                                    <button type="submit" className="btn btn-danger py-2 px-5">SUBMIT</button>
                                                    <button type="button" className="btn btn-success py-2 px-5" onClick={() => window.history.back()}>BACK</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePromotion;
