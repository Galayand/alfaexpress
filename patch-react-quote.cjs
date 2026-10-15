const fs = require('fs');

const quoteFile = './src/components/home/QuoteSection.tsx';
let content = fs.readFileSync(quoteFile, 'utf8');

// 1. Remove the price calculation
content = content.replace(/const calculateEstimatedCost = \(\) => {[\s\S]*?return estimatedTotal;\s*};/g, '');
content = content.replace(/const estimatedPrice = calculateEstimatedCost\(\);/g, '');

// 2. Modify handleSubmit to open WhatsApp directly instead of showing the "submitted" state (or show it briefly, then redirect)
const newSubmit = `
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('يرجى كتابة الاسم ورقم الجوال للتواصل.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    
    const textMsg = \`طلب عرض سعر جديد - ألفا إكسبريس:
الاسم: \${name}
الجوال: \${phone}
من: \${originCity} (السعودية)
إلى: \${destinationGov} (مصر)
نوع الشحنة: \${shipmentType}
الوزن التقريبي: \${weightKg} كجم
طريقة الشحن: \${shippingMethod}
الملاحظات: \${notes || 'لا يوجد'}\`;

    const waUrl = \`https://wa.me/\${config.whatsappNumber}?text=\${encodeURIComponent(textMsg)}\`;
    window.open(waUrl, '_blank');
  };
`;
content = content.replace(/const handleSubmit = \(e: React.FormEvent\) => {[\s\S]*?_lastQuoteWhatsAppUrl = waUrl;\s*};/g, newSubmit);

// 3. Remove the Price Guarantee Card completely
content = content.replace(/\{\/\* Price Guarantee Card \*\/\}.*?(\{\/\* 3 Trust Badges \*\/\})/gs, '$1');

// 4. Also fix the "submitted" state UI if we want, but opening WhatsApp is fine. Let's just keep the success UI since it provides good feedback.
content = content.replace(/<a[^>]*href="\{waUrl\}"[^>]*>[\s\S]*?التواصل عبر واتساب لإتمام الطلب[\s\S]*?<\/a>/g, '');

fs.writeFileSync(quoteFile, content);
console.log("Patched QuoteSection.tsx for React Preview");
