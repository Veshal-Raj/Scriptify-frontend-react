import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Paul Starr',
    rating: 5,
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt, a consequuntur recusandae ab saepe illo est quia obcaecati neque quibusdam eius accusamus error officiis atque voluptates magnam!'
  },
  {
    id: 2,
    name: 'Jane Doe',
    rating: 4,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec elit a nibh aliquam ultrices id in arcu. Aenean pretium ante vel urna facilisis, eget suscipit mauris aliquet.'
  },
  {
    id: 3,
    name: 'John Smith',
    rating: 4,
    content: 'Fusce et nisi nulla. Aliquam eleifend, nulla nec dignissim facilisis, eros ligula tempus enim, nec hendrerit purus turpis ut nibh. Ut consectetur orci non magna ullamcorper efficitur.'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    rating: 5,
    content: 'Sed ac justo vestibulum, placerat felis sit amet, dapibus sem. Ut congue diam non risus volutpat, et aliquet mi lacinia. Donec sit amet lacinia libero, at accumsan ipsum.'
  },
  {
    id: 5,
    name: 'David Brown',
    rating: 3,
    content: 'Vivamus eu nisi arcu. Cras pellentesque vehicula semper. Donec fringilla sem sed nunc posuere, at tincidunt ligula ullamcorper. Maecenas hendrerit bibendum mi sed ullamcorper.'
  },
  {
    id: 6,
    name: 'Emily Wilson',
    rating: 5,
    content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut ut efficitur dolor, vel lobortis justo. Aliquam eget metus non nisi ultrices pretium.'
  },
  {
    id: 7,
    name: 'Michael Lee',
    rating: 4,
    content: 'Suspendisse rutrum dapibus libero vel dapibus. Integer et velit auctor, maximus nibh sed, placerat tortor. Phasellus at enim vestibulum, venenatis magna in, auctor ipsum.'
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    rating: 5,
    content: 'Quisque pharetra urna at ex aliquam, a dictum turpis sollicitudin. Praesent bibendum tempor mi vel mattis. Integer rhoncus mauris nec enim ullamcorper, nec facilisis nunc finibus.'
  },
  {
    id: 9,
    name: 'Mark Taylor',
    rating: 4,
    content: 'Nulla facilisi. Nulla vel aliquam velit. In ac aliquet urna. Proin nec eros vel dui aliquam consequat. Nullam fermentum felis quis velit placerat, sit amet mattis enim lacinia.'
  },
  // {
  //   id: 10,
  //   name: 'Anna Martinez',
  //   rating: 5,
  //   content: 'Aenean convallis fringilla lorem sit amet feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi at tempus neque.'
  // },
];

const TestimonialSlider = () => {
  return (
    <div>
     <section className='bg-white'>
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, borderColor: '#6B46C1' }} // Scale and border color effect on hover
                className="testimonial-container"
              >
                <blockquote className="rounded-lg  p-6 shadow-sm sm:p-8" style={{backgroundColor: '#F1F5F9'}}> {/* Updated background color */}
                  <div className="flex items-center gap-4">
                    <img
                      alt=""
                      src={`https://source.unsplash.com/100x100/?portrait,${testimonial.name}`}
                      className="size-14 rounded-full object-cover"
                    />

                    <div>
                      <div className="flex justify-center gap-0.5 text-green-500">
                        {[...Array(testimonial.rating)].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        ))}
                      </div>

                      <p className="mt-0.5 text-lg font-medium text-gray-900">{testimonial.name}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-700">{testimonial.content}</p>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSlider;
