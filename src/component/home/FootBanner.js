import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import footBanner1 from '../../images/footbanner1.svg';
import footBanner2 from '../../images/footbanner2.svg';
import footBanner3 from '../../images/footbanner3.svg';

// Swiper 스타일시트 가져오기
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function FootBanner() {
    const bannerImages = [footBanner1, footBanner2, footBanner3];

    return (
        <footer className="footer-info">
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20} // 슬라이드 간 간격 추가
                slidesPerView={1}
                speed={800} // 트랜지션 속도 조정
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                watchOverflow={true} // 오버플로우 감시 추가
                className="footer-banner-swiper"
            >
                {bannerImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="banner-wrapper">
                            <img
                                src={image}
                                alt={`Footer Banner ${index + 1}`}
                                className="footer-banner-image"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </footer>
    );
}

export default FootBanner;
