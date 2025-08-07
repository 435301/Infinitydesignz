import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config/config';
import { placeOrder } from '../redux/actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PlaceOrderButton = ({ buildOrderData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.order);

  const handlePlaceOrder = async () => {
    const orderData = buildOrderData();
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      toast.error("Cart is empty. Cannot place order")
      return;
    }
    try {
      await dispatch(placeOrder(orderData));
      navigate('/checkout');
    } catch (e) {
      // Already handled in redux state
    }
  };

  return (
    <>
      <button
        className="btn btn-place-order w-100"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </>
  );
};

export default PlaceOrderButton;
