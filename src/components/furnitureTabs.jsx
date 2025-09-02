import React, { useEffect, useState } from 'react';
import '../../src/css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';
import '../css/user/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeTabs } from '../redux/actions/homeCategoryAction';
import BASE_URL from '../config/config';

const FurnitureTabs = ({ homecategories = [] }) => {
  const homeTabs = homecategories.filter(cat => cat.showInHomeTabs);

  const [activeTab, setActiveTab] = useState(homeTabs[0]?.id || null);
   const currentTab = homeTabs.find(tab => tab.id === activeTab);
  if (!homecategories.length) {
    return (
      <section className="bg-lights">
        <div className="container py-5 text-center">
          <p>No home categories available</p>
        </div>
      </section>
    );
  }

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
                {tab.appIcon ? (
                  <img src={`${BASE_URL}${tab.appIcon}`} className="me-2" alt={tab.title} />
                ) : (
                  <span className="na-text me-2">N/A</span>
                )}
                {tab.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="tab-content mt-3">
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
                      <div className="col-6 col-sm-4 col-md-3" key={child.id}>
                        <div className="product-item">
                          {imgSrc ? (
                              <img
                                src={imgSrc}
                                alt={child.title || 'N/A'}
                              />
                            ) : (
                              <div className="na-text">N/A</div>
                            )
                          }
                          <p>{child.title || 'N/A'}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">No items available</p>
                )}

              </div>
            </div>
        </div>
    </section>
  );
};

export default FurnitureTabs;
