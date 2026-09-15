import React from 'react';
import { Card } from '../../components/cards/Card.jsx';
import { Mail, Phone, MapPin, Clock, Building2 } from 'lucide-react';

export function ContactInfoCards() {
  const contactDetails = [
    {
      icon: Mail,
      title: 'Email Inquiries',
      value: 'care@healixhealth.com',
      href: 'mailto:care@healixhealth.com',
      note: 'Monitored directly by clinical intake coordinators.',
    },
    {
      icon: Phone,
      title: 'Concierge Telephone',
      value: '+1 (800) 555-HEAL',
      href: 'tel:+18005554325',
      note: 'Direct physician scheduling & member services.',
    },
    {
      icon: MapPin,
      title: 'Clinical Center',
      value: '450 Medical Plaza Way, Suite 800',
      subValue: 'San Francisco, CA 94115',
      note: 'In-person consultations by scheduled appointment.',
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      value: 'Monday – Friday: 8:00 AM – 6:00 PM PST',
      note: 'Weekend urgent concierge availability for members.',
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-6 sm:p-8 border border-border bg-surface space-y-6">
        <div className="border-b border-border/60 pb-3">
          <h2 className="font-heading text-lg font-bold text-text-primary flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <span>Direct Clinical Channels</span>
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Reach out via phone, email, or schedule an in-person diagnostic evaluation.
          </p>
        </div>

        <div className="space-y-5 text-xs text-text-secondary">
          {contactDetails.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-healix-md bg-primary-light text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-semibold text-text-primary block text-xs">
                    {item.title}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium text-primary hover:text-primary-dark transition-colors block text-xs"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-text-primary font-medium text-xs">
                      {item.value}
                      {item.subValue && <span className="block">{item.subValue}</span>}
                    </p>
                  )}
                  <p className="text-[11px] text-text-muted">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
