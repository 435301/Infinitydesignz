import React, { useEffect } from "react";
import '../../src/css/user/userstyle.css';
import '../../src/css/user/bootstrap-icons.css';
import '../css/user/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchNeedHelpItems } from "../redux/actions/categoryAction";
import BASE_URL from "../config/config";
import { useNavigate } from "react-router-dom";

const HelpSection = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.help);
  console.log('items',items)

    useEffect(() => {
    dispatch(fetchNeedHelpItems());
  }, [dispatch]);

    const makeSlug = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const handleRedirect = async (item) => {
  let parentSlug = "category";
  
  if (item.parentId) {
    const res = await fetch(`${BASE_URL}/categories/${item.parentId}`);
    const parent = await res.json();
    parentSlug = makeSlug(parent.title);
  }

  const childSlug = `${makeSlug(item.title)}-${item.id}`;
  navigate(`/products/main/${parentSlug}/${childSlug}`);
};

    if (loading) return <p>Loading help items...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="help-section pb-5">
      <div className="container">
        <h2 className="help-title text-start">{title}</h2>
        <div className="help-grid">
         {items.map((item) => (
            <div className="help-card" key={item.id}  onClick={() => handleRedirect(item, items)}>
              <div className="help-card-img-wrapper">
                <img  src={`${BASE_URL}${item.mainImage || item.appIcon || item.webImage}`}  alt={item.title} />
                <div className="help-card-overlay">
                  <div className="help-card-title">{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
