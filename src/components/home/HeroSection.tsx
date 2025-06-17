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
          dots: false,
        }
      }
    ]
  };

  const bannerImages = [
    {
      src: "/Banner_efootball.jpg",
      alt: "eFootball Banner"
    },
    {
      src: "/Banner_coin.jpg", 
      alt: "Coin Banner"
    }
  ];

  return (
    <section className={`relative w-full ${className || ""}`}>
      <div className="hero-slider">
        <Slider {...settings}>
          {bannerImages.map((banner, index) => (
            <div key={index} className="relative">
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-gray-100">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="w-full h-full object-contain md:object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx global>{`
        .hero-slider {
          width: 100%;
          overflow: hidden;
        }
        
        .hero-slider .slick-slide {
          outline: none;
        }
        
        .hero-slider .slick-slide > div {
          width: 100%;
        }
        
        .hero-slider .slick-dots {
          bottom: 15px;
          z-index: 10;
        }
        
        .hero-slider .slick-dots li button:before {
          font-size: 10px;
          color: white;
          opacity: 0.7;
        }
        
        .hero-slider .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #fbbf24;
        }
        
        .hero-slider .slick-prev,
        .hero-slider .slick-next {
          z-index: 10;
          width: 30px;
          height: 30px;
        }
        
        .hero-slider .slick-prev {
          left: 10px;
        }
        
        .hero-slider .slick-next {
          right: 10px;
        }
        
        .hero-slider .slick-prev:before,
        .hero-slider .slick-next:before {
          font-size: 18px;
          color: white;
          opacity: 0.8;
        }
        
        .hero-slider .slick-prev:hover:before,
        .hero-slider .slick-next:hover:before {
          opacity: 1;
          color: #fbbf24;
        }
        
        @media (min-width: 768px) {
          .hero-slider .slick-dots {
            bottom: 20px;
          }
          
          .hero-slider .slick-dots li button:before {
            font-size: 12px;
          }
          
          .hero-slider .slick-prev,
          .hero-slider .slick-next {
            width: 40px;
            height: 40px;
          }
          
          .hero-slider .slick-prev {
            left: 20px;
          }
          
          .hero-slider .slick-next {
            right: 20px;
          }
          
          .hero-slider .slick-prev:before,
          .hero-slider .slick-next:before {
            font-size: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .hero-slider .slick-dots {
            bottom: 10px;
          }
          
          .hero-slider .slick-dots li {
            margin: 0 2px;
          }
          
          .hero-slider .slick-dots li button:before {
            font-size: 8px;
          }
        }
      `}</style>
    </section>
  );
});
