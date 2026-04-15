import { component$, $, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const CTASection = component$(() => {
  const ctaText = useSignal('Start Your Discovery');
  const isClicked = useSignal(false);

  useVisibleTask$(() => {
    const timer = setTimeout(() => {
      if (!isClicked.value) {
        ctaText.value = 'Ready to Apply?';
      }
    }, 5000);
    return () => clearTimeout(timer);
  });

  const scrollToHowItWorks = $((e: Event) => {
    e.preventDefault();
    isClicked.value = true;
    ctaText.value = 'Assessment Started!';
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
      <button
        onClick$={scrollToHowItWorks}
        class={`rounded-2xl px-8 py-4 text-lg font-bold text-white shadow-xl transition-all active:scale-95 min-w-[240px] flex items-center justify-center gap-3 ${
          isClicked.value 
            ? 'bg-green-600 hover:bg-green-500 ring-4 ring-green-100 dark:ring-green-900/30' 
            : 'bg-blue-700 hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 shadow-blue-200 dark:shadow-blue-900/20'
        }`}
      >
        {isClicked.value && (
          <svg class="h-6 w-6 animate-in zoom-in duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {ctaText.value}
      </button>
      <a
        href="#how-it-works"
        onClick$={scrollToHowItWorks}
        class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 group transition-all hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer"
      >
        Explore programs <span class="group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true">→</span>
      </a>
    </div>
  );
});
