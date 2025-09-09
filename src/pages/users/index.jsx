
import React, { useEffect, useMemo, useState, Suspense } from 'react';
import Header from '../../includes/header';
import Footer from '../../includes/footer';
import '../../css/user/userstyle.css';
import '../../css/user/bootstrap-icons.css';
import '../../css/user/bootstrap.min.css';
import S1 from '../../img/s1.png';
import S2 from '../../img/s2.png';
import S4 from '../../img/s4.png';
import Bg1 from '../../img/bg1.png';
import FurnitureTabs from '../../components/furnitureTabs';
import HelpSection from '../../components/helpSection';
import IconFeatureGrid from '../../components/iconFeaturedGrid';
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
import { fetchHomeTabs } from '../../redux/actions/homeCategoryAction';
import { fetchNeedHelpItems } from '../../redux/actions/categoryAction';
import SaleCarousel from '../../components/projectCarousel';

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
  const { promotions: blocks } = useSelector((state) => state.frontendPromotions);
  const { homeTabs } = useSelector(state => state.homeCategories);

  useEffect(() => {
    const fetchAll = () => {
      dispatch(fetchSliders());
      dispatch(fetchRightSliders());
      dispatch(fetchFrontendPromotions(8));
      dispatch(fetchHomeTabs());
      dispatch(fetchNeedHelpItems());
    };
    fetchAll();
    const throttledFetch = () => fetchAll();
    window.addEventListener("focus", throttledFetch);

    return () => {
      window.removeEventListener("focus", fetchAll);
    };
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


  const handleFormSubmit = (data) => {
    alert(`Name: ${data.name}, Mobile: ${data.mobile}`);
  };
  const offersBlock = useMemo(
    () => blocks?.find((block) => block.title.toLowerCase() === "offers"),
    [blocks]
  );


  return (
    <>
      <Suspense fallback={<p>Loading homepage...</p>}>
        <Header />
        <section className="bg-light section-index">
          <div className="container py-4">
            <div className="row g-4">
              {/* Left Banner Card */}
              <Suspense fallback={<p>Loading tabs...</p>}>
                <BannerSlider sliders={sliders} />
              </Suspense>

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
        <Suspense fallback={<p>Loading offers...</p>}>
          <SaleCarousel
            promotions={offersBlock?.promotions?.map((promo) => ({
              id: promo.id,
              image: `${BASE_URL}${promo.imageUrl}`,
              title: promo.title,
              link: `/category/${promo.categoryId}`,
            })) || []}
          />
        </Suspense>
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

        <Suspense fallback={<p>Loading tabs...</p>}>
          <FurnitureTabs homecategories={homeTabs} />
        </Suspense>


        {/* <ProductGrid products={products} /> */}

        <div className="container-fluid py-5 bg-2" >
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
                {/* <IconFeatureGrid features={features} /> */}

                <div className="mt-4 text-start">
                  <Link to="" className="btn btn-teal px-7 py-2.5 rounded-pill text-white">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={<p>Loading promotions...</p>}>
          <FrontendPromotionsSection promotions={promotions} />
        </Suspense>
        <Suspense fallback={<p>Loading help section...</p>}>
          <HelpSection title="Need Help Buying?" />
        </Suspense>

        <Footer />
      </Suspense>
    </>

  )
}