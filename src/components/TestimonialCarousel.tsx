import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel = component$<TestimonialCarouselProps>(({ testimonials }) => {
  const currentIndex = useSignal(0);
  const isPaused = useSignal(false);

  const next = $(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.length;
  });

  const prev = $(() => {
    currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length;
  });

  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      if (!isPaused.value) {
        next();
      }
    }, 5000);
    cleanup(() => clearInterval(interval));
  });

  return (
    <div 
      class="relative overflow-hidden py-16 px-4 sm:px-12 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800"
      onMouseEnter$={() => isPaused.value = true}
      onMouseLeave$={() => isPaused.value = false}
    >
      <div 
        class="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)" 
        style={{ transform: `translateX(-${currentIndex.value * 100}%)` }}
      >
        {testimonials.map((t, i) => (
          <div key={i} class="min-w-full px-4">
            <div class="max-w-3xl mx-auto text-center">
              <svg class="h-16 w-16 text-blue-50 dark:text-blue-900/30 mx-auto mb-8" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p class="text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white leading-relaxed italic">
                "{t.quote}"
              </p>
              <div class="mt-10">
                <p class="text-lg font-bold text-slate-900 dark:text-white">{t.author}</p>
                <p class="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div class="absolute inset-y-0 left-0 flex items-center">
        <button 
          onClick$={prev}
          class="p-4 ml-4 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-750 shadow-sm transition-all focus:outline-none group"
          aria-label="Previous testimonial"
        >
          <svg class="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center">
        <button 
          onClick$={next}
          class="p-4 mr-4 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-750 shadow-sm transition-all focus:outline-none group"
          aria-label="Next testimonial"
        >
          <svg class="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div class="mt-12 flex justify-center gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick$={() => currentIndex.value = i}
            class={`h-2 transition-all duration-300 rounded-full ${
              currentIndex.value === i ? 'bg-blue-600 w-8' : 'bg-slate-200 dark:bg-slate-700 w-2 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
});
