import { component$, useSignal, $ } from '@builder.io/qwik';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How accurate is the eligibility engine?",
    answer: "Our AI model is trained on thousands of federal and state guidelines. While results are highly accurate, they should be used as a primary guide for official submission."
  },
  {
    question: "Is my personal data safe?",
    answer: "We use SOC2-compliant data vaults and 256-bit AES encryption. Your data is only used to determine eligibility and assist in your application process."
  },
  {
    question: "How long does the application process take?",
    answer: "Initial assessment takes less than 2 minutes. Once documents are uploaded, most applications are processed by agencies within 5-10 business days."
  },
  {
    question: "Can I get help from a real person?",
    answer: "Yes! While our AI Guide is available 24/7, you can request a review from a certified benefits specialist at any step of the way."
  }
];

export const FAQ = component$(() => {
  const openIndex = useSignal<number | null>(null);

  const toggle = $((index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
  });

  return (
    <section id="faq" class="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <div class="text-center mb-16 reveal">
          <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p class="mt-4 text-lg text-slate-500 dark:text-slate-400">Everything you need to know about navigating the aid landscape.</p>
        </div>
        
        <div class="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              class={`reveal reveal-delay-${i} rounded-2xl border transition-all duration-300 ${
                openIndex.value === i 
                  ? 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-900 shadow-xl' 
                  : 'bg-white/50 dark:bg-slate-950/50 border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900'
              }`}
            >
              <button
                onClick$={() => toggle(i)}
                class="w-full flex items-center justify-between p-6 text-left"
              >
                <span class="text-lg font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                <span class={`ml-6 flex-shrink-0 transition-transform duration-300 ${openIndex.value === i ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div 
                class={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex.value === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div class="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
