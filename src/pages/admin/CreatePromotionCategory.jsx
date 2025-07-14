import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';

const CreatePromotionCategory = () => {
    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>

                <div className="content-wrapper pt-2 p-4">
                    <div className="container-fluid">
                        <div className="row py-4">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                        <h5 className="text-dark mb-0">Create Promotion Category</h5>
                                        <a href="/admin/sub-menu-promotion-category" className="btn btn-primary btn-sm">
                                            Manage
                                        </a>
                                    </div>

                                    <div className="card-block">
                                        <form className="app-form" encType="multipart/form-data">
                                            <div className="row">
                                                {/* Title */}
                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
                                                    <input
                                                        id="title"
                                                        name="title"
                                                        placeholder="Title"
                                                        className="form-control"
                                                        type="text"
                                                    />
                                                </div>

                                                {/* Display Count */}
                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="display_count" className="form-label">Display Count <span className="text-danger">*</span></label>
                                                    <input
                                                        id="display_count"
                                                        name="display_count"
                                                        placeholder="Display Count"
                                                        className="form-control"
                                                        type="text"
                                                    />
                                                </div>

                                                {/* Display Columns */}
                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="display_columns" className="form-label">Display Columns <span className="text-danger">*</span></label>
                                                    <input
                                                        id="display_columns"
                                                        name="display_columns"
                                                        placeholder="Display Columns"
                                                        className="form-control"
                                                        type="text"
                                                    />
                                                </div>

                                                {/* Image Upload */}
                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="image" className="form-label">Image</label>
                                                    <input
                                                        id="image"
                                                        name="image"
                                                        className="form-control"
                                                        type="file"
                                                        accept="image/*"
                                                    />
                                                </div>

                                                {/* Submit & Back Buttons */}
                                                <div className="col-lg-12 text-center my-4">
                                                    <button type="submit" className="btn btn-danger py-2 px-5 me-2">SUBMIT</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-success py-2 px-5"
                                                        onClick={() => window.history.back()}
                                                    >
                                                        BACK
                                                    </button>
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

export default CreatePromotionCategory;
