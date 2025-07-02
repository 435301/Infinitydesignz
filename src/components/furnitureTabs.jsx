import React, { useState } from 'react';
import '../../src/css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';
import '../css/user/bootstrap.min.css';

const FurnitureTabs = ({ tabs, images }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className="bg-lights">
      <div className="container py-5">
        {/* Nav Tabs */}
        <ul className="nav nav-tabs justify-content-center flex-wrap" role="tablist">
          {tabs.map((tab) => (
            <li className="nav-item" role="presentation" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                id={`${tab.id}-tab`}
                type="button"
                role="tab"
                onClick={() => setActiveTab(tab.id)}
              >
                <img src={tab.icon} className="me-2" alt={`${tab.label} Icon`} />
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className="tab-content mt-3">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
              id={tab.id}
              role="tabpanel"
            >
              <div className="row g-3">
                {images.map((item, index) => (
                  <div className="col-6 col-sm-4 col-md-3" key={`${tab.id}-${index}`}>
                    <div className="product-item">
                      <img src={item.src} alt="Product" />
                      <p>{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FurnitureTabs;
