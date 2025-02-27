import React from 'react';
import './review.css';
// import images from '../../assets/assets';
import ReviewImg1 from '../../assets/onepic.jpg';
import ReviewImg2 from '../../assets/twopic.jpg';
import ReviewImg3 from '../../assets/threepic.jpg';
import ReviewImg4 from '../../assets/fourpic.jpg';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Karthik',
      rating: 5,
      text: 'The ambience of Campfire Restaurant is absolutely wonderful, and the food quality is exceptional. A must-visit!',
      image: ReviewImg1,
    },
    {
      name: 'Chaithra',
      rating: 5,
      text: 'The service was fast and friendly, and the dishes were a perfect blend of flavors. Highly recommended!',
      image: ReviewImg2,
    },
    {
      name: 'Bhavya',
      rating: 5,
      text: 'Campfire Restaurant delivers a perfect blend of delicious food, cozy ambiance, and excellent service. A great place for families!',
      image: ReviewImg3,
    },
    {
      name: 'Hemesh',
      rating: 5,
      text: 'The open-air dining experience is so refreshing, and the food was top-notch. Perfect for small celebrations!',
      image: ReviewImg1,
    },
    {
      name: 'Meghana',
      rating: 5,
      text: 'The dishes were delicious, though the waiting time was slightly longer during peak hours. Overall, a great experience!',
      image: ReviewImg3,
    },
    {
      name: 'Varun',
      rating: 5,
      text: 'Amazing place! The staff was very welcoming, and the restaurant had a warm and cozy atmosphere. Loved it!',
      image: ReviewImg4,
    },
  ];

  return (
    <div id="Reviews">
      <div className="testimonials-container">
      <h1 className="testimonials-title">Our Happy Customers</h1>
        <p className="testimonials-subtitle">
          Akshaya Restaurant in Madanapalle is a popular spot offering Indian,
          Chinese, and continental dishes known for its open-air dining and cozy
          ambiance. It's a great place for casual meals or small celebrations.
        </p>

        <div className="testimonials-grid md:ml-20 md:mr-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-image md:mt-[-40px]">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div className="testimonial-content">
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">
                      ★
                    </span>
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-name">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="testimonials-footer">
          Gather 'round the AKSHAYA, where stories ignite and warmth connects us
          all.
        </p>
      </div>
    </div>
  );
};

export default TestimonialsSection;
