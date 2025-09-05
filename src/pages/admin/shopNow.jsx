import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAdmin from '../../includes/headerAdmin';
import Sidebar from '../../includes/sidebar';
import '../../css/admin/style.css';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';


const ShopNow = () => {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [url, setUrl] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleToggleSidebar = (collapsed) => {
        setIsSidebarCollapsed(collapsed);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            console.log("Updated URL:", url); 
        }
    };

    return (
        <div className="sidebar-mini fixed">
            <div className="wrapper">
                <HeaderAdmin onToggleSidebar={handleToggleSidebar} />
                <aside className="main-sidebar hidden-print">
                    <Sidebar isCollapsed={isSidebarCollapsed} onClose={() => setIsSidebarCollapsed(true)}/>
                </aside>

                <div
                    className="content-wrapper mb-4"
                    style={{
                        marginLeft: isSidebarCollapsed ? '60px' : '272px',
                        padding: '20px',
                        flex: 1,
                        transition: 'margin-left 0.3s ease',
                    }}
                >
                    <div className="main-header" style={{ marginTop: '0px' }}>
                        <h4>Shop Now</h4>
                    </div>
                    <div className="card mx-3">
                        <div className="card-body">
                            <div className="p-3" style={{ maxWidth: "400px" }}>
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Shop URL"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    <Button variant="primary" onClick={handleEdit}>
                                        <BsPencil size={18} className="me-1" />
                                        {isEditing ? "Save" : "Edit"}
                                    </Button>
                                </InputGroup>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

    );
};

export default ShopNow;
