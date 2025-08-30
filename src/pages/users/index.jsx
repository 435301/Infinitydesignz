
import React, { useEffect, useState } from 'react';
import Header from '../../includes/header';
import Footer from '../../includes/footer';
import '../../css/user/userstyle.css';
import '../../css/user/bootstrap-icons.css';
import '../../css/user/bootstrap.min.css';
import Modern from '../../img/modern.svg';
import Furniture from '../../img/furniture.svg';
import Aa from '../../img/aa.svg';
import S1 from '../../img/s1.png';
import S2 from '../../img/s2.png';
import S4 from '../../img/s4.png';
import Sale1 from '../../img/sale-1.png';
import Sale2 from '../../img/sale-2.png';
import Sale3 from '../../img/sale-3.png';
import Sale4 from '../../img/sale-4.png';
import KingBed from '../../img/king_bed.svg';
import CounterTops from '../../img/countertops.svg';
import Apartment from '../../img/apartment.svg';
import LocalLibrary from '../../img/local_library.svg';
import OuterGarden from '../../img/outdoor_garden.svg';
import living from '../../img/living.png';
import c2 from '../../img/c2.png';
import c3 from '../../img/c3.png';
import c4 from '../../img/c4.png';
import c5 from '../../img/c5.png';
import c6 from '../../img/c6.png';
import c7 from '../../img/c7.png';
import c8 from '../../img/c8.png';
import c9 from '../../img/c9.png';
import c10 from '../../img/c10.png';
import New1 from '../../img/new-1.png';
import New2 from '../../img/new-2.png';
import New3 from '../../img/new-3.png';
import Icon from '../../img/icon.svg';
import Star from '../../img/star.svg';
import Star1 from '../../img/star1.svg';
import Bg1 from '../../img/bg1.png';
import One from '../../img/1.png';
import Two from '../../img/2.svg';
import LivingRoom from '../../img/o1.png';
import Bedroom from '../../img/o2.png';
import F1 from '../../img/f1.png';
import F2 from '../../img/f2.png';
import F3 from '../../img/f3.png';
import Sofa from '../../img/sofa.png';
import Bed from '../../img/bed.png';
import Mattress from '../../img/mattress.png';
import WardRobes from '../../img/wardrobes.png';
import Dining from '../../img/dining.png';
import SlideImage from '../../img/slide.png';
import Img1 from '../../img/img1.png';
import Img2 from '../../img/img2.png';
import Img3 from '../../img/img3.png';
import SaleCarousel from '../../components/projectCarousel';
import FurnitureTabs from '../../components/furnitureTabs';
import ProductGrid from '../../components/productGrid';
import HelpSection from '../../components/helpSection';
import PromoSection from '../../components/PromoSection';
import IconFeatureGrid from '../../components/iconFeaturedGrid';
import NewArrivalsSection from '../../components/newArrivalSection';
import CallbackForm from '../../components/callbackForm';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import OtpLoginModal from '../../components/otpLoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRightSliders, fetchSliders } from '../../redux/actions/slidersAction';
import BASE_URL from '../../config/config';
import BannerSlider from '../../components/bannerSlider';
import { fetchFrontendPromotions } from '../../redux/actions/productionPromotionAction';
import FrontendPromotionsSection from '../../components/frontendPromotionSection';

const waitAndShowModal = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });

