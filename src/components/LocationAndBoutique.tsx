import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle, ExternalLink, Sparkles, Check } from 'lucide-react';
import { BRAND_CONTACT } from '../data/products';
import { createAppointmentWhatsAppUrl } from '../utils/whatsapp';
import { AtelierAppointment } from '../types';

export const LocationAndBoutique: React.FC = () => {
  const [appointment, setAppointment] = useState<AtelierAppointment>({
    fullName: '',
    phone: '+974 ',
    email: '',
    date: '',
    timeSlot: '11:00 AM - 12:30 PM',
    occasionType: 'Wedding / Gala Gown',
    notes: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment.fullName || !appointment.phone || !appointment.date) {
      alert('Please fill in your name, phone number, and preferred date.');
      return;
    }

    setBookingSuccess(true);
    const url = createAppointmentWhatsAppUrl(appointment);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="boutique-map" className="py-20 sm:py-24 bg-[#F5EFEB]/50 border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E626B]/10 text-[#0E626B] text-xs uppercase tracking-[0.2em] font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Flagship Atelier & Showroom</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A252C] font-normal tracking-tight mb-3">
            Visit HIFA in Madina Khalifa South, Qatar
          </h2>
          <p className="text-sm sm:text-base text-[#64707D] font-light leading-relaxed">
            Experience our dress collections in person. Enjoy private fitting suites, fabric consultations, and bespoke custom tailoring services in the heart of Doha.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Business Location & Details & Google Maps Embed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Quick Contact & Hours Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-[#E3DACB] p-6 shadow-xs">
              {/* Address */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0E626B] font-semibold">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Atelier Address</span>
                </div>
                <p className="text-sm font-medium text-[#1A252C]">
                  HIFA Haute Couture Boutique
                </p>
                <p className="text-xs text-[#5D6975] leading-relaxed">
                  Street 810, Building 42, Zone 34<br />
                  Madina Khalifa South, Doha, Qatar
                </p>
                <a
                  href={BRAND_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0E626B] font-medium hover:underline pt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Working Hours */}
              <div className="space-y-2 sm:border-l sm:border-[#EDE5D8] sm:pl-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#0E626B] font-semibold">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>Boutique Hours</span>
                </div>
                <div className="text-xs text-[#5D6975] space-y-1">
                  <p>
                    <strong className="text-gray-800">Saturday – Thursday:</strong><br />
                    10:00 AM – 10:00 PM
                  </p>
                  <p>
                    <strong className="text-gray-800">Friday:</strong><br />
                    2:00 PM – 10:00 PM
                  </p>
                </div>
                <div className="pt-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] uppercase font-semibold">
                    Open Today for VIP Fittings
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Phone / WhatsApp bar */}
            <div className="bg-[#0E626B] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#DFBF77]/40 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#DFBF77]" />
                </div>
                <div>
                  <p className="text-xs text-[#DFBF77] tracking-wider uppercase font-semibold">VIP Direct Line & WhatsApp</p>
                  <p className="text-base sm:text-lg font-bold tracking-wider">{BRAND_CONTACT.formattedWhatsApp}</p>
                </div>
              </div>

              <a
                href={`https://wa.me/${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent('Salam HIFA Team, I would like directions or assistance visiting your Madina Khalifa South boutique.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Chat for Directions</span>
              </a>
            </div>

            {/* Embedded Google Maps Container */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-[#E8DEC8] border border-[#DDD4C7] overflow-hidden shadow-inner">
              <iframe
                title="HIFA Boutique Location in Madina Khalifa South, Doha, Qatar"
                src="https://maps.google.com/maps?q=Madina%20Khalifa%20South,%20Doha,%20Qatar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[105%]"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-md border border-[#E0D8CB] text-xs">
                <p className="font-semibold text-gray-900">HIFA Flagship Atelier</p>
                <p className="text-gray-600 text-[11px]">Madina Khalifa South, Qatar</p>
              </div>
            </div>
          </div>

          {/* Right Column: Book In-Person Atelier Fitting Appointment Form (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#E3DACB] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#0E626B] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Complimentary Service</span>
              </div>
              <h3 className="font-serif text-2xl text-[#1A252C] font-normal mb-2">
                Book a VIP Fitting Suite
              </h3>
              <p className="text-xs text-[#6B7782] font-light leading-relaxed mb-6">
                Reserve your private styling appointment with our couture consultants. Try on our newest dresses, explore bespoke fabric swatches, and have our tailors measure you.
              </p>

              {bookingSuccess ? (
                <div className="bg-[#0E626B]/10 border border-[#0E626B] p-5 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#0E626B] text-white mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#1A252C]">Appointment Requested!</h4>
                  <p className="text-xs text-[#525D66] leading-relaxed">
                    We have redirected your appointment details to our WhatsApp team (+974 7001 5100). Our concierge will confirm your fitting time shortly.
                  </p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="text-xs text-[#0E626B] font-semibold underline underline-offset-4"
                  >
                    Book another appointment
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={appointment.fullName}
                      onChange={(e) => setAppointment({ ...appointment, fullName: e.target.value })}
                      placeholder="e.g. Sheikha Al-Kuwari"
                      className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-[#0E626B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-gray-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={appointment.phone}
                        onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })}
                        placeholder="+974 7001 5100"
                        className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-[#0E626B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-gray-700 mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={appointment.date}
                        onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-[#0E626B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-gray-700 mb-1">
                        Time Slot
                      </label>
                      <select
                        value={appointment.timeSlot}
                        onChange={(e) => setAppointment({ ...appointment, timeSlot: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-[#0E626B]"
                      >
                        <option value="11:00 AM - 12:30 PM">11:00 AM – 12:30 PM</option>
                        <option value="1:00 PM - 2:30 PM">1:00 PM – 2:30 PM</option>
                        <option value="4:00 PM - 5:30 PM">4:00 PM – 5:30 PM</option>
                        <option value="6:00 PM - 7:30 PM">6:00 PM – 7:30 PM</option>
                        <option value="8:00 PM - 9:30 PM">8:00 PM – 9:30 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium text-gray-700 mb-1">
                        Occasion Type
                      </label>
                      <select
                        value={appointment.occasionType}
                        onChange={(e) => setAppointment({ ...appointment, occasionType: e.target.value })}
                        className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-[#0E626B]"
                      >
                        <option value="Wedding / Gala Gown">Wedding / Gala Gown</option>
                        <option value="Royal Kaftan / Ramadan">Royal Kaftan / Ramadan</option>
                        <option value="Cocktail / Evening Party">Cocktail / Evening Party</option>
                        <option value="Custom Bespoke Commission">Custom Bespoke Commission</option>
                        <option value="General Collection Browsing">General Collection Browsing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-gray-700 mb-1">
                      Special Requests / Sizing Preferences (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={appointment.notes}
                      onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
                      placeholder="e.g. Interested in emerald green gowns and custom length for 10cm heels."
                      className="w-full bg-[#FAF8F5] border border-[#DDD4C7] p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-[#0E626B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0E626B] hover:bg-[#093E44] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#DFBF77]" />
                    <span>Confirm Booking via WhatsApp (+974 7001 5100)</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-[#EDE5D8] flex items-center gap-2 text-xs text-[#717C86]">
              <Calendar className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Same-day appointments welcome based on suite availability.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
