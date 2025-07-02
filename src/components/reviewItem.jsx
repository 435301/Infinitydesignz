import React from 'react';
import avatar from '../../src/img/account_circle.png';
import '../css/user/userstyle.css';
import '../css/user/bootstrap.min.css';

const ReviewItem = ({ stars, text, date, user }) => {
  return (
    <div className="review-item mb-4">
      <div className="review-stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</div>
      <p className="review-text">{text}</p>
      <p className="review-date">{date}</p>
      <div className="review-user d-flex align-items-center gap-2">
        <img src={avatar} alt="User Avatar" style={{ width: 30, height: 30 }} />
        <span>{user}</span>
        <span className="verified-purchase">Verified Purchase</span>
      </div>
    </div>
  );
};

export default ReviewItem;