export default function HomeBannerSection() {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { sliders } = useSelector((state) => state.sliders);
  const { rightSliders } = useSelector((state) => state.rightSliders);
  const { promotions, loading, error } = useSelector((state) => state.frontendPromotions);
console.log('promotionIndex', promotions)
  console.log("sliders", rightSliders);

  useEffect(() => {
    dispatch(fetchSliders());
    dispatch(fetchRightSliders());
    dispatch(fetchFrontendPromotions(8));
  }, [dispatch]);

  useQuery({
    queryKey: ["show-login-modal"],
    queryFn: waitAndShowModal,
    enabled: location.pathname === "/", 
    onSuccess: () => {
      setShowLoginModal(true);
    },
    staleTime: Infinity,
    cacheTime: 0, 
  });

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Optional: Perform success logic (e.g., toast, redirect)
  };

  const images = [
    { src: living, label: "Sofa / Sofa Chairs" },
    { src: c2, label: "Centre Table" },
    { src: c3, label: "Mandir" },
    { src: c4, label: "Cabinets and Sideboards" },
    { src: c10, label: "Wall Art and Paintings" },
    { src: c5, label: "Hanging Lights" },
    { src: c6, label: "Curtains" },
    { src: c7, label: "Recliners" },
    { src: c8, label: "TV & Media Units" },
    { src: c9, label: "Carpets" },

  ];

  const tabs = [
    { id: 'living', label: 'Living Room', icon: CounterTops },
    { id: 'kitchen', label: 'Kitchen', icon: KingBed },
    { id: 'office', label: 'Office', icon: Apartment },
    { id: 'study', label: 'Study', icon: LocalLibrary },
    { id: 'garden', label: 'Garden', icon: OuterGarden }
  ];


  const helpItems = [
    { image: Sofa, title: "Sofa", alt: "Sofa" },
    { image: Bed, title: "Bed", alt: "Bed" },
    { image: Mattress, title: "Mattress", alt: "Mattress" },
    { image: WardRobes, title: "Wardrobes", alt: "Wardrobes" },
    { image: Dining, title: "Dining table", alt: "Dining Table" },
  ];

  const promoData = [
    {
      image: LivingRoom,
      alt: "Living Room",
      titleLine1: "FURNITURE",
      titleLine2: "SALE",
      text: "Lorem Ipsum is simply dummy\ntext of the printing and\ntypesetting industry.",
      link: "shop.php",
      overlayPosition: "promo-overlay-left",
      titlePosition: "promo-title-left",
    },
    {
      image: Bedroom,
      alt: "Bedroom",
      titleLine1: "FURNITURE",
      titleLine2: "SALE",
      text: "Lorem Ipsum is simply dummy\ntext of the printing and\ntypesetting industry.",
      link: "shop.php",
      overlayPosition: "promo-overlay-right",
      titlePosition: "promo-title-right",
    }
  ];

  const features = [
    {
      icon: (
        <svg width="80" height="90" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50.8477" r="50" fill="#65C3BD" />
          <path
            d="M42.6854 75.5781L38.3036 68.1881L29.9647 66.3906L30.7823 57.7885L25.1589 51.3474L30.7823 44.9063L29.9647 36.3042L38.3036 34.5067L42.6854 27.1167L50.5 30.4183L58.3147 27.1167L62.6964 34.5067L71.0354 36.3042L70.2177 44.9063L75.8411 51.3474L70.2177 57.7885L71.0354 66.3906L62.6964 68.1881L58.3147 75.5781L50.5 72.2765L42.6854 75.5781ZM43.8063 72.2162L50.5 69.4297L57.224 72.2162L61 65.9162L68.2188 64.311L67.5625 56.8599L72.4188 51.3474L67.5625 45.8047L68.2188 38.3537L61 36.7787L57.1938 30.4787L50.5 33.2651L43.7761 30.4787L40 36.7787L32.7813 38.3537L33.4375 45.8047L28.5813 51.3474L33.4375 56.8599L32.7813 64.3412L40 65.9162L43.8063 72.2162ZM47.7438 58.849L60.7579 45.8349L58.9 43.9469L47.7438 55.1031L42.1 49.4896L40.2422 51.3474L47.7438 58.849Z"
            fill="white"
          />
        </svg>
      ),
      label: "Best in<br />Quality"
    },
    {
      icon: (
        <svg width="80" height="90" viewBox="0 0 100 101" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50.8477" r="50" fill="#65C3BD" />
          <mask id="mask0_0_1" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="19"
            y="19" width="63" height="64">
            <rect x="19" y="19.8477" width="63" height="63" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_0_1)">
            <path
              d="M47.875 74.9729V72.3479H76.75V74.9729H47.875ZM50.5 68.7136C50.5 65.6743 51.5063 63.0417 53.5188 60.8157C55.5313 58.5892 58.025 57.3213 61 57.012V55.9266C61 55.5867 61.1254 55.2828 61.376 55.0151C61.6267 54.7477 61.9389 54.6141 62.3125 54.6141C62.6525 54.6141 62.9561 54.7477 63.2234 55.0151C63.4911 55.2828 63.625 55.5867 63.625 55.9266V57.012C66.59 57.3213 69.0811 58.5892 71.0984 60.8157C73.1161 63.0417 74.125 65.6743 74.125 68.7136H50.5ZM53.6553 66.0729H70.889C70.361 64.1514 69.3169 62.5689 67.7568 61.3256C66.1971 60.0822 64.3823 59.4605 62.3125 59.4605C60.2326 59.4605 58.4019 60.0822 56.8204 61.3256C55.2384 62.5689 54.1833 64.1514 53.6553 66.0729ZM24.3511 51.1458V29.7422H34.8511V33.1442L54.8411 27.3193L73.2161 33.074V34.2854C73.2161 35.8001 72.6104 37.1042 71.399 38.198C70.1875 39.2917 68.7405 39.8386 67.0579 39.8386H60.3943V41.1104C60.3943 42.0021 60.0854 42.8206 59.4677 43.5661C58.8504 44.3116 58.1226 44.8476 57.2843 45.1739L41.0802 51.1458H24.3511ZM26.9761 48.5208H32.2261V32.3672H26.9761V48.5208ZM34.8511 48.5208H40.6661L56.3964 42.7412C56.8103 42.5999 57.1426 42.3549 57.3933 42.0062C57.6439 41.658 57.7693 41.255 57.7693 40.7974V39.8386H52.7063L45.0282 42.3822L44.1593 39.8688L52.3126 37.2136H67.0579C67.6533 37.2136 68.3305 37.0292 69.0896 36.6604C69.8487 36.292 70.2954 35.7259 70.4297 34.962L54.7099 30.1058L34.8511 35.9011V48.5208Z"
              fill="white" />
          </g>
        </svg>
      ),
      label: "24/7<br />Service"
    },
    {
      icon: (
        <svg width="80" height="90" viewBox="0 0 100 101" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50.8477" r="50" fill="#65C3BD" />
          <mask id="mask0_0_1" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="19"
            y="19" width="63" height="64">
            <rect x="19" y="19.8477" width="63" height="63" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_0_1)">
            <path
              d="M42.5036 49.6522L48.3245 43.7912L43.7912 39.2171L40.8275 42.1808L38.0614 39.4147L40.9844 36.451L36.9458 32.4125L31.0848 38.2735L42.5036 49.6522ZM63.5495 70.7375L69.4099 64.8765L65.3713 60.838L62.4083 63.7609L59.6422 60.9948L62.5652 58.0318L58.0167 53.5234L52.1958 59.3443L63.5495 70.7375ZM37.9053 73.6604H28.1875V63.9427L39.6975 52.4334L25.5625 38.2735L36.9458 26.8901L51.1713 41.0901L61.9896 30.2318C62.3969 29.8244 62.8445 29.5232 63.3323 29.3281C63.8201 29.133 64.33 29.0354 64.862 29.0354C65.3936 29.0354 65.9033 29.133 66.3911 29.3281C66.8793 29.5232 67.3269 29.8244 67.7338 30.2318L71.6162 34.2303C72.0235 34.6372 72.3203 35.0847 72.5067 35.573C72.6935 36.0608 72.7869 36.5705 72.7869 37.102C72.7869 37.634 72.6935 38.133 72.5067 38.5989C72.3203 39.0649 72.0235 39.5015 71.6162 39.9088L60.8484 50.7422L74.9578 64.9021L63.5745 76.2854L49.4146 62.1505L37.9053 73.6604ZM32.125 69.7229H36.2292L61.9791 44.013L57.8349 39.8688L32.125 65.6187V69.7229ZM59.9402 41.9485L57.8349 39.8688L61.9791 44.013L59.9402 41.9485Z"
              fill="white" />
          </g>
        </svg>
      ),
      label: "Custom<br />Design"
    }
  ];

  const cards = [
    {
      type: "imageOnly",
      image: New1,
      alt: "New Product 1",
      fullWidth: true
    },
    {
      type: "overlay",
      image: New2,
      alt: "Product 2",
      text: "Lorem Ipsum is simply dummy text of the printing",
      bgColor: "#ffc107",
      buttonText: "SHOP NOW",
      link: "#"
    },
    {
      type: "overlay",
      image: New3,
      alt: "Product 3",
      text: "Lorem Ipsum is simply dummy text of the printing",
      bgColor: "#00c1b6",
      buttonText: "SHOP NOW",
      link: "#"
    }
  ];

  const handleFormSubmit = (data) => {
    alert(`Name: ${data.name}, Mobile: ${data.mobile}`);
  };


  return (
    <>
      <Header />
      <section className="bg-light">
        <div className="container py-4">
          <div className="row g-4">
            {/* Left Banner Card */}

            <BannerSlider sliders={sliders} />

            {/* Right Product Grid */}
            <div className="col-md-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="rounded overflow-hidden">
                    <img
                      src={rightSliders?.image1 ? `${BASE_URL}${rightSliders.image3}` : S1}
                      className="img-fluid rounded "
                      alt="Sofa 1"
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="rounded overflow-hidden">
                    <img
                      src={rightSliders?.image2 ? `${BASE_URL}${rightSliders.image2}` : S2}
                      className="img-fluid rounded"
                      alt="Sofa 2"
                    />
                  </div>
                </div>

                {/* Sale Banner */}
                <div className="col-12">
                  <img
                    src={rightSliders?.image3 ? `${BASE_URL}${rightSliders.image1}` : S4}
                    alt="Sale Banner"
                    className="w-100 side-img"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <!-- -------SALE OFFER START's---------- --> */}

      {/* <SaleCarousel /> */}

      {/* <!-- -------SALE OFFER END's---------- --> */}

      <div className="container">
        <div className="row mb-4">
          <div className="col-md-7">
            <h2 className='h2_heading text-start'>Lorem Ipsum is simply dummy <br /> text of the printing</h2>
          </div>
          <div className="col-md-5">
            <p className="para-optima mt-4 text-start" >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </div>

      <FurnitureTabs tabs={tabs} images={images} />


      {/* <ProductGrid products={products} /> */}

      <div className="container-fluid py-5" style={{ backgroundColor: "#eaf8ff" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 mb-4 mb-md-0">
              <img src={Bg1} alt="Living Room" className="img-fluid rounded-4 shadow-sm" />
            </div>
            <div className="col-md-7 icon-boxs">
              <h2 className="h2_heading fw-bold text-dark text-start">
                Lorem Ipsum is simply<br />
                dummy text of the printing.
              </h2>
              <p className="mt-3 fs-5 text-dark text-start">Lorem Ipsum is simply dummy text of the printing.</p>


              {/* Icon Box 1 */}
              <IconFeatureGrid features={features} />

              <div className="mt-4 text-start">
                <Link to="/shop" className="btn btn-teal px-7 py-2.5 rounded-pill text-white">Shop Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FrontendPromotionsSection promotions={promotions} />




      {/* <ProductGrid products={products} /> */}

      <HelpSection title="Need Help Buying?" />

      <div className="container my-5">
        <div className="callback-container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="info-block mb-4 mb-md-0" style={{ maxWidth: "40%" }}>
            <h2 className="callback-heading">Lorem Ipsum is simply</h2>
            <p className="callback-text text-start">
              Lorem Ipsum is simply dummy text of <br /> the printing and typesetting industry.
            </p>
          </div>

          <CallbackForm onSubmit={handleFormSubmit} />
          <OtpLoginModal
            show={showLoginModal}
            onClose={handleCloseModal}
            onLoginSuccess={handleLoginSuccess}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}