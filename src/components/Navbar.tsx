import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavLink[];
}

export const Navbar = component$<NavbarProps>(({ links }) => {
  const isScrolled = useSignal(false);
  const activeSection = useSignal('');
  const scrollProgress = useSignal(0);
  const isDark = useSignal(false);

  // Scroll detection, progress, and active section
  useVisibleTask$(() => {
    isDark.value = document.documentElement.classList.contains('dark');

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollProgress.value = (winScroll / height) * 100;
      isScrolled.value = window.scrollY > 20;

      const sections = links
        .map(link => link.href.startsWith('#') ? link.href.substring(1) : null)
        .filter(Boolean);

      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id!);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = `#${id}`;
          }
        }
      }
      activeSection.value = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  });

  const toggleTheme = $(() => {
    const isDarkNow = document.documentElement.classList.contains('dark');
    if (isDarkNow) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      isDark.value = false;
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      isDark.value = true;
    }
  });

  return (
    <header 
      class={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled.value 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg border-b border-slate-100 dark:border-slate-800' 
          : 'bg-white dark:bg-slate-950 border-b border-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        class="absolute top-0 left-0 h-[2px] bg-blue-600 transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress.value}%` }} 
      />

      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" class="flex items-center gap-2 group">
          <span class="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-500 group-hover:scale-105 transition-transform">GovAid</span>
        </a>
        
        <nav class="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              class={`text-sm font-semibold transition-all hover:text-blue-700 dark:hover:text-blue-400 relative py-1 ${
                activeSection.value === link.href ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {link.label}
              <span class={`absolute bottom-0 left-0 h-0.5 bg-blue-700 dark:bg-blue-400 rounded-full transition-all duration-300 ${
                activeSection.value === link.href ? 'w-full' : 'w-0'
              }`} />
            </a>
          ))}
        </nav>

        <div class="flex items-center gap-4">
          <button 
            onClick$={toggleTheme}
            class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
            aria-label="Toggle Dark Mode"
          >
            {isDark.value ? (
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 000 14 7 7 0 000-14z" />
              </svg>
            ) : (
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <slot name="cta" />
        </div>
      </div>
    </header>
  );
});
