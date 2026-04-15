import { component$, useSignal, $ } from '@builder.io/qwik';

export const EligibilityPreview = component$(() => {
  const step = useSignal(1);
  const zipCode = useSignal('');
  const householdSize = useSignal('1');
  const employmentStatus = useSignal('');
  const isLoading = useSignal(false);

  const nextStep = $(() => {
    if (step.value === 1 && !zipCode.value) return;
    if (step.value === 2 && !employmentStatus.value) return;
    step.value++;
  });

  const handleCheck = $(async () => {
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 800));
    isLoading.value = false;
    step.value = 4; // Result step
  });

  return (
    <div class="mt-12 mx-auto max-w-xl p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all duration-500 reveal">
      
      {/* Progress Bar Top */}
      <div class="absolute top-0 left-0 w-full h-1.5 bg-slate-50 dark:bg-slate-800">
        <div 
          class="h-full bg-blue-600 transition-all duration-500" 
          style={{ width: `${(step.value / 4) * 100}%` }} 
        />
      </div>

      {step.value === 1 && (
        <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <span class="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">Step 1 of 3</span>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-2">Where are you located?</h3>
            <p class="text-slate-500 dark:text-slate-400 mt-2">Aid programs vary by state and county.</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">ZIP Code</label>
            <input
              type="text"
              value={zipCode.value}
              onInput$={(e) => (zipCode.value = (e.target as HTMLInputElement).value)}
              placeholder="e.g. 90210"
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
            />
          </div>
          <button
            onClick$={nextStep}
            disabled={!zipCode.value}
            class="w-full py-4 bg-blue-700 hover:bg-blue-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-bold rounded-xl transition-all active:scale-95"
          >
            Continue
          </button>
        </div>
      )}

      {step.value === 2 && (
        <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <span class="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">Step 2 of 3</span>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-2">Current employment?</h3>
          </div>
          <div class="grid grid-cols-1 gap-3">
            {['Full-time', 'Part-time', 'Unemployed', 'Retired'].map(status => (
              <button 
                key={status}
                onClick$={() => employmentStatus.value = status}
                class={`p-4 text-left rounded-xl border transition-all ${
                  employmentStatus.value === status 
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-600 text-blue-700 dark:text-blue-400 font-bold' 
                    : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div class="flex gap-4">
            <button onClick$={() => step.value--} class="flex-1 py-4 text-slate-500 font-bold">Back</button>
            <button
              onClick$={nextStep}
              disabled={!employmentStatus.value}
              class="flex-[2] py-4 bg-blue-700 text-white font-bold rounded-xl active:scale-95 disabled:bg-slate-200"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step.value === 3 && (
        <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <span class="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">Step 3 of 3</span>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-2">Final details</h3>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Household Size</label>
            <select
              value={householdSize.value}
              onChange$={(e) => (householdSize.value = (e.target as HTMLSelectElement).value)}
              class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
            >
              {[1, 2, 3, 4, 5, '6+'].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div class="flex gap-4">
            <button onClick$={() => step.value--} class="flex-1 py-4 text-slate-500 font-bold">Back</button>
            <button
              onClick$={handleCheck}
              class="flex-[2] py-4 bg-blue-700 text-white font-bold rounded-xl active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading.value && <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              Analyze My Profile
            </button>
          </div>
        </div>
      )}

      {step.value === 4 && (
        <div class="text-center space-y-6 py-4 animate-in zoom-in duration-500">
          <div class="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-400">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <h3 class="text-3xl font-bold text-slate-900 dark:text-white">Profile Ready!</h3>
            <p class="text-slate-500 dark:text-slate-400 mt-2">We found <span class="text-blue-600 dark:text-blue-400 font-bold">12 matching programs</span> you may qualify for.</p>
          </div>
          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
            <p class="text-sm font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">Estimated Annual Aid</p>
            <p class="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mt-2">$6,120.00</p>
          </div>
          <button class="w-full py-4 bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/20 active:scale-95 transition-all">
            Secure Your Results
          </button>
        </div>
      )}
    </div>
  );
});
