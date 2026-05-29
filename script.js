// ==========================================
// 0. ميزة التبديل التلقائي لصور الـ Hero 📸
// ==========================================
// مصفوفة تحتوي على مسارات الصور التي تريد التبديل بينها
const heroImages = [
    "images/hero-pizza.png.jpg", // صورتك الحالية الأولى
    "images/hero-pizza2.png.jpg",       // الصورة الثانية المجهزة (يمكنك وضع اسم صورتك الجديدة هنا)
];

let currentImageIndex = 0;

function changeHeroImage() {
    // جلب عنصر الصورة من الصفحة عن طريق الكلاس الخاص بها
    const heroImageElement = document.querySelector('.main-pizza-img');
    
    if (heroImageElement) {
        // زيادة المؤشر للانتقال للصورة التالية
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        
        // تغيير مسار الصورة الحالي
        heroImageElement.src = heroImages[currentImageIndex];
    }
}

// تشغيل دالة التبديل تلقائياً كل 3000 مللي ثانية (3 ثوانٍ)
setInterval(changeHeroImage, 3000);


// ==========================================
// 1. برمجة الوضع الليلي (Dark Mode)
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    });
}

// ==========================================
// 2. برمجة تأثير الكتابة التلقائية (Typing Effect)
// ==========================================
const words = ["تصلك حتى باب بيتك! 🛵", "مخبوزة في فرن الحطب 🔥", "بمكونات طازجة 100% 🍕"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            const element = document.getElementById('typing-text');
            if (element) element.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            const element = document.getElementById('typing-text');
            if (element) element.innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

document.addEventListener("DOMContentLoaded", () => {
    typingEffect();
});

// ==========================================
// 3. برمجة سلة المشتريات المتقدمة والنافذة المنبثقة
// ==========================================
let cartItemsCount = 0;
let cartTotalPrice = 0;
let selectedPizzas = []; // مصفوفة لحفظ أسماء الوجبات المضافة

const cartCountElement = document.getElementById('cartCount');
const addToCartButtons = document.querySelectorAll('.order-item-btn');
const cartIconContainer = document.querySelector('.cart-icon-container');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsList = document.getElementById('cartItemsList');
const popupTotalElement = document.getElementById('popupTotal');

// تجميع البيانات عند الضغط على "أضف للسلة"
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        cartItemsCount++;
        if (cartCountElement) cartCountElement.textContent = cartItemsCount;
        
        const card = event.target.closest('.menu-card');
        if (card) {
            const pizzaName = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            const priceStr = priceText.replace('L.E', '').trim(); 
            const price = parseFloat(priceStr);
            
            cartTotalPrice += price;
            
            // حفظ اسم الوجبة وسعرها في المصفوفة
            selectedPizzas.push({ name: pizzaName, price: price });
        }
    });
});

// فتح النافذة عند الضغط على أيقونة السلة 🛒 في الهيدر
if (cartIconContainer) {
    cartIconContainer.addEventListener('click', () => {
        if (cartModal) {
            cartModal.style.display = 'flex';
            updateCartPopupUI(); // تحديث القائمة المعروضة داخل النافذة
        }
    });
}

// إغلاق النافذة عند الضغط على زر X
if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        if (cartModal) cartModal.style.display = 'none';
    });
}

// إغلاق النافذة عند الضغط في أي مكان خارجها
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// دالة لتحديث بناء قائمة الوجبات المعروضة داخل النافذة
function updateCartPopupUI() {
    if (!cartItemsList || !popupTotalElement) return;
    
    // تحديث إجمالي السعر
    popupTotalElement.textContent = cartTotalPrice.toFixed(2);
    
    if (selectedPizzas.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart-msg">السلة فارغة حالياً 🍕</p>';
    } else {
        cartItemsList.innerHTML = ''; // مسح الرسالة القديمة
        selectedPizzas.forEach(pizza => {
            const itemRow = document.createElement('div');
            itemRow.className = 'cart-popup-item';
            itemRow.innerHTML = `
                <span>${pizza.name}</span>
                <strong>${pizza.price} L.E</strong>
            `;
            cartItemsList.appendChild(itemRow);
        });
    }
}
