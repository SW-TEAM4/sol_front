import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import footBannerImage from '../../images/footbanner.svg';
import footBanner2 from '../../images/footbanner2.svg';
import footBanner3 from '../../images/footbanner3.svg';

// Swiper 스타일시트 가져오기
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

function FootBanner() {
    const bannerImages = [footBannerImage, footBanner2, footBanner3];

    return (
        <footer className="footer-info">
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 5000, // 5초마다 자동 슬라이드
                    disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
                }}
                loop={true} // 무한 루프
                className="footer-banner-swiper"
            >
                {bannerImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`Footer Banner ${index + 1}`}
                            className="footer-banner-image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </footer>
    );
}

export default FootBanner;
