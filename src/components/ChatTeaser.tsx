import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const ChatTeaser = component$(() => {
  const isVisible = useSignal(false);
  const showBubble = useSignal(false);

  useVisibleTask$(() => {
    // Show teaser after 2 seconds
    const timer1 = setTimeout(() => {
      isVisible.value = true;
    }, 2000);

    // Show speech bubble after 4 seconds
    const timer2 = setTimeout(() => {
      showBubble.value = true;
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  });

  return (
    <div 
      class={`fixed bottom-6 right-6 z-[60] transition-all duration-500 transform ${
        isVisible.value ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div class="relative flex flex-col items-end">
        {/* Speech Bubble */}
        <div 
          class={`mb-4 px-6 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-bold rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 max-w-[220px] transition-all duration-300 transform origin-bottom-right ${
            showBubble.value ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          Need help? Ask our <span class="text-blue-700 dark:text-blue-400">AI Guide</span>!
          <button 
            onClick$={() => showBubble.value = false}
            class="absolute -top-2 -right-2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Floating Button */}
        <button 
          class="flex items-center justify-center w-16 h-16 bg-blue-700 text-white rounded-2xl shadow-2xl shadow-blue-300 dark:shadow-blue-900/40 hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all group overflow-hidden"
          aria-label="Open AI Assistant"
        >
          <div class="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-transparent" />
          <svg class="w-8 h-8 group-hover:animate-bounce relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
});
