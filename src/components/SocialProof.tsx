import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const SocialProof = component$(() => {
  const count = useSignal(0);
  const target = 12480;

  useVisibleTask$(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        count.value = target;
        clearInterval(timer);
      } else {
        count.value = Math.floor(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  });

  return (
    <div class="py-12 bg-white dark:bg-slate-950">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div class="reveal">
            <p class="text-4xl font-bold text-blue-700 dark:text-blue-500">{count.value.toLocaleString()}+</p>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest">Applications Processed</p>
          </div>
          <div class="reveal reveal-delay-1 border-y md:border-y-0 md:border-x border-slate-100 dark:border-slate-800 py-8 md:py-0">
            <p class="text-4xl font-bold text-blue-700 dark:text-blue-500">98%</p>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest">Success Rate</p>
          </div>
          <div class="reveal reveal-delay-2">
            <p class="text-4xl font-bold text-blue-700 dark:text-blue-500">24/7</p>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-widest">AI Support</p>
          </div>
        </div>
      </div>
    </div>
  );
});
