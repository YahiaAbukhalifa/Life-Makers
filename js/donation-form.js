function handleDonationFormSubmit(event) {
    event.preventDefault();
    
    // التحقق من اختيار المستخدم لخيار التوصيل
    const deliveryOption = document.querySelector('input[name="needDelegate"]:checked');
    
    if (deliveryOption && deliveryOption.value === 'yes') {
        // إذا اختار المستخدم 'نعم' للمندوب، عرض رسالة وتوجيه للصفحة الرئيسية
        alert('سيتم التواصل معك في أقرب فرصة للتواصل مع المندوب');
        window.location.href = './index.html';
    } else if (deliveryOption && deliveryOption.value === 'no') {
        // إذا اختار المستخدم 'لا' للمندوب، توجيهه إلى صفحة الدفع
        window.location.href = './payment.html';
    } else {
        // إذا لم يختر أي خيار، استمر بالسلوك الافتراضي للنموذج
        event.target.submit();
    }
}

// إضافة مستمع الحدث إلى جميع نماذج التبرع
document.addEventListener('DOMContentLoaded', function() {
    const donationForms = document.querySelectorAll('form');
    donationForms.forEach(form => {
        form.addEventListener('submit', handleDonationFormSubmit);
    });
});