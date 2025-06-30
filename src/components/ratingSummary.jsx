import React from 'react';
import '../../src/css/style.css';
import '../css/bootstrap.min.css';

const RatingSummary = ({ totalRatings, averageRating, breakdown, onWriteReview }) => {
    return (
        <div className="rating-summary p-4">
            <div className="d-flex align-items-center mb-2">
                <span className="global-ratings me-2">{totalRatings.toLocaleString()} global ratings |</span>
                <span className="overall-rating">{averageRating.toFixed(1)}</span>
                <span className="rating-stars ms-2">{'★'.repeat(Math.floor(averageRating))}☆</span>
            </div>

            {Object.entries(breakdown).map(([star, percent]) => (
                <div className="rating-bar d-flex align-items-center my-3" key={star}>
                    <span style={{ width: '60px' }}>{star} star</span>
                    <div className="progress flex-grow-1 mx-2" style={{
                        flexGrow: "1",
                        height: "25px",
                        marginRight: "0.5rem",
                        backgroundColor: "#e0e0e0",
                        borderRadius: 0,
                        overflow: "hidden"
                    }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                                width: `${percent}%`, backgroundColor: "#FF9D00",
                                borderRadius: 0,
                            }}
                            aria-valuenow={percent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <span className="percentage" style={{
                        fontSize: "0.85rem",
                        color: "#6c757d",
                        width: "30px",
                        textAlign: "right"
                    }}>{percent}%</span>
                </div>
            ))}

            <button className="btn write-review-btn mt-3 productReviewBtn" style={{
                backgroundColor: "#0DA79E", border: "none",
                color: "#fff",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                padding: "8px 16px",
                borderradius: "4px",
                width: "100%",
                marginTop: "1rem"
            }} onClick={onWriteReview}>
                Write a Product Review
            </button>
        </div>
    );
};

export default RatingSummary;
