"use client";

import { memo } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection = memo(function HeroSection({
  className,
}: HeroSectionProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,  // ← Thay đổi từ false thành true
        }
      }
    ]
  };

  const bannerImages = [
    {
      src: "/Banner_1.png",
      alt: "eFootball Banner"
    },
    {
      src: "/Banner_2.png", 
      alt: "Coin Banner"
    }
  ];

  return (
    <section className={`relative w-full py-4 md:pt-8 ${className || ""}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="hero-slider relative pb-2 md:pb-2">
          <div className="rounded-xl md:rounded-2xl">
            <Slider {...settings}>
              {bannerImages.map((banner, index) => (
                <div key={index} className="relative">
                  <div className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] xl:h-[460px]">
                    <Image
                      src={banner.src}
                      alt={banner.alt}
                      fill
                      className="w-full h-full object-cover rounded-xl"
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hero-slider {
          width: 100%;
          position: relative;
        }
        
        .hero-slider .slick-slide {
          outline: none;
        }
        
        .hero-slider .slick-slide > div {
          width: 100%;
        }
        
        .hero-slider .slick-dots {
          bottom: -25px;
          position: absolute;
          z-index: 10;
          display: flex !important;
          justify-content: center;
          width: 100%;
          left: 50%;
          transform: translateX(-50%);
          gap: 8px;
        }
        
        .hero-slider .slick-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }
        
        .hero-slider .slick-dots li button {
          width: 40px;
          height: 4px;
          padding: 0;
          border: none;
          border-radius: 2px;
          background: #e2e8f0;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .hero-slider .slick-dots li button:before {
          display: none;
        }
        
        .hero-slider .slick-dots li.slick-active button {
          background: #1e293b;
          width: 40px;
          height: 4px;
        }
        
        .hero-slider .slick-dots li button:hover {
          background: #64748b;
        }
        
        .hero-slider .slick-dots li.slick-active button:hover {
          background: #0f172a;
        }
        
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .hero-slider .slick-dots {
            bottom: -20px;
            gap: 6px;
          }
          
          .hero-slider .slick-dots li button {
            width: 30px;
            height: 3px;
          }
          
          .hero-slider .slick-dots li.slick-active button {
            width: 30px;
            height: 3px;
          }
          
        }
        
        /* Tablet và Desktop */
        @media (min-width: 768px) {
          .hero-slider .slick-dots {
            bottom: -35px;
            gap: 10px;
          }
          
          .hero-slider .slick-dots li button {
            width: 45px;
            height: 4px;
          }
          
          .hero-slider .slick-dots li.slick-active button {
            width: 45px;
            height: 4px;
          }
        }
        
        @media (min-width: 1024px) {
          .hero-slider .slick-dots {
            bottom: -20px;
            gap: 12px;
          }
          
          .hero-slider .slick-dots li button {
            width: 50px;
            height: 4px;
          }
          
          .hero-slider .slick-dots li.slick-active button {
            width: 50px;
            height: 4px;
          }

        }
      `}</style>
    </section>
  );
});