import React from 'react';
import RatingSummary from './ratingSummary';
import ReviewItem from './reviewItem';
import '../css/style.css';
import '../css/bootstrap.min.css';

const ReviewSection = () => {
  const reviews = [
    {
      stars: 5,
      text: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
      date: '12 Aug 2024',
      user: 'Shiva Sagar',
    },
    {
      stars: 5,
      text: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
      date: '12 Aug 2024',
      user: 'Shiva Sagar',
    },
    {
      stars: 5,
      text: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
      date: '12 Aug 2024',
      user: 'Shiva Sagar',
    },
  ];

  const breakdown = {
    5: 60,
    4: 22,
    3: 8,
    2: 3,
    1: 11,

  };

  const totalRatings = 2328;
  const averageRating = 4.2;

  const handleWriteReview = () => {
    alert('Review form not implemented.');
  };

  return (
    <div className="row customer-reviews">
      <div className="col-12">
        <h5>Customer Reviews ({reviews.length})</h5>
      </div>

      <div className="col-md-4">
        <RatingSummary
          totalRatings={totalRatings}
          averageRating={averageRating}
          breakdown={breakdown}
          onWriteReview={handleWriteReview}
        />
      </div>

      <div className="col-md-8">
        {reviews.map((review, index) => (
          <ReviewItem key={index} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
