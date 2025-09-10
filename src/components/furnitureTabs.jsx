import React, { useEffect, useState } from 'react';
import '../../src/css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';
import '../css/user/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeTabs } from '../redux/actions/homeCategoryAction';
import BASE_URL from '../config/config';
import { useNavigate } from 'react-router-dom';

const FurnitureTabs = ({ homecategories = [] }) => {
  const navigate = useNavigate();
  const homeTabs = homecategories.filter(cat => cat.showInHomeTabs);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (homeTabs.length && !activeTab) {
      setActiveTab(homeTabs[0].id);
    }
  }, [homeTabs, activeTab]);

  if (!homeTabs.length) {
    return (
      <section className="bg-lights">
        <div className="container py-5 text-center">
          <p>No home categories available</p>
        </div>
      </section>
    );
  }

  const currentTab = homeTabs.find(tab => tab.id === activeTab);

  const handleRedirect = (child, parent) => {
   navigate(`/products${child.slug}/ `);

  };
  const normalizeImagePath = (path) => {
    if (!path) return "";
    return path.replace("/uploads/categories//uploads/categories/", "/uploads/categories/");
  };

  return (
    <section className="bg-lights">
      <div className="container py-5">
        {/* Nav Tabs */}
        <ul className="nav nav-tabs justify-content-center flex-wrap" role="tablist">
          {homeTabs.map(tab => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <img src={`${BASE_URL}${normalizeImagePath(tab.appIcon)}`} className="me-2" alt={tab.title} />
                {tab.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="tab-content mt-3">
          {currentTab && (
            <div className="row g-3 mt-3">
              {currentTab.children && currentTab.children.length ? (
                currentTab.children.map(child => {
                  const imgSrc = child.mainImage
                    ? `${BASE_URL}${child.mainImage}`
                    : child.webImage
                    ? `${BASE_URL}${child.webImage}`
                    : child.appIcon
                    ? `${BASE_URL}${child.appIcon}`
                    : null;

                  return (
                    <div className="col-6 col-sm-4 col-md-3" key={child.id} onClick={() => handleRedirect(child, currentTab)}  style={{ cursor: "pointer" }}>
                      <div className="product-item text-center">
                        {imgSrc ? (
                          <img src={imgSrc} alt={child.title || 'N/A'} />
                        ) : (
                          <div className="na-text">N/A</div>
                        )}
                        <p>{child.title || 'N/A'}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center">No items available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};



export default FurnitureTabs;
