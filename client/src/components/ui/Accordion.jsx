import React, { createContext, useContext, useState, useId } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

export function Accordion({
  children,
  items,
  type = 'single',
  defaultValue,
  className = '',
}) {
  const [openItems, setOpenItems] = useState(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );

  const toggleItem = (value) => {
    if (type === 'single') {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={clsx('space-y-3 w-full', className)}>
        {items && Array.isArray(items)
          ? items.map((item, idx) => {
              const val = item.id || `accordion-item-${idx}`;
              const title = item.title || item.question;
              const content = item.content || item.answer;

              return (
                <AccordionItem key={val} value={val}>
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent>
                    {typeof content === 'string' ? <p>{content}</p> : content}
                  </AccordionContent>
                </AccordionItem>
              );
            })
          : children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className = '',
}) {
  const autoId = useId();
  const itemId = value || autoId;
  const triggerId = `${itemId}-trigger`;
  const contentId = `${itemId}-content`;

  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems ? openItems.includes(itemId) : false;

  return (
    <AccordionItemContext.Provider value={{ itemId, triggerId, contentId, isOpen }}>
      <div
        className={clsx(
          'bg-surface border rounded-healix-xl overflow-hidden transition-all duration-200',
          isOpen ? 'border-primary/40 shadow-soft-sm' : 'border-border hover:border-border/80',
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className = '',
}) {
  const { triggerId, contentId, itemId, isOpen } = useContext(AccordionItemContext);
  const { toggleItem } = useContext(AccordionContext);

  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={() => toggleItem(itemId)}
      className={clsx(
        'w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={clsx(
          'w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
        aria-hidden="true"
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className = '',
}) {
  const { contentId, triggerId, isOpen } = useContext(AccordionItemContext);

  if (!isOpen) return null;

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={clsx(
        'px-6 pb-6 text-sm text-text-secondary leading-relaxed border-t border-border/40 pt-4 animate-in fade-in duration-150',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Accordion;
