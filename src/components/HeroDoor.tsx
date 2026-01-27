'use client'
import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io';
import { FaFacebook } from 'react-icons/fa';
import Image from 'next/image';

const HeroDoor = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes floatTopLeft {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(-10px, -10px) rotate(5deg);
            opacity: 1;
          }
        }

        @keyframes floatTopRight {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(10px, -10px) rotate(-5deg);
            opacity: 1;
          }
        }

        @keyframes floatBottomLeft {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(-10px, 10px) rotate(-5deg);
            opacity: 1;
          }
        }

        @keyframes floatBottomRight {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(10px, 10px) rotate(5deg);
            opacity: 1;
          }
        }

        .float-top-left {
          animation: floatTopLeft 3s ease-in-out infinite;
        }

        .float-top-right {
          animation: floatTopRight 3s ease-in-out infinite;
        }

        .float-bottom-left {
          animation: floatBottomLeft 3s ease-in-out infinite;
        }

        .float-bottom-right {
          animation: floatBottomRight 3s ease-in-out infinite;
        }
      `}</style>

      {/* Mobile Version - Keep exactly as is */}
      <div className="flex overflow-x-hidden pt-6 pb-8 max-md:mt-[0px] max-md:justify-center justify-between max-md:flex-col items-center md:hidden">
        <div className="w-full relative max-md:w-[80%]">
          <Image
            className="z-50 absolute object-cover w-[190px] top-[30px] left-[-80px] float-top-left"
            src="/images/bag-s.svg"
            alt="bag"
            width={1020}
            height={1000}
          />
          <Image
            className="z-50 absolute object-cover w-[160px] top-[40px] right-[-70px] float-top-right"
            src="/images/make-up.svg"
            alt="bed"
            width={1020}
            height={1000}
          />
          <Image
            src="/images/shoe-s.svg"
            alt="shoe"
            className="z-50 absolute object-cover w-[120px] bottom-[45px] left-[-45px] float-bottom-left"
            width={1020}
            height={1000}
          />
          <Image
            src="/images/watch-s.svg"
            alt="shoe"
            className="z-50 absolute object-cover w-[120px] bottom-[30px] right-[-50px] float-bottom-right"
            width={1020}
            height={1000}
          />

          <div className="custome-shadow-1"></div>
          <div className="custome-shadow-2"></div>
          <div className="custome-shadow-3"></div>
          <div className="custome-shadow-4"></div>

          <div className="shadow-white z-50 p-[10px] rounded-t-[900px] h-[100%] w-full rounded-b-[5px] bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-[5px]">
            <div className="bg-white flow-root rounded-t-[900px] w-full rounded-b-[5px]">
              <h2 className="text-center mt-[60px] bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text text-[20px] mb-2">
                #dont_miss_out
              </h2>
              <h1 className="text-center text-[#0D1D0E] leading-[85%] hero-title text-[56px] mt-[35px] font-bold">
                <span>Buy</span> <br />
                <span>Now Or</span> <br />
                <span>Never</span>
              </h1>
              <p className="text-[16px] pera-details text-black font-medium font-sans my-3 px-[6px] text-center mx-auto whitespace-normal">
                <span className="font-bold bg-[#5c1d64] mr-1 inline-block animate-pulse text-white py-[2px] px-[4px]">
                  মাথা নষ্ট করা
                </span>
                exclusive
                <span className="font-bold bg-[#5c1d64] mx-1 inline-block animate-pulse text-white py-[2px] px-[4px]">
                  pre-order
                </span>
                drops of trendy {"women's"} bags, shoes, watches, and more at
                Fashion Palette BD. Handpicked from
                <span className="font-bold bg-[#5c1d64] mx-1 inline-block animate-pulse text-white py-[2px] px-[4px]">
                  China
                </span>
                , delivered to you. Join our Facebook group
              </p>
              <div className="flex justify-center gap-4 items-center flex-col">
                <a
                  href="https://www.facebook.com/share/g/gS9Vopqx9x6sF3eU/"
                  className="text-center relative z-[1000] font-sans bg-[#8B34AA] flex gap-2 items-center text-[#fff] px-[30px] py-[17px] rounded-full leading-[85%] text-[20px] uppercase mt-[15px] font-bold"
                >
                  <span>Join fb Group</span>
                  <FaFacebook />
                </a>
                <a
                  href="https://wa.me/8801943415089?text=Is%20someone%20available%20for%20chat%3F"
                  className="text-center relative z-[1000] font-sans bg-[#000000] flex gap-2 items-center text-[#fff] px-[30px] py-[17px] rounded-full leading-[85%] text-[20px] uppercase mb-[25px] font-bold"
                >
                  <span>Call Now</span>
                  <IoLogoWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Version - Completely New Design */}
      <div className="hidden md:flex mt-5 relative min-h-[90vh] items-center justify-center overflow-hidden px-8 lg:px-16 py-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-purple-50"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          <Image
            className="absolute object-cover w-[280px] lg:w-[320px] top-[10%] left-[5%] float-top-left opacity-90"
            src="/images/bag-s.svg"
            alt="bag"
            width={1020}
            height={1000}
          />
          <Image
            className="absolute object-cover w-[240px] lg:w-[280px] top-[8%] right-[8%] float-top-right opacity-90"
            src="/images/make-up.svg"
            alt="makeup"
            width={1020}
            height={1000}
          />
          <Image
            src="/images/shoe-s.svg"
            alt="shoe"
            className="absolute object-cover w-[200px] lg:w-[240px] bottom-[15%] left-[8%] float-bottom-left opacity-90"
            width={1020}
            height={1000}
          />
          <Image
            src="/images/watch-s.svg"
            alt="watch"
            className="absolute object-cover w-[200px] lg:w-[240px] bottom-[12%] right-[6%] float-bottom-right opacity-90"
            width={1020}
            height={1000}
          />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-6xl w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-transparent bg-clip-text text-2xl lg:text-3xl font-bold mb-4 tracking-wider uppercase">
              #dont_miss_out
            </h2>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-3xl lg:rounded-[40px] shadow-2xl p-10 lg:p-12 border border-white/50">
            <h1 className="text-center text-[#0D1D0E] leading-[1.05] text-6xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tight">
              <span className="block bg-gradient-to-r from-[#0D1D0E] via-[#5c1d64] to-[#0D1D0E] text-transparent bg-clip-text">
                Buy
              </span>
              <span className="block bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF6347] text-transparent bg-clip-text">
                Now Or
              </span>
              <span className="block bg-gradient-to-r from-[#8B34AA] via-[#5c1d64] to-[#8B34AA] text-transparent bg-clip-text">
                Never
              </span>
            </h1>

            <p className="text-base lg:text-lg text-gray-700 font-medium max-w-4xl mx-auto mb-8 leading-relaxed text-center">
              <span className="font-bold bg-gradient-to-r from-[#5c1d64] to-[#8B34AA] text-white py-1.5 px-3 rounded-lg mr-2 inline-block animate-pulse shadow-lg">
                মাথা নষ্ট করা
              </span>
              exclusive
              <span className="font-bold bg-gradient-to-r from-[#5c1d64] to-[#8B34AA] text-white py-1.5 px-3 rounded-lg mx-2 inline-block animate-pulse shadow-lg">
                pre-order
              </span>
              drops of trendy {"women's"} bags, shoes, watches, and more at
              Fashion Palette BD. Handpicked from
              <span className="font-bold bg-gradient-to-r from-[#5c1d64] to-[#8B34AA] text-white py-1.5 px-3 rounded-lg mx-2 inline-block animate-pulse shadow-lg">
                China
              </span>
              , delivered to you. Join our Facebook group
            </p>

            <div className="flex justify-center gap-5 items-center flex-wrap">
              <a
                href="https://www.facebook.com/share/g/gS9Vopqx9x6sF3eU/"
                className="group relative z-[1000] font-sans bg-gradient-to-r from-[#8B34AA] to-[#6e2987] hover:from-[#6e2987] hover:to-[#5c1d64] transition-all duration-300 flex gap-3 items-center text-white px-9 py-4 rounded-full text-lg lg:text-xl uppercase font-bold shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <span>Join fb Group</span>
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://wa.me/8801943415089?text=Is%20someone%20available%20for%20chat%3F"
                className="group relative z-[1000] font-sans bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black transition-all duration-300 flex gap-3 items-center text-white px-9 py-4 rounded-full text-lg lg:text-xl uppercase font-bold shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <span>Call Now</span>
                <IoLogoWhatsapp className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroDoor;
