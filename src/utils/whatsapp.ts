import { CartItem, Product, AtelierAppointment } from '../types';
import { BRAND_CONTACT } from '../data/products';

export function createDressWhatsAppUrl(product: Product, selectedColor?: string, selectedSize?: string): string {
  const colorStr = selectedColor ? `\n• Color: ${selectedColor}` : '';
  const sizeStr = selectedSize ? `\n• Size: ${selectedSize}` : '';

  const message = `Salam HIFA Team, 🌸

I would like to inquire about ordering this dress from your collection:

*${product.name}*
• Price: ${product.price} QAR${colorStr}${sizeStr}
• Product Code: ${product.id.toUpperCase()}

Could you please confirm availability and delivery to my location in Qatar? 

Thank you!`;

  return `https://wa.me/${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function createCartWhatsAppUrl(items: CartItem[], clientName?: string, deliveryZone?: string, notes?: string): string {
  const itemsText = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}* (${item.selectedSize}, ${item.selectedColor}) x${item.quantity} = ${item.product.price * item.quantity} QAR`
    )
    .join('\n');

  const subtotal = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const delivery = subtotal >= 500 ? 'FREE (Qatar Special Delivery)' : '30 QAR';
  const total = subtotal >= 500 ? subtotal : subtotal + 30;

  const clientText = clientName ? `\n\n*Customer Name:* ${clientName}` : '';
  const zoneText = deliveryZone ? `\n*Delivery Location in Qatar:* ${deliveryZone}` : '';
  const notesText = notes ? `\n*Special Instructions:* ${notes}` : '';

  const message = `Salam HIFA Boutique, ✨

I would like to place an order for the following dresses:

${itemsText}

--------------------------
*Subtotal:* ${subtotal} QAR
*Delivery:* ${delivery}
*Estimated Total:* ${total} QAR
--------------------------${clientText}${zoneText}${notesText}

Please confirm my order and share payment instructions (Cash on Delivery / Card / Link).`;

  return `https://wa.me/${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function createAppointmentWhatsAppUrl(appointment: AtelierAppointment): string {
  const message = `Salam HIFA Atelier, 👑

I would like to book an exclusive in-person dress fitting at your Madina Khalifa South boutique:

• *Client Name:* ${appointment.fullName}
• *Phone:* ${appointment.phone}
• *Preferred Date:* ${appointment.date}
• *Preferred Time:* ${appointment.timeSlot}
• *Occasion / Dress Interest:* ${appointment.occasionType}
${appointment.notes ? `• *Special Notes:* ${appointment.notes}\n` : ''}
Please confirm the appointment slot for me. Thank you!`;

  return `https://wa.me/${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function createGeneralWhatsAppInquiryUrl(topic?: string): string {
  const topicText = topic ? ` regarding ${topic}` : '';
  const message = `Salam HIFA Team, 🌸\n\nI am contacting you from your website${topicText}. I would love some styling advice on your latest dress collection.`;
  return `https://wa.me/${BRAND_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}
