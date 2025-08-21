import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../../css/user/userstyle.css';
import '../../css/admin/icofont.css';
import Header from '../../includes/header';
import Footer from '../../includes/footer';
import ProductCard from '../../components/productCard';
import axios from 'axios';
import BASE_URL from '../../config/config';
import { useSelector } from 'react-redux';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const categories = useSelector((state) => state.categories.categories || []);
  const mainCategoryId = parseInt(searchParams.get('mainCategoryId'));
  const subCategoryId = parseInt(searchParams.get('subCategoryId'));
  const listSubCatId = parseInt(searchParams.get('listSubCatId'));


  const getCategoryTitle = (id) =>
    categories.find((cat) => cat.id === id)?.title;

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    ...(mainCategoryId ? [{ label: getCategoryTitle(mainCategoryId) }] : []),
    ...(subCategoryId ? [{ label: getCategoryTitle(subCategoryId) }] : []),
    ...(listSubCatId ? [{ label: getCategoryTitle(listSubCatId) }] : []),
  ];

useEffect(() => {
  setProducts([]);
  const mainCategoryId = searchParams.get('mainCategoryId');
  const subCategoryId = parseInt(searchParams.get('subCategoryId'));
  const listSubCatId = parseInt(searchParams.get('listSubCatId'));
  const brandId = searchParams.get('brandId') || null;
  const searchStr = searchParams.get('searchStr') || '';
  const color = searchParams.get('color') || '';
  const size = searchParams.get('size') || '';
  const filterListIds = searchParams.get('filterListIds') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('pageSize') || 24;

  const parsedBrandId = brandId && !isNaN(parseInt(brandId)) && parseInt(brandId) > 0 ? brandId : null;

  const queryString = new URLSearchParams({
    ...(mainCategoryId && { mainCategoryId }),
    ...(subCategoryId && { subCategoryId }),
    ...(listSubCatId && { listSubCatId }),
    ...(parsedBrandId && { brandId:parsedBrandId }),
    ...(searchStr && { searchStr }),
    ...(color && { color }),
    ...(size && { size }),
    ...(filterListIds && { filterListIds }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    ...(sort && { sort }),
    ...(page && { page }),
    ...(pageSize && { pageSize }),
  }).toString();

  axios
    .get(`${BASE_URL}/products/search?${queryString}`)
    .then((res) => {
      const rawProducts = res.data?.items || [];

      const filteredProducts = listSubCatId
        ? rawProducts.filter((p) => p.category?.id === listSubCatId)
        : subCategoryId
        ? rawProducts.filter((p) => p.category?.parentId === subCategoryId)
        : rawProducts;

      const combinedProducts = filteredProducts.flatMap((product) => {
        const mainProductEntry = { ...product, isVariant: false };
        const variantEntries = (product.variants || []).map((variant) => ({
          ...product,
          variantId: variant.id,
          isVariant: true,
          _variant: variant,
          mrp: variant.mrp,
          sellingPrice: variant.sellingPrice,
        }));
        return [mainProductEntry, ...variantEntries];
      });

      setProducts(combinedProducts);
    })
    .catch((err) => {
      console.error('GET: Failed to fetch products', err);
    });
}, [searchParams]);

  const groupByListSubCategory = (products) => {
    const grouped = {};
    products.forEach((product) => {
      const key = product?.category?.title || 'Others';
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
                      <span className="mx-2">{'>'}</span>
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
              {/* <h5>
                {getCategoryTitle(subCategoryId)} ({products.length} item
                {products.length !== 1 ? 's' : ''})
              </h5> */}
              <h5>
  {listSubCatId
    ? getCategoryTitle(listSubCatId)
    : getCategoryTitle(subCategoryId)} ({products.length} item{products.length !== 1 ? 's' : ''})
</h5>

            </div>
          )}
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9 mb-3 sg">
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