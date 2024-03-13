import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { useEffect, useState } from "react";

const Testimonials = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(response => response.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <section>
            <SectionTitle subHeading={'What Our Clients Say'} heading={'testimonials'}></SectionTitle>

            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
            >
                {
                    reviews.map((review => <SwiperSlide
                        key={review._id}
                    >
                        <div className=" flex flex-col items-center  my-10 ">
                            <Rating
                                className=" mb-8"
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p>{review.details}</p>
                            <h3 className="text-2xl text-orange-400 ">{review.name}</h3>
                        </div>
                    </SwiperSlide>))
                }

            </Swiper>

        </section>
    );
};

export default Testimonials;