'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Add navigation styles

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { videos } from '@/constants/VideoLinks';
import { FacebookVideo } from './FacebookVideo';
import Container from '../Container';

export default function SwiperSlider() {
  return (
    <div>
      <Container>
        <h2 className="text-3xl font-bold mt-10 mb-5 text-white">
          Product Lives
        </h2>
        <div className="w-full mt-10 mb-20 overflow-hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            navigation={true} // Enable navigation
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              '@1.50': {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {videos.map((video) => (
              <SwiperSlide key={video.id}>
                <div className="w-full p-20 h-full flex items-center justify-center">
                  <FacebookVideo videoId={video.url} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
}
