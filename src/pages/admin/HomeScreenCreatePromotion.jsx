import React, { useState } from 'react';
import { Search, ArrowRepeat, PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';



const HomeScreenCreatePromotion = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        displayCount: '',
        displayRows: '',
        image: null,
        status: '',
    });
    const handleToggleSidebar = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('display_count', formData.displayCount);
        data.append('display_rows', formData.displayRows);
        data.append('image', formData.image);
        data.append('status', formData.status);

        // Replace with your API endpoint
        console.log('Submitting form:', Object.fromEntries(data));

    };

    const handleAdd = () => {
        // Implement "Add" functionality (e.g., add to a list or reset form)
        console.log('Add button clicked:', formData);
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
                <aside className="main-sidebar hidden-print">
                    <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)}/>
                </aside>

                <div className="content-wrapper mb-4" style={{ marginLeft: isSidebarCollapsed ? '60px' : '272px', padding: '20px', flex: 1, transition: 'margin-left 0.3s ease', }}>

                    <div className="container-fluid">
                        <div className="row py-4">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header py-3 mb-3 d-flex justify-content-between align-items-center">
                                        <h5 className="text-dark mb-0">Create Promotion</h5>
                                        <a href="/admin/home-screen-promotion-category" className="btn btn-primary btn-sm">
                                            Manage
                                        </a>
                                    </div>
                                    <div className="card-block">
                                        <form className="app-form" encType="multipart/form-data" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="title" className="form-label">
                                                        Title <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        id="title"
                                                        name="title"
                                                        placeholder="Title"
                                                        className="form-control"
                                                        type="text"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-lg-4 col-md-6 mb-3">
                                                    <label htmlFor="display_count" className="form-label">
                                                        Display Count <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        id="display_count"
                                                        name="displayCount"
                                                        placeholder="Display count"
                                                        className="form-control"
                                                        type="text"
                                                        value={formData.displayCount}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="display_rows" className="form-label">
                                                        Display Rows <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        id="display_rows"
                                                        name="displayRows"
                                                        placeholder="Enter Display Rows"
                                                        className="form-control"
                                                        type="text"
                                                        value={formData.displayRows}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="images" className="form-label">
                                                        Image
                                                    </label>
                                                    <input
                                                        id="images"
                                                        name="image"
                                                        className="form-control"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                                <div className="col-lg-4 mb-3">
                                                    <label htmlFor="status" className="form-label">
                                                        Status
                                                    </label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        className="form-control"
                                                        value={formData.status}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="" disabled>
                                                            - Select Status -
                                                        </option>
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>

                                                <div className="col-lg-12 text-center my-4">
                                                    <button type="submit" className="btn btn-danger py-2 px-5">
                                                        SUBMIT
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-success py-2 px-5 ms-2"
                                                        onClick={handleBack}
                                                    >
                                                        {/* <ArrowLeft className="me-1" /> */}
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

export default HomeScreenCreatePromotion;