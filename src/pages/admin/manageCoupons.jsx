import React from 'react';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import '../../css/admin/icofont.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const ManageCoupons = () => {
    const coupons = [
        {
            id: 1,
            code: 'SAVE20',
            type: 'List Submenu',
            menu: 'Main Category',
            subMenu: 'Sub Category',
            listSubMenu: 'Item List',
            priceType: 'Percentage',
            value: '20%',
            minOrder: '₹5000',
            validFrom: '2025-05-23',
            validTo: '2025-12-31',
        },
        {
            id: 2,
            code: 'FLAT10',
            type: 'Price',
            menu: 'Main Category',
            subMenu: 'Sub Category',
            listSubMenu: 'Item List',
            priceType: 'Price',
            value: '₹200',
            minOrder: '₹5000',
            validFrom: '2025-06-01',
            validTo: '2025-11-30',
        },
    ];

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this coupon?');
        if (confirmDelete) {
            alert(`Coupon with ID ${id} would be deleted.`);
            // TODO: Implement actual delete logic (API call)
        }
    };

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin />
                <aside className="main-sidebar hidden-print">
                    <Sidebar />
                </aside>

                <div className="content-wrapper p-3">
                    <div className="main-header mt-0">
                        <h4>Manage Coupons</h4>
                    </div>

                    <div className="container-fluid manage">
                        <div className="row mb-3">
                            <div className="col-md-12 text-end">
                                <a href="/add-coupon" className="btn btn-primary">+ Add New</a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-block">
                                        <div className="row mb-3">
                                            <div className="col-lg-6">
                                                <h5>Manage Coupons</h5>
                                            </div>
                                            <div className="col-md-6 text-end">
                                                <button className="btn btn-success me-2">Active</button>
                                                <button className="btn btn-secondary me-2">Inactive</button>
                                                <button className="btn btn-danger me-2">Delete</button>
                                                <button className="btn btn-warning">Trash</button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12 table-responsive">
                                                <table className="table table-striped table-hover align-middle">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Coupon Code</th>
                                                            <th>Coupon Type</th>
                                                            <th>Menu</th>
                                                            <th>Sub Menu</th>
                                                            <th>List Sub Menu</th>
                                                            <th>Price/Percentage</th>
                                                            <th>Value</th>
                                                            <th>Min Order Price</th>
                                                            <th>Valid From</th>
                                                            <th>Valid To</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {coupons.map((coupon, index) => (
                                                            <tr key={coupon.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{coupon.code}</td>
                                                                <td>{coupon.type}</td>
                                                                <td>{coupon.menu}</td>
                                                                <td>{coupon.subMenu}</td>
                                                                <td>{coupon.listSubMenu}</td>
                                                                <td>{coupon.priceType}</td>
                                                                <td>{coupon.value}</td>
                                                                <td>{coupon.minOrder}</td>
                                                                <td>{coupon.validFrom}</td>
                                                                <td>{coupon.validTo}</td>
                                                                <td>
                                                                    <a
                                                                        href={`/edit-coupon/${coupon.id}`}
                                                                        className="btn btn-light-success icon-btn b-r-4 me-2"
                                                                    >
                                                                        <i className="bi bi-pencil text-success"></i>
                                                                    </a>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-light-danger icon-btn b-r-4"
                                                                        onClick={() => handleDelete(coupon.id)}
                                                                    >
                                                                        <i className="bi bi-trash text-danger"></i>
                                                                    </button>
                                                                </td>

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default ManageCoupons;
