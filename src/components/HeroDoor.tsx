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

      <div className="flex overflow-x-hidden pt-6 pb-8 max-md:mt-[0px] max-md:justify-center justify-between max-md:flex-col items-center">
        <div className="w-full relative max-md:w-[80%]">
          <Image
            className="z-50 absolute object-cover w-[200px] top-[30px] left-[-90px] float-top-left"
            src="/images/bag-s.png"
            alt="bag"
            width={1020}
            height={1000}
          />
          <Image
            className="z-50 absolute object-cover w-[200px] top-[30px] right-[-90px] float-top-right"
            src="/images/bed-s.png"
            alt="bed"
            width={1020}
            height={1000}
          />
          <Image
            src="/images/shoe-s.png"
            alt="shoe"
            className="z-50 absolute object-cover w-[120px] bottom-[30px] left-[-60px] float-bottom-left"
            width={1020}
            height={1000}
          />
          <Image
            src="/images/watch-s.png"
            alt="shoe"
            className="z-50 absolute object-cover w-[120px] bottom-[30px] right-[-60px] float-bottom-right"
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
    </>
  );
};

export default HeroDoor;
