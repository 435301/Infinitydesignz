import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BASE_URL from '../config/config';
import Aa from '../img/aa.svg';
import Modern from '../img/modern.svg';
import Furniture from '../img/furniture.svg';
import '../../src/css/user/header.css';

const BannerSlider = ({ sliders }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="col-md-6 shadow-lg">
      <Slider {...settings}>
        {sliders.map((slider) => (
          <div key={slider.id}>
            <div
              className="furniture-banner position-relative overflow-hidden rounded"
              style={{
                background: `url(${BASE_URL}${slider.image_url}) center center / cover no-repeat`,
                minHeight: '445px', 
                borderRadius:'8px',
              }}
            >
              <div
                className="info-box text-white p-4"
                style={{
                  backgroundColor: '#0da79e',
                  maxWidth: '312px',
                  borderTopRightRadius: '58px',
                  borderBottomRightRadius: '58px',
                  marginTop: '73px',
                  marginLeft: '1px',
                }}
              >
                <img src={Modern} alt="Modern" style={{ width: '108px' }} className="mb-2" />
                  <img src={Furniture} alt="Furniture" style={{ width: '190px' }} className="mb-3" />
                <ul className="list-unstyled fs-6">
                  <li className="mb-2">• 36-Month Warranty Available</li>
                  <li className="mb-2">• EMI starting from ₹1,825/month</li>
                  <li className="mb-2">• Express Shipping in 1 day</li>
                </ul>
                <div className="Shop align-items-center d-flex">
                  <Link
                    to={slider.link?.startsWith('http') ? slider.link : `https://${slider.link}`}
                    className="btn btn-light rounded-pill px-4 text-dark"
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    Shop Now
                  </Link>
                  <img src={Aa} alt="Arrow" style={{ width: '21px' }} className="ms-2" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
