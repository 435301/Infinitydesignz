import React, { useEffect, useState } from "react";
import '../../css/user/userstyle.css';
import '../../css/user/bootstrap-icons.css';
import '../../css/user/bootstrap.min.css';
import P1 from '../../img/p1.png';
import AdBanner from '../../img/ad-banner.png';
import Header from "../../includes/header";
import Footer from "../../includes/footer";
import { Link } from "react-router-dom";
import RelatedProductsCarousel from "../users/RelatedProductsCarousel";
import BASE_URL from "../../config/config";
import { cancelOrderItem, fetchOrders } from "../../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../utils/auth";
import CancelOrderModal from "../../modals/cancelOrderModal";
import { Carousel } from "react-bootstrap";
import ProductCard from "../../components/productCard";
import PaginationComponent from "../../includes/pagination";
import { toast } from "react-toastify";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.ordersState.orders);
  const latestOrder = orders.length > 0 ? orders[0] : null;
  const [latestOrderDetails, setLatestOrderDetails] = useState(null);
  console.log('orders', orders)
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);
  const [cancelModalShow, setCancelModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const relatedProducts = useSelector((state) => state.ordersState.relatedProducts);
  console.log('relatedProducts', relatedProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const previousOrders = orders.slice(1);
  const totalPages = Math.ceil(previousOrders.length / ordersPerPage);
  const paginatedOrders = previousOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    const fetchFullOrder = async () => {
      if (orders.length > 0) {
        const latestOrder = orders[0];
        try {
          const res = await fetch(`${BASE_URL}/orders/${latestOrder.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken()}`,
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const fullOrder = await res.json();
          setLatestOrderDetails(fullOrder);
        } catch (err) {
          console.error("Error fetching order details:", err);
        }
      }
    };

    fetchFullOrder();
  }, [orders]);

  const handleCancelItem = (item, orderId) => {
    setSelectedItem({ itemId: item.id, orderId });
    setCancelModalShow(true);
  };

  const submitCancelRequest = async (note) => {
    if (!selectedItem) return;
    try {
      await dispatch(cancelOrderItem(selectedItem.itemId, note.trim(), selectedItem.orderId));

      // Optimistically update the item status within latestOrderDetails
      setLatestOrderDetails((prev) => {
        if (!prev) return prev;

        const updatedItems = prev.items.map((item) =>
          item.id === selectedItem.itemId
            ? { ...item, status: "CANCEL_REQUESTED", moderationNote: note }
            : item
        );

        return {
          ...prev,
          items: updatedItems
        };
      });
      toast.success("Cancel request submitted successfully!");
    } catch (err) {
      toast.error("Failed to submit cancel request. Please try again.");
    } finally {
      setCancelModalShow(false);
    }
  };


  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <section className="breadcrumb-section">
        <div className="container">
          <Link href="#" className="orders-acc"><strong>My Account</strong></Link>
        </div>
      </section>

      <section className="orders-section mt-4">
        <div className="container">
          <div className="row">
            <aside className="col-md-2 sidebars">
              <Link to="/profile">Profile</Link>
              <Link to="/orders" className="active">My Orders</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/addressbook">Address book</Link>
            </aside>

            <div className="col-md-7">
              <div class="col-md-12">
                <div class="wishlist-container">
                  <div className="wishlist-header">
                    <h2 className="m-0">MY ORDERS</h2>
                  </div>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <p>Loading...</p>
                      </td>
                    </tr>
                  ) : (
                    latestOrderDetails ? (
                      <div key={latestOrderDetails.id} className="order-block">
                        {latestOrderDetails.items.map((item) => {
                          const productData = item.variant || item.product || {};
                          return (
                            <div className="order-item" key={item.id}>
                              <div className="order-image">
                                {productData.imageUrl ? (
                                  <img
                                    src={
                                      productData.imageUrl
                                        ? `${BASE_URL}/uploads/products/${productData.imageUrl}`
                                        : "/placeholder.jpg"
                                    }
                                    alt={productData.imageAlt || productData.title || "Product"}
                                    className="order-item-img"
                                  />
                                ) : (
                                  <span className="no-image">N/A</span>
                                )}
                              </div>

                              <div className="order-details">
                                <h5>{productData.title || "Product"}</h5>
                                <p className="warranty">{productData.warranty || ""}</p>

                                <div className="order-meta">
                                  <span className="separator">Color: {productData.color || "N/A"}</span>
                                  <span className="separator">
                                    Size: {productData.size || "N/A"}
                                  </span>
                                  <span className="separator">
                                    Qty: {String(item.quantity).padStart(2, "0")}
                                  </span>
                                  <span>
                                    Payment Status:{" "}
                                    <strong>{latestOrderDetails.payment?.method || "N/A"}</strong>
                                  </span>
                                </div>

                                <div className="order-price">
                                  <span className="current-price">
                                    ₹{item.total?.toLocaleString() || 0}
                                  </span>
                                  <del className="mrp">
                                    MRP: ₹
                                    {(item.product?.mrp ?? item.variant?.mrp ?? 0).toLocaleString()}
                                  </del>
                                </div>

                                <div className="order-info">
                                  <span>
                                    <i className="bi bi-truck"></i> Estimated delivery by{" "}
                                    {latestOrderDetails.estimatedDelivery || "N/A"}
                                  </span>
                                  <span>
                                    <i className="bi bi-arrow-return-right"></i> Easy 14 days
                                    return & exchange available
                                  </span>
                                </div>

                                <div className="order-status">
                                  <div className="status">
                                    <span>
                                      {/* Status:{" "} */}
                                      {/* <span
                                        className={`status ${latestOrderDetails?.status?.toLowerCase()}`}
                                      >
                                        {latestOrderDetails?.status || "N/A"}
                                      </span> */}
                                      <span>
                                        Item Status:{" "}
                                        <span
                                          className={`status ${item?.status?.toLowerCase()}`}
                                          style={{
                                            color:
                                              item?.status === "PENDING"
                                                ? "#ff9800"
                                                : item?.status === "APPROVED"
                                                  ? "#0DA79E"
                                                  : item?.status === "CANCELLED"
                                                    ? "#dc3545"
                                                    : "inherit",
                                          }}
                                        >
                                          {item?.status === "CANCEL_REQUESTED"
                                            ? "Cancellation Requested"
                                            : item?.status || "N/A"}
                                        </span>
                                      </span>

                                    </span>
                                  </div>
                                  {latestOrderDetails?.status === "PENDING" &&
                                    item.status !== "CANCEL_REQUESTED" && (
                                      <button
                                        className="action-btn"
                                        onClick={() => handleCancelItem(item, latestOrderDetails.id)}
                                      >
                                        Cancel Order
                                      </button>
                                    )}
                                  {/*                             
                {latestOrderDetails?.payment?.status === "Delivered" && order.deliveryDate && (
                  <p className="delivery-date">On {order.deliveryDate}</p>
                )}
                {latestOrderDetails?.payment?.status === "Cancelled" && order.refundedDate && (
                  <p className="refunded">Refunded on: {order.refundedDate}</p>
                )}  */}

                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {latestOrderDetails?.address && (
                          <div className="delivery-address">
                            <strong>Deliver to:</strong> <br />
                            <span className="name">{latestOrderDetails.address.name}</span> <br />
                            <span className="address-line">
                              {latestOrderDetails.address.flatNumber},{" "}
                              {latestOrderDetails.address.buildingName}
                            </span>
                            <br />
                            <span className="address-line">
                              {latestOrderDetails.address.addressLine1},{" "}
                              {latestOrderDetails.address.addressLine2}
                            </span>
                            <br />
                            <span className="address-line">
                              {latestOrderDetails.address.city},{" "}
                              {latestOrderDetails.address.state} -{" "}
                              {latestOrderDetails.address.pincode}
                            </span>
                            <br />
                            <span className="phone">
                              Phone: {latestOrderDetails.address.phone}
                            </span>
                          </div>
                        )}

                      </div>
                    ) : (
                      !loading && <p className="text-center">No latest order found</p>
                    ))}


                  {orders.length > 1 && (
                    <div className="text-center mt-4 mb-4">
                      <button
                        className="btn show-order-button"
                        onClick={() => setShowPreviousOrders(!showPreviousOrders)}
                      >
                        {showPreviousOrders ? "Hide Previous Orders" : "Show Previous Orders"}
                      </button>
                    </div>
                  )}

                  {showPreviousOrders && (
                    <div className="previous-orders mt-4">
                      <h3 className="ps-3">Previous Orders</h3>
                      {paginatedOrders.slice(1).map((order) => (
                        <div key={order.id} className="order-block mb-4">
                          {order.items.map((item) => {
                            const productData = item.variant || item.product || {};
                            console.log('productData', productData)
                            return (
                              <div className="order-item" key={item.id}>
                                <div className="order-image">
                                  <img
                                    src={
                                      productData.imageUrl
                                        ? `${BASE_URL}${productData.imageUrl}`
                                        : "/placeholder.jpg"
                                    }
                                    alt={productData.imageAlt || productData.title || "Product"}
                                    className="order-item-img"
                                  />
                                </div>

                                <div className="order-details">
                                  <h5>{productData.title || "Product"}</h5>
                                  <div className="order-meta">
                                    <span className="separator">Color: {productData.color || "N/A"}</span>
                                    <span className="separator">Size: {productData.size || "N/A"}</span>
                                    <span className="separator">Qty: {String(item.qty).padStart(2, "0")}</span>
                                    <span>
                                      Payment Status: <strong>{order.payment?.method || "N/A"}</strong>
                                    </span>
                                  </div>

                                  <div className="order-price">
                                    <span className="current-price">
                                      ₹{item.price?.toLocaleString() || 0}
                                    </span>
                                    <del className="mrp">
                                      MRP: ₹
                                      {(item?.mrp ?? item?.mrp ?? 0).toLocaleString()}
                                    </del>
                                  </div>

                                  <div className="order-info">
                                    <span>
                                      <i className="bi bi-truck"></i> Estimated delivery by{" "}
                                      {order.estimatedDelivery || "N/A"}
                                    </span>
                                    <span>
                                      <i className="bi bi-arrow-return-right"></i> Easy 14 days return & exchange available
                                    </span>
                                  </div>

                                  <div className="order-status">
                                    <div className="status">
                                      <span>
                                        Status:{" "}
                                        <span className={`status ${order?.status?.toLowerCase()}`}>
                                          {order?.status || "N/A"}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {paginatedOrders?.address && (
                            <div className="delivery-address">
                              <strong>Deliver to:</strong> <br />
                              <span className="name">{order.address.name}</span> <br />
                              <span className="address-line">
                                {order.address.flatNumber}, {order.address.buildingName}
                              </span>
                              <br />
                              <span className="address-line">
                                {order.address.addressLine1}, {order.address.addressLine2}
                              </span>
                              <br />
                              <span className="address-line">
                                {order.address.city}, {order.address.state} - {order.address.pincode}
                              </span>
                              <br />
                              <span className="phone">Phone: {order.address.phone}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {showPreviousOrders && orders.length > 1 && (
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>

            <aside className="col-md-3 ads-related">
              <div className="ad-banner">
                <img src={AdBanner} alt="Special Sale" />
              </div>

              {/* Related products section  */}
              <div className="col-lg-12">  <div className="related-products py-4">
                <h4>Related Products</h4>
                <div className="carousel-wrapper">
                  <Carousel controls indicators={false}>
                    {(relatedProducts || []).map((product) => {
                      const imageUrl =
                        product.imageUrl ||
                        product.variant?.imageUrl ||
                        product.product?.imageUrl ||
                        "";
                      const normalizedProduct = {
                        ...product,
                        images: {
                          main: {
                            url: imageUrl?.startsWith("http")
                              ? imageUrl.replace(`${BASE_URL}/uploads/products/`, "")
                              : imageUrl.replace("/uploads/products/", ""),
                          },
                        },
                        mrp: product.mrp,
                        sellingPrice: product.price,
                      };

                      return (
                        <Carousel.Item key={product.id}>
                          <ProductCard product={normalizedProduct} size="medium" />
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </div>


              </div>
              </div>
            </aside>
          </div>
          <CancelOrderModal
            show={cancelModalShow}
            handleClose={() => setCancelModalShow(false)}
            handleSubmit={submitCancelRequest}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
