// src/pages/home/sections/QuickActionsSection.tsx
import { Link } from 'react-router-dom';
import { trackEvent } from '../../../analytics';

interface QuickAction {
  icon: string;
  title: string;
  href: string;
  iconColor: string;
}

const QuickActionsSection = () => {
  const quickActions: QuickAction[] = [
    { icon: 'work', title: 'New Jobs', href: '/jobs', iconColor: 'var(--psc-primary-container)' },
    { icon: 'gavel', title: 'Report Incident of Corruption Here', href: '/report-corruption', iconColor: '#ba1a1a' },
    { icon: 'policy', title: 'Policies & Guidelines', href: '/policies', iconColor: '#296a46' },
    { icon: 'help', title: "FAQ's", href: '/faq', iconColor: '#5f5e5e' },
  ];

  const handleClick = (action: QuickAction) => {
    trackEvent('quick_action_click', { action: action.title });
    if (window.navigator && window.navigator.vibrate) window.navigator.vibrate(50);
  };

  return (
    <section 
      className="py-20 px-4 md:px-8 max-w-[1280px] mx-auto"
      style={{ backgroundColor: 'var(--psc-surface)' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action: QuickAction, index: number) => (
          <Link
            key={index}
            to={action.href}
            onClick={() => handleClick(action)}
            className="group rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-48"
            style={{ 
              backgroundColor: 'var(--psc-surface-container)',
              border: '1px solid var(--psc-border)'
            }}
          >
            <div 
              className="absolute top-0 right-0 w-24 h-24 rounded-bl-full -z-10 transition-transform group-hover:scale-110"
              style={{ 
                backgroundColor: 'var(--psc-primary-container)',
                opacity: 0.1
              }}
            ></div>
            <div>
              <span 
                className="material-symbols-outlined text-4xl mb-4"
                style={{ color: action.iconColor }}
                data-weight="fill"
              >
                {action.icon}
              </span>
              <h3 
                className="text-xl font-semibold"
                style={{ color: 'var(--psc-on-surface)' }}
              >
                {action.title}
              </h3>
            </div>
            <div className="flex justify-end">
              <span 
                className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                style={{ color: action.iconColor }}
              >
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActionsSection;