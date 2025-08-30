import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../css/user/userstyle.css";
import "../../css/admin/icofont.css";
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import ProductCard from "../../components/productCard";
import axios from "axios";
import BASE_URL from "../../config/config";
import { useSelector } from "react-redux";
import FilterSidebar from "../../components/filterSideBar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const categories = useSelector((state) => state.categories.categories || []);
  const mainCategoryId = parseInt(searchParams.get("mainCategoryId"));
  const subCategoryId = searchParams.get('subCategoryId') ? parseInt(searchParams.get('subCategoryId'), 10) : null;
  const listSubCatId = searchParams.get('listSubCatId') ? parseInt(searchParams.get('listSubCatId'), 10) : null;

  const getCategoryTitle = (id) =>
    categories.find((cat) => cat.id === id)?.title || "Unknown";

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    ...(mainCategoryId ? [{ label: getCategoryTitle(mainCategoryId) }] : []),
    ...(subCategoryId ? [{ label: getCategoryTitle(subCategoryId) }] : []),
    ...(listSubCatId ? [{ label: getCategoryTitle(listSubCatId) }] : []),
  ];

  useEffect(() => {
    setProducts([]);
    const queryString = new URLSearchParams({
      ...(searchParams.get("mainCategoryId") && { mainCategoryId: searchParams.get("mainCategoryId") }),
      ...(searchParams.get("subCategoryId") && { subCategoryId: searchParams.get("subCategoryId") }),
      ...(searchParams.get("listSubCatId") && { listSubCatId: searchParams.get("listSubCatId") }),
      ...(searchParams.get("brandId") && { brandId: searchParams.get("brandId") }),
      ...(searchParams.get("searchStr") && { searchStr: searchParams.get("searchStr") }),
      ...(searchParams.get("color") && { color: searchParams.get("color") }),
      ...(searchParams.get("size") && { size: searchParams.get("size") }),
      ...(searchParams.get("filterListIds") && { filterListIds: searchParams.get("filterListIds") }),
      ...(searchParams.get("minPrice") && { minPrice: searchParams.get("minPrice") }),
      ...(searchParams.get("maxPrice") && { maxPrice: searchParams.get("maxPrice") }),
      ...(searchParams.get("sort") && { sort: searchParams.get("sort") }),
      ...(searchParams.get("page") && { page: searchParams.get("page") }),
      ...(searchParams.get("pageSize") && { pageSize: searchParams.get("pageSize") }),
      ...(searchParams.get("discountPctMin") && { discountPctMin: searchParams.get("discountPctMin") }),
      ...(searchParams.get("discountPctMax") && { discountPctMax: searchParams.get("discountPctMax") }),

    }).toString();

    axios
      .get(`${BASE_URL}/products/search?${queryString}`)
      .then((res) => {
        const rawProducts = res.data?.items || [];
        const filteredProducts = rawProducts.flatMap((product) => {
          const minPrice = parseFloat(searchParams.get("minPrice")) || 0;
          const maxPrice = parseFloat(searchParams.get("maxPrice")) || Infinity;
          const discountMin = parseFloat(searchParams.get("discountPctMin")) || 0;
          const discountMax = parseFloat(searchParams.get("discountPctMax")) || Infinity;

          // ✅ use productDiscountPercent from API
          const productDiscount = product.productDiscountPercent || 0;

          const isInRange = (sellingPrice, discountPct) => {
            return (
              sellingPrice >= minPrice &&
              sellingPrice <= maxPrice &&
              discountPct >= discountMin &&
              discountPct <= discountMax
            );
          };

          // Check product
          const productInRange = isInRange(product.sellingPrice, productDiscount);

          // Check variants → assume API provides badgeDiscountPercent per variant
          const variantsInRange = (product.variants || []).filter((variant) =>
            isInRange(variant.sellingPrice, variant.badgeDiscountPercent || 0)
          );

          if (productInRange && variantsInRange.length > 0) {
            const mainProductEntry = {
              ...product,
              isVariant: false,
              discountPct: productDiscount,
            };
            const variantEntries = variantsInRange.map((variant) => ({
              ...product,
              variantId: variant.id,
              isVariant: true,
              _variant: variant,
              mrp: variant.mrp,
              sellingPrice: variant.sellingPrice,
              discountPct: variant.badgeDiscountPercent || 0,
            }));
            return [mainProductEntry, ...variantEntries];
          } else if (!productInRange && variantsInRange.length > 0) {
            return variantsInRange.map((variant) => ({
              ...product,
              variantId: variant.id,
              isVariant: true,
              _variant: variant,
              mrp: variant.mrp,
              sellingPrice: variant.sellingPrice,
              discountPct: variant.badgeDiscountPercent || 0,
            }));
          } else if (productInRange && variantsInRange.length === 0) {
            return [{ ...product, isVariant: false, discountPct: productDiscount }];
          }
          return [];
        });

        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.error("GET: Failed to fetch products", err);
      });

  }, [searchParams]);

  const groupByListSubCategory = (products) => {
    const grouped = {};
    products.forEach((product) => {
      const key = product?.category?.title || "Others";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(product);
    });
    return grouped;
  };

  return (
    <>
      <Header />
      <section className="bg-light py-3">
        <div className="container shop">
          <div className="row">
            <div className="col-lg-12">
              <div>
                {breadcrumbItems.map((item, index) => (
                  <span key={index}>
                    {item.link ? (
                      <Link to={item.link}>{item.label}</Link>
                    ) : (
                      <strong>{item.label}</strong>
                    )}
                    {index < breadcrumbItems.length - 1 && (
                      <span className="mx-2">{">"}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="terms-of-service">
        <div className="container">
          <h2>Products</h2>
          {subCategoryId && (
            <div className="mb-3">
              <h5>
                {listSubCatId
                  ? getCategoryTitle(listSubCatId)
                  : getCategoryTitle(subCategoryId)}{" "}
                ({products.length} item{products.length !== 1 ? "s" : ""})
              </h5>
            </div>
          )}
          <div className="row">
            {listSubCatId !== null && (
              <div className="col-lg-3">
                <FilterSidebar />
              </div>
            )}

            <div className={listSubCatId ? "col-lg-9 mb-3 sg" : "col-lg-12 mb-3 sg"}>
              <div className="Fabric pb-4">
                {products.length > 0 ? (
                  subCategoryId && !listSubCatId ? (
                    Object.entries(groupByListSubCategory(products)).map(
                      ([listSubCatTitle, subProducts]) => (
                        <div key={listSubCatTitle} className="mb-5">
                          <h4 className="mb-3">{listSubCatTitle}</h4>
                          <div className="row row-cols-1 row-cols-md-4 g-4">
                            {subProducts.map((product) => (
                              <ProductCard
                                key={product.id}
                                product={product}
                                variant={product._variant}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          variant={product._variant}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <p>No products found for this category.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductsPage;