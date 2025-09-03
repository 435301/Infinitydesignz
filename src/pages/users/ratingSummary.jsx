import React from 'react';
import '../../css/user/bootstrap.min.css';

const RatingSummary = ({ totalRatings, averageRating, breakdown, onWriteReview }) => {
    return (
        <>
            <style>{`
                .rating-summary .global-ratings {
                    font-size: 0.9rem;
                    color: #6c757d;
                }

                .rating-summary .overall-rating {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #333;
                }

                .rating-summary .rating-stars {
                    font-size: 1.2rem;
                    color: #ff9d00;
                }

                .rating-bar {
                    display: flex;
                    align-items: center;
                }

                .rating-bar .rating-star-label {
                    width: 60px;
                    font-size: 0.9rem;
                }

                .rating-progress {
                    flex-grow: 1;
                    height: 25px;
                    margin-right: 0.5rem;
                    background-color: #e0e0e0;
                    border-radius: 0;
                    overflow: hidden;
                }

                .rating-progress-bar {
                    background-color: #ff9d00;
                    border-radius: 0;
                }

                .percentage {
                    font-size: 0.85rem;
                    color: #6c757d;
                    width: 30px;
                    text-align: right;
                }

                .write-review-btn {
                    background-color: #0da79e;
                    border: none;
                    color: #fff;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    padding: 8px 16px;
                    border-radius: 4px;
                    width: 100%;
                    margin-top: 1rem;
                }

                .write-review-btn:hover {
                    background-color: #0b8d86;
                }
            `}</style>

            <div className="rating-summary p-4">
                <div className="d-flex align-items-center mb-2">
                    <span className="global-ratings me-2">{totalRatings.toLocaleString()} global ratings |</span>
                    <span className="overall-rating">{averageRating.toFixed(1)}</span>
                    <span className="rating-stars ms-2">{'★'.repeat(Math.floor(averageRating))}☆</span>
                </div>

                {Object.entries(breakdown).map(([star, percent]) => (
                    <div className="rating-bar d-flex align-items-center my-3" key={star}>
                        <span className="rating-star-label">{star} star</span>
                        <div className="progress rating-progress flex-grow-1 mx-2">
                            <div
                                className="progress-bar rating-progress-bar"
                                role="progressbar"
                                style={{ width: `${percent}%` }} // ✅ dynamic width must stay inline
                                aria-valuenow={percent}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                        <span className="percentage">{percent}%</span>
                    </div>
                ))}

                <button
                    className="btn write-review-btn mt-3 productReviewBtn"
                    onClick={onWriteReview}
                >
                    Write a Product Review
                </button>
            </div>
        </>
    );
};

export default RatingSummary;
