"use client";

import { useEffect } from "react";

export default function ServiceSection() {
  useEffect(() => {
    // Swiper initialization
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
    document.head.appendChild(link);

    script.onload = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.Swiper) {
        // @ts-ignore
        new window.Swiper(".serviceSwiper", {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination-service",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next-service",
            prevEl: ".swiper-button-prev-service",
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          },
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const services = [
    {
      title: "エネルギー事業",
      description: "太陽光発電システムと蓄電池の提案・販売",
      image: "/images/service_slide01.jpg",
      link: "/service",
    },
    {
      title: "農業",
      description: "安全で美味しい食材の生産と供給",
      image: "/images/service_slide02.webp",
      link: "/service",
    },
    {
      title: "住宅",
      description: "新築住宅の提案とリフォーム・リノベーション",
      image: "/images/service_slide03.webp",
      link: "/service",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-32">
      <h2 className="text-6xl font-bold mb-24 text-center text-white tracking-wide font-noto-sans">
        SERVICE
      </h2>
      <div className="swiper serviceSwiper relative">
        <div className="swiper-wrapper">
          {services.map((service, index) => (
            <div key={index} className="swiper-slide">
              <a href={service.link}>
                <div
                  className="rounded-lg overflow-hidden relative"
                  style={{ height: "400px" }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center flex-col">
                    <h2 className="font-noto-serif-jp text-4xl text-white text-center">
                      {service.title}
                    </h2>
                    <p className="text-white text-center p-4 text-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="swiper-pagination-service mt-8"></div>
        <div className="swiper-button-prev-service"></div>
        <div className="swiper-button-next-service"></div>
      </div>
    </section>
  );
}
