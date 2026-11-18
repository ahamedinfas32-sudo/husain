import React, { useState } from 'react';
import { X, Ruler, Scissors, MessageCircle } from 'lucide-react';
import { createGeneralWhatsAppInquiryUrl } from '../utils/whatsapp';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isOpen) return null;

  const sizeChart = [
    { size: 'XS', uk: 'UK 6', eu: 'EU 34', us: 'US 2', bustCm: '82-85', bustIn: '32-33.5', waistCm: '62-65', waistIn: '24.5-25.5', hipCm: '88-91', hipIn: '34.5-36', lengthCm: '150-155' },
    { size: 'S', uk: 'UK 8', eu: 'EU 36', us: 'US 4', bustCm: '86-89', bustIn: '34-35', waistCm: '66-69', waistIn: '26-27', hipCm: '92-95', hipIn: '36.5-37.5', lengthCm: '152-157' },
    { size: 'M', uk: 'UK 10-12', eu: 'EU 38-40', us: 'US 6-8', bustCm: '90-95', bustIn: '35.5-37.5', waistCm: '70-75', waistIn: '27.5-29.5', hipCm: '96-101', hipIn: '38-40', lengthCm: '155-160' },
    { size: 'L', uk: 'UK 14', eu: 'EU 42', us: 'US 10', bustCm: '96-102', bustIn: '38-40', waistCm: '76-82', waistIn: '30-32', hipCm: '102-108', hipIn: '40.5-42.5', lengthCm: '155-160' },
    { size: 'XL', uk: 'UK 16', eu: 'EU 44', us: 'US 12', bustCm: '103-110', bustIn: '40.5-43', waistCm: '83-90', waistIn: '32.5-35.5', hipCm: '109-116', hipIn: '43-45.5', lengthCm: '155-160' },
    { size: 'XXL', uk: 'UK 18', eu: 'EU 46', us: 'US 14', bustCm: '111-118', bustIn: '43.5-46.5', waistCm: '91-98', waistIn: '36-38.5', hipCm: '117-124', hipIn: '46-49', lengthCm: '155-160' },
    { size: 'Custom', uk: 'Made-to-Measure', eu: 'Bespoke', us: 'Bespoke', bustCm: 'Custom', bustIn: 'Custom', waistCm: 'Custom', waistIn: 'Custom', hipCm: 'Custom', hipIn: 'Custom', lengthCm: 'Tailored' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-[#FAF8F5] p-6 sm:p-8 shadow-2xl border border-[#DFBF77]/40 my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0E626B] font-semibold mb-2">
            <Ruler className="w-4 h-4 text-[#C5A059]" />
            <span>HIFA Atelier Sizing</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#1A252C] font-normal mb-2">
            Dress Sizing Guide & Custom Tailoring
          </h2>
          <p className="text-xs text-[#5C6873] font-light leading-relaxed mb-6">
            All our dresses are cut with generous luxury seam allowances to allow effortless alteration at our Madina Khalifa South atelier or by your personal tailor.
          </p>

          {/* Unit Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center border border-[#DDD4C7] bg-white">
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  unit === 'cm' ? 'bg-[#0E626B] text-white' : 'text-gray-600'
                }`}
              >
                Centimeters (cm)
              </button>
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  unit === 'inches' ? 'bg-[#0E626B] text-white' : 'text-gray-600'
                }`}
              >
                Inches (in)
              </button>
            </div>

            <span className="text-[11px] text-gray-500 hidden sm:inline">
              Qatar Standard / International Fit
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#DDD4C7] bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5EFEB] border-b border-[#DDD4C7] text-[#222E36] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">HIFA Size</th>
                  <th className="p-3">UK / Qatar</th>
                  <th className="p-3">EU</th>
                  <th className="p-3">Bust ({unit})</th>
                  <th className="p-3">Waist ({unit})</th>
                  <th className="p-3">Hips ({unit})</th>
                  <th className="p-3">Length (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE5D8] text-[#424F5A]">
                {sizeChart.map((row, idx) => (
                  <tr key={idx} className={row.size === 'Custom' ? 'bg-[#DFBF77]/10 font-medium' : ''}>
                    <td className="p-3 font-semibold text-black">{row.size}</td>
                    <td className="p-3">{row.uk}</td>
                    <td className="p-3">{row.eu}</td>
                    <td className="p-3">{unit === 'cm' ? row.bustCm : row.bustIn}</td>
                    <td className="p-3">{unit === 'cm' ? row.waistCm : row.waistIn}</td>
                    <td className="p-3">{unit === 'cm' ? row.hipCm : row.hipIn}</td>
                    <td className="p-3">{row.lengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Custom Tailoring Assistance */}
          <div className="mt-6 p-4 bg-[#F5EFEB] border border-[#DFBF77]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Scissors className="w-5 h-5 text-[#0E626B] shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                  Unsure of your dress size?
                </h4>
                <p className="text-[11px] text-gray-600">
                  Send your bust, waist, and height measurements to our Madina Khalifa couturiers on WhatsApp.
                </p>
              </div>
            </div>

            <a
              href={createGeneralWhatsAppInquiryUrl('Size Consultation & Fitting Advice')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#0E626B] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#093E44] transition-colors shrink-0 flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#DFBF77]" />
              <span>Ask a Stylist (+974 7001 5100)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
