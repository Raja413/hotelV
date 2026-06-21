/* ==========================================
HOTEL V KONDAPUR APP
========================================== */

document.addEventListener("DOMContentLoaded", () => {

initNavbar();
initHamburger();
initSmoothScroll();
initFAQ();
initRevealAnimations();
initGallery();
initGalleryFilters();
initWhatsApp();
initChatbot();
initBookingForm();
initHeroAnimation();
initCarousels();
initCustomSelects();
initReviewsSlider();
initDiningCarousel();
initBanquetCarousel();
initGalleryCarousel();
initRoomBookButtons();

});

/* ==========================================
STICKY NAVBAR
========================================== */

function initNavbar() {
const navbar = document.querySelector(".navbar");
if (!navbar) return;
window.addEventListener("scroll", () => {
if (window.scrollY > 50) {
navbar.classList.add("scrolled");
} else {
navbar.classList.remove("scrolled");
}
});
}

/* ==========================================
HAMBURGER MENU
========================================== */

function initHamburger() {
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (!hamburger || !navLinks) return;

hamburger.addEventListener("click", () => {
navLinks.classList.toggle("active");
const icon = hamburger.querySelector("i");
if (navLinks.classList.contains("active")) {
icon.classList.remove("fa-bars");
icon.classList.add("fa-xmark");
} else {
icon.classList.remove("fa-xmark");
icon.classList.add("fa-bars");
}
});

navLinks.querySelectorAll("a").forEach(link => {
link.addEventListener("click", () => {
navLinks.classList.remove("active");
const icon = hamburger.querySelector("i");
icon.classList.remove("fa-xmark");
icon.classList.add("fa-bars");
});
});
}

/* ==========================================
SMOOTH SCROLL
========================================== */

function initSmoothScroll() {
document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener("click", e => {
const href = link.getAttribute("href");
if (!href || href === "#") return;
e.preventDefault();
const target = document.querySelector(href);
if (target) {
target.scrollIntoView({ behavior: "smooth", block: "start" });
}
});
});
}

/* ==========================================
FAQ
========================================== */

function initFAQ() {
document.querySelectorAll(".faq-item").forEach(item => {
const btn = item.querySelector(".faq-question");
if (!btn) return;
btn.addEventListener("click", () => {
document.querySelectorAll(".faq-item").forEach(i => {
if (i !== item) i.classList.remove("active");
});
item.classList.toggle("active");
});
});
}

/* ==========================================
SCROLL REVEAL
========================================== */

function initRevealAnimations() {
const elements = document.querySelectorAll(
".room-card,.feature-card,.stat-item,.testimonial-card,.section-header,.dining-grid,.contact-grid,.faq-container,.gallery-filter,.banquet-grid,.banquet-feature"
);

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("active");
}
});
}, { threshold: .15 });

elements.forEach(el => {
el.classList.add("reveal");
observer.observe(el);
});
}

/* ==========================================
GALLERY LIGHTBOX
========================================== */

function initGallery() {
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
const closeBtn = lightbox ? lightbox.querySelector(".close-lightbox") : null;

if (!lightbox || !lightboxImg) return;

galleryItems.forEach(item => {
item.addEventListener("click", () => {
const img = item.querySelector("img");
if (img) {
lightboxImg.src = img.src;
lightboxImg.alt = img.alt;
lightbox.classList.add("active");
}
});
});

if (closeBtn) {
closeBtn.addEventListener("click", () => {
lightbox.classList.remove("active");
});
}

lightbox.addEventListener("click", e => {
if (e.target === lightbox) {
lightbox.classList.remove("active");
}
});

document.addEventListener("keydown", e => {
if (e.key === "Escape") {
lightbox.classList.remove("active");
}
});

document.querySelectorAll(".carousel-slide img, .dining-slide img, .banquet-img img").forEach(img => {
img.style.cursor = "pointer";
img.addEventListener("click", () => {
lightboxImg.src = img.src;
lightboxImg.alt = img.alt;
lightbox.classList.add("active");
});
});
}

/* ==========================================
GALLERY FILTERS
========================================== */

function initGalleryFilters() {
const filters = document.querySelectorAll(".gallery-filter button");
const items = document.querySelectorAll(".gallery-item");

filters.forEach(btn => {
btn.addEventListener("click", () => {
filters.forEach(f => f.classList.remove("active"));
btn.classList.add("active");
const category = (btn.dataset.filter || btn.textContent.trim().toLowerCase());
items.forEach(item => {
if (category === "all") {
item.style.display = "block";
} else {
item.style.display = item.dataset.category === category ? "block" : "none";
}
});
if (window._galleryCarouselFilter) window._galleryCarouselFilter(category);
});
});
}

/* ==========================================
WHATSAPP
========================================== */

function initWhatsApp() {
const btn = document.getElementById("whatsappBtn");
if (!btn) return;

btn.addEventListener("click", e => {
e.preventDefault();
const message = encodeURIComponent(
"Hello Hotel V Kondapur! I'd like to inquire about room availability and rates."
);
window.open("https://wa.me/919849534566?text=" + message, "_blank");
});
}

/* ==========================================
AI CONCIERGE CHATBOT
========================================== */

const AI_RESPONSES = {

breakfast:
"Breakfast is available with select room packages. The Superior Twin Room with breakfast starts at Rs 2,916/night + GST. Contact us at +91 98495 34566 for breakfast-inclusive rates.",

dining:
"Our in-house multi-cuisine restaurant serves South Indian, North Indian, and Continental dishes for lunch and dinner. Room service is available from 7 AM to 11 PM. Outside food is not permitted on the premises. Contact +91 98495 34566 for menu details or special dietary requests.",

checkin:
"Check-in time at Hotel V Kondapur is 12:00 PM (noon). Check-out time is 11:00 AM. Early check-in or late check-out may be available subject to room availability — please contact the front desk.",

checkout:
"Check-out time is 11:00 AM. Late check-out may be available upon request, subject to room availability. Please contact the front desk.",

wifi:
"Complimentary high-speed Wi-Fi is available throughout Hotel V Kondapur for all guests.",

location:
"Hotel V Kondapur is located at Plot no. 1822 & 1823, Kondapur, Golden Tulip Estate, JV Hills, Gachibowli, Hyderabad, Telangana 500084. We are 5 minutes from Sporthood Azone, 4.4 km from aVance Business Hub, and 16.6 km from the city center.",

rooms:
"We offer two room types: Superior King Room (1 King Bed, 330 sq.ft) and Superior Twin Room (2 Single Beds, 330 sq.ft). Both include city view, study room, AC, and bathroom. Starting at Rs 2,692/night + GST.",

price:
"Our rooms start at Rs 2,692/night + GST (MRP Rs 6,000 + GST). Both the Superior King Room and Superior Twin Room are 330 sq.ft with city view. Contact us directly at +91 98495 34566 for the best rates.",

booking:
"You can book directly through our website using the Check Availability form, or contact us at +91 98495 34566 via WhatsApp or call. Direct bookings get the best rates starting at Rs 2,692/night + GST.",

parking:
"Yes, free parking is available for all guests at Hotel V Kondapur.",

pool:
"We do not have a swimming pool at Hotel V Kondapur. However, we have a well-equipped gym, free parking, an in-house restaurant, and room service.",

gym:
"Yes, Hotel V Kondapur has a well-equipped fitness center available for all guests.",

pets:
"Pets are not allowed at Hotel V Kondapur. We also do not permit outside food on the premises.",

id:
"We accept Passport, Aadhaar Card, Government ID, and Driving License. Local IDs are accepted. Minimum guest age is 18 years. Unmarried couples are welcome.",

amenities:
"Hotel V Kondapur offers: Free Wi-Fi, Free Parking, Restaurant, Gym, Room Service, Air Conditioning, Housekeeping, Study Room, Iron/Ironing Board, Elevator, and 24/7 front desk support. All rooms include an attached bathroom, AC, TV, and wardrobe. Contact +91 98495 34566 for specific room feature queries.",

banquet:
"Yes! Our banquet hall accommodates up to 150 guests and is ideal for corporate events, weddings, birthday parties, and private celebrations. Contact us at +91 98495 34566 for availability and custom catering packages.",

cancel:
"For cancellation and refund policies, please contact us directly at +91 98495 34566 or email hotelv.res@gmail.com. Policies may vary based on booking source and room type.",

transport:
"Hotel V Kondapur is approximately 30 km from Rajiv Gandhi International Airport (about 45 min drive). We can help arrange cab/taxi services — please contact the front desk at +91 98495 34566. The hotel is well-connected to HITEC City and Gachibowli.",

nearby:
"Popular places near Hotel V Kondapur: HITEC City (5 km), Gachibowli IT Hub (2 km), Shilparamam (6 km), Botanical Gardens (8 km), Golconda Fort (15 km), and Hussain Sagar Lake (16 km). The front desk can help with directions.",

smoking:
"Hotel V Kondapur is a non-smoking property. Smoking is not permitted inside the rooms or common areas.",

extrabed:
"Extra bed or crib availability is subject to room capacity. Please contact us at +91 98495 34566 to check availability and charges.",

payment:
"We accept all major payment methods including UPI, credit/debit cards, net banking, and cash. For corporate bookings, we can arrange invoice-based payments.",

corporate:
"We offer special corporate rates and packages for business travelers and group bookings. Contact us at +91 98495 34566 or email hotelv.res@gmail.com for customized quotes.",

contact:
"You can reach Hotel V Kondapur at: Phone/WhatsApp: +91 98495 34566 | Email: hotelv.res@gmail.com | Address: Plot no. 1822 & 1823, Kondapur, Golden Tulip Estate, JV Hills, Gachibowli, Hyderabad 500084.",

laundry:
"Housekeeping services are available daily. For laundry or ironing needs, please contact the front desk. Iron and ironing board are available in-room.",

safety:
"Hotel V Kondapur has CCTV surveillance, 24/7 front desk support, and elevator access to all floors. Fire safety equipment is installed throughout the property.",

greeting:
"Hello! Welcome to Hotel V Kondapur. I can help you with rooms, pricing, dining, amenities, location, booking, and more. What would you like to know?",

farewell:
"Thank you for reaching out! We look forward to hosting you at Hotel V Kondapur. Have a great day!",

help:
"Here's what I can help you with:\n• Rooms & Pricing\n• Booking & Availability\n• Dining & Breakfast\n• Check-in / Check-out\n• Amenities & Facilities\n• Location & Nearby Attractions\n• Transport & Parking\n• Banquet & Events\n• Payment & Cancellation\n• Contact Info\n\nJust type a topic or ask a question!",

drinks:
"Alcoholic and non-alcoholic beverages are available at our in-house restaurant. We do not have a bar, but drinks can be ordered with your meal or via room service (7 AM – 11 PM). Outside food and beverages are not permitted on the premises.",

complaint:
"We're sorry to hear that! Please contact our front desk immediately at +91 98495 34566 or email hotelv.res@gmail.com so we can resolve this for you right away.",

feedback:
"We'd love to hear your feedback! You can leave a review on Google or share your experience with us at hotelv.res@gmail.com. Your feedback helps us improve!",

occupancy:
"Each room accommodates up to 2 adults. Extra person charges may apply for additional guests. For family stays or extra bed/crib requests, please contact us at +91 98495 34566.",

accessibility:
"Hotel V Kondapur has elevator access to all floors. For any specific accessibility needs, please contact us at +91 98495 34566 before your stay and we'll do our best to accommodate you.",

luggage:
"Luggage storage is available at the front desk for guests before check-in or after check-out. Please inform the front desk in advance.",

photos:
"You can view photos of our rooms, restaurant, banquet hall, and common areas right here on our website! Scroll through the gallery or visit each section to see more.",

outsidefood:
"Outside food and beverages are not permitted at Hotel V Kondapur. Our in-house restaurant serves a variety of South Indian, North Indian, and Continental dishes. Room service is available from 7 AM to 11 PM.",

water:
"Complimentary drinking water (purified/RO) is provided in all rooms. Additional bottled water is available upon request.",

timings:
"Restaurant: 7 AM – 11 PM | Room Service: 7 AM – 11 PM | Check-in: 12:00 PM (noon) | Check-out: 11:00 AM | Front Desk: 24/7. For any specific timing queries, call +91 98495 34566.",

children:
"Children are welcome at Hotel V Kondapur! Kids under 5 stay free with parents (no extra bed). For older children or extra bed requirements, please contact us at +91 98495 34566.",

decoration:
"We can arrange room decorations for birthdays, anniversaries, honeymoons, and other special occasions! Contact us at +91 98495 34566 or email hotelv.res@gmail.com to discuss your requirements and pricing.",

medical:
"For medical emergencies, please contact the front desk immediately at +91 98495 34566. We can help arrange a doctor visit or direct you to the nearest hospital/pharmacy. Emergency services: dial 108 (ambulance) or 112.",

longstay:
"We offer special rates for extended stays (weekly/monthly). Contact us at +91 98495 34566 or email hotelv.res@gmail.com for customized long-stay packages and pricing.",

connecting:
"We currently offer Superior King Rooms and Superior Twin Rooms. For group bookings or rooms on the same floor, please contact us at +91 98495 34566 and we'll do our best to accommodate your request.",

international:
"International guests are welcome! We accept Passport as valid ID. Foreign nationals must carry their passport and valid visa. For any assistance with local travel or currency exchange, our front desk is happy to help.",

girls:
"Hotel V Kondapur is a professional and family-friendly establishment. We do not provide or facilitate any such services. Please respect our policies and other guests. For any legitimate queries, contact us at +91 98495 34566.",

casual:
"No worries! Feel free to ask me anything about Hotel V Kondapur — rooms, pricing, dining, amenities, location, or booking. I'm here to help!",

default:
"I'm not sure about that, but I'd love to help! Try asking about rooms, pricing, dining, amenities, booking, location, or parking. Or call us at +91 98495 34566."

};

function initChatbot() {
const input = document.getElementById("chatInput");
const button = document.getElementById("chatSendBtn");
const chatWindow = document.getElementById("chatWindow");
if (!input || !button || !chatWindow) return;

button.addEventListener("click", sendChat);
input.addEventListener("keypress", e => {
if (e.key === "Enter") {
e.preventDefault();
sendChat();
}
});

function sendChat() {
const text = input.value.trim();
if (!text) return;
appendMessage(text, "user");
setTimeout(() => {
appendMessage(getBotReply(text), "bot");
}, 500);
input.value = "";
}

function appendMessage(text, type) {
const div = document.createElement("div");
div.className = "message " + type;
div.textContent = text;
chatWindow.appendChild(div);
chatWindow.scrollTop = chatWindow.scrollHeight;
}
}

function getBotReply(text) {
const query = text.toLowerCase().trim();

if (/^[\s\W]+$/.test(query))
return AI_RESPONSES.casual;

if (/^(hi|hello|hey|hii+|hola|namaste|good\s*(morning|afternoon|evening)|howdy|sup)\b/.test(query))
return AI_RESPONSES.greeting;

if (/\b(who are you|what are you|who is this|what is this|why are you|are you (a |real |chat)?bot|are you human|are you ai|your name)\b/.test(query))
return "I'm Hotel V Kondapur's virtual assistant! I can help you with rooms, pricing, dining, amenities, location, booking, and more. What would you like to know?";

if (/\b(how are you|how'?re you|how r u|wh?at'?s\s*up|wassup|howz it)\b/.test(query))
return "I'm doing great, thank you for asking! How can I help you today? Feel free to ask about rooms, dining, booking, or anything else about Hotel V Kondapur.";

if (/\b(help|support|assist|guide|options|what can you do|what do you do)\b/.test(query))
return AI_RESPONSES.help;

if (/\b(i am|i'm|my name|myself|me is)\b/.test(query) || /\b(new here|first time|just arrived|just came|visiting)\b/.test(query))
return "Welcome to Hotel V Kondapur! Great to have you here. I can help you with rooms, pricing, dining, amenities, location, booking, and more. What would you like to know?";

const topicKeywords = [
{test: q => q.includes("escort") || q.includes("prostitut") || q.includes("hookup") || q.includes("hook up") || q.includes("call girl") || /\bsex\b/.test(q) || ((q.includes("girl") || q.includes("woman") || q.includes("lady") || q.includes("ladies") || q.includes("female") || q.includes("companion") || q.includes("massage")) && (q.includes("available") || q.includes("provide") || q.includes("send") || q.includes("arrange") || q.includes("get me") || q.includes("want") || q.includes("need"))), response: "girls"},
{test: q => q.includes("outside food") || q.includes("swiggy") || q.includes("zomato") || q.includes("parcel") || q.includes("own food") || q.includes("bring food"), response: "outsidefood"},
{test: q => /\b(drinking water|purified water|ro water|mineral water|bottled water)\b/.test(q), response: "water"},
{test: q => q.includes("breakfast") || q.includes("brekfast") || q.includes("brunch"), response: "breakfast"},
{test: q => q.includes("drink") || q.includes("alcohol") || q.includes("beer") || q.includes("wine") || q.includes("liquor") || q.includes("beverage") || q.includes("booze") || /\bbar\b/.test(q), response: "drinks"},
{test: q => q.includes("din") || q.includes("lunch") || q.includes("restaurant") || q.includes("menu") || q.includes("food") || q.includes("meal") || q.includes("eat") || q.includes("room service") || q.includes("cuisine"), response: "dining"},
{test: q => /\b(check-?\s*in|checkin)\b/.test(q), response: "checkin"},
{test: q => /\b(check-?\s*out|checkout)\b/.test(q), response: "checkout"},
{test: q => /\b(cancel|refund|cancellation)\b/.test(q), response: "cancel"},
{test: q => /\b(wifi|wi-fi|internet|broadband)\b/.test(q), response: "wifi"},
{test: q => /\b(airport|taxi|cab|transport|uber|ola|how to reach|distance|travel|auto|metro|bus|train|railway)\b/.test(q), response: "transport"},
{test: q => /\b(nearby|attraction|places to visit|sightseeing|tourist|things to do|explore)\b/.test(q), response: "nearby"},
{test: q => /\b(location|address|where|direction|map|navigate)\b/.test(q), response: "location"},
{test: q => /\b(book|reserv|availability|available|vacancy|vacant)\b/.test(q), response: "booking"},
{test: q => /\b(parking|car park)\b/.test(q) || (/\bpark\b/.test(q) && !q.includes("shilpa")), response: "parking"},
{test: q => /\b(smok|cigarette|vape|hookah|shisha|hukkah)\b/.test(q), response: "smoking"},
{test: q => /\b(rooms?|bed|suite|superior|accom|rooom|bathroom|washroom|toilet|balcony|wardrobe|cupboard|closet)\b/.test(q) || (/\b(king|twin)\b/.test(q) && !q.includes("burger")), response: "rooms"},
{test: q => /\b(price|rate|cost|tariff|charge|how much|pricing|offer|discount|deal|cheap|budget|affordable|expensive|costly)\b/.test(q), response: "price"},
{test: q => /\b(corporate|group|company|business rate|bulk)\b/.test(q), response: "corporate"},
{test: q => /\b(pool|swim)\b/.test(q), response: "pool"},
{test: q => /\b(gym|fitness|workout|exercise)\b/.test(q), response: "gym"},
{test: q => /\b(pet|dog|cat|animal)\b/.test(q), response: "pets"},
{test: q => /\b(extra bed|crib|baby bed|rollaway|baby cot|baby|infant|toddler|child bed|kids bed)\b/.test(q), response: "extrabed"},
{test: q => /\b(laundry|dry clean|iron|washing|clothes|press)\b/.test(q), response: "laundry"},
{test: q => /\b(pay|upi|card|cash|gpay|paytm|payment|razorpay|netbanking|phonepe)\b/.test(q), response: "payment"},
{test: q => /\b(safe|security|cctv|fire|locker)\b/.test(q), response: "safety"},
{test: q => /\b(aadhaar|aadhar|passport|couple|document|proof|identity|unmarried)\b/.test(q) || /\bid\b/.test(q), response: "id"},
{test: q => /\b(contact|phone|call|email|number|reach|talk to)\b/.test(q), response: "contact"},
{test: q => /\b(amenit|facilit|what do you offer|what all|feature|service|fridge|minibar|refrigerator|tv|television|ac\b|air condition|geyser|hot water|water heater|towel|slippers|toiletries|elevator|lift)\b/.test(q), response: "amenities"},
{test: q => /\b(banquet|event|wedding|conference|party|hall|celebration|function|meetup|seminar)\b/.test(q), response: "banquet"},
{test: q => /\b(complaint|complain|problem|issue|not working|broken|dirty|noisy|noise|smell|bug|cockroach|insect)\b/.test(q), response: "complaint"},
{test: q => /\b(feedback|review|rating|suggest|experience|opinion)\b/.test(q), response: "feedback"},
{test: q => /\b(occupancy|capacity|how many guest|how many people|extra person|max guest|maximum guest|person allowed)\b/.test(q), response: "occupancy"},
{test: q => /\b(wheelchair|disabled|accessible|handicap|ramp|special needs|mobility)\b/.test(q), response: "accessibility"},
{test: q => /\b(luggage|baggage|bags|store luggage|left luggage|cloak room|cloakroom)\b/.test(q), response: "luggage"},
{test: q => /\b(photo|picture|image|gallery|pic)\b/.test(q), response: "photos"},
{test: q => /\b(timing|hours|open|close|when does|what time|schedule)\b/.test(q) || /\btime\b/.test(q), response: "timings"},
{test: q => /\b(child|kid|infant|toddler|family|child.?friendly)\b/.test(q), response: "children"},
{test: q => /\b(decorat|cake|surprise|anniversary|honeymoon|birthday|celebrate|romantic|candle|flower|balloon)\b/.test(q), response: "decoration"},
{test: q => /\b(doctor|hospital|medical|medicine|pharmacy|emergency|ambulance|clinic|first aid|health)\b/.test(q), response: "medical"},
{test: q => /\b(long stay|weekly|monthly|extended|long term|few weeks|few months)\b/.test(q), response: "longstay"},
{test: q => /\b(connecting room|adjacent|next to each other|nearby room|same floor|together)\b/.test(q), response: "connecting"},
{test: q => /\b(international|foreigner|foreign|nri|abroad|overseas|visa|currency exchange)\b/.test(q), response: "international"},
];

const farewellMatch = /\b(thanks|thank you|thankyou|bye|goodbye|good bye|see you|take care|tata|cya)\b/.test(query);
let topicMatch = null;
for (const kw of topicKeywords) {
if (kw.test(query)) { topicMatch = kw.response; break; }
}

if (topicMatch && farewellMatch)
return AI_RESPONSES[topicMatch] + "\n\nThank you for reaching out! Have a great day!";
if (farewellMatch)
return AI_RESPONSES.farewell;
if (topicMatch)
return AI_RESPONSES[topicMatch];

if (/^(no|nope|nah|not really|yes|yeah|yep|yup|ok|okay|sure|alright|hmm+|hm+|oh|ah|cool|nice|great|awesome|wow|lol|haha|hehe|right|got it|i see|fine|good|perfect|wonderful|amazing|interesting|really|seriously|what|why|how|when|who|kk|k|ya|yaa|acha|accha|sahi|theek|thik|ohk)\s*[.!?]*$/i.test(query))
return AI_RESPONSES.casual;

if (query.length <= 2)
return AI_RESPONSES.casual;

return AI_RESPONSES.default;
}

/* ==========================================
ROOM CAROUSELS
========================================== */

function initCarousels() {
document.querySelectorAll(".room-carousel").forEach(carousel => {
const track = carousel.querySelector(".carousel-track");
const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
const prevBtn = carousel.querySelector(".carousel-btn.prev");
const nextBtn = carousel.querySelector(".carousel-btn.next");
const dotsContainer = carousel.querySelector(".carousel-dots");

if (!track || slides.length === 0) return;

const total = slides.length;
let current = 0;
let isAnimating = false;

track.style.display = "flex";
track.style.transition = "transform 0.5s cubic-bezier(.4,0,.2,1)";
slides.forEach(s => {
s.style.minWidth = "100%";
s.style.flexShrink = "0";
});
track.style.overflow = "visible";
carousel.style.overflow = "hidden";

if (dotsContainer) {
slides.forEach((_, i) => {
const dot = document.createElement("button");
dot.className = "carousel-dot" + (i === 0 ? " active" : "");
dot.setAttribute("aria-label", "Slide " + (i + 1));
dot.addEventListener("click", () => goTo(i));
dotsContainer.appendChild(dot);
});
}

const dots = dotsContainer ? dotsContainer.querySelectorAll(".carousel-dot") : [];

function updateDots() {
const idx = ((current % total) + total) % total;
dots.forEach((d, i) => d.classList.toggle("active", i === idx));
}

function goTo(n) {
if (isAnimating) return;
isAnimating = true;
current = n;
track.style.transition = "transform 0.5s cubic-bezier(.4,0,.2,1)";
track.style.transform = "translateX(-" + (current * 100) + "%)";
updateDots();
setTimeout(() => { isAnimating = false; }, 520);
}

function next() {
if (isAnimating) return;
isAnimating = true;
current++;
track.style.transition = "transform 0.5s cubic-bezier(.4,0,.2,1)";
track.style.transform = "translateX(-" + (current * 100) + "%)";
updateDots();
setTimeout(() => {
if (current >= total) {
track.style.transition = "none";
current = 0;
track.style.transform = "translateX(0)";
}
isAnimating = false;
}, 520);
}

function prev() {
if (isAnimating) return;
isAnimating = true;
if (current <= 0) {
track.style.transition = "none";
current = total;
track.style.transform = "translateX(-" + (current * 100) + "%)";
void track.offsetHeight;
}
current--;
track.style.transition = "transform 0.5s cubic-bezier(.4,0,.2,1)";
track.style.transform = "translateX(-" + (current * 100) + "%)";
updateDots();
setTimeout(() => { isAnimating = false; }, 520);
}

slides.forEach(s => track.appendChild(s.cloneNode(true)));

if (prevBtn) prevBtn.addEventListener("click", prev);
if (nextBtn) nextBtn.addEventListener("click", next);

let startX = 0;
let startY = 0;
let dragging = false;
carousel.addEventListener("touchstart", e => {
startX = e.touches[0].clientX;
startY = e.touches[0].clientY;
dragging = true;
}, {passive: true});
carousel.addEventListener("touchend", e => {
if (!dragging) return;
dragging = false;
const dx = e.changedTouches[0].clientX - startX;
const dy = e.changedTouches[0].clientY - startY;
if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
if (dx < 0) next(); else prev();
}
});

let autoLoop = setInterval(next, 8000);
carousel.addEventListener("mouseenter", () => clearInterval(autoLoop));
carousel.addEventListener("mouseleave", () => {
autoLoop = setInterval(next, 8000);
});
});
}

/* ==========================================
BOOKING FORM
========================================== */

function initBookingForm() {
const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");
const checkAvailBtn = document.getElementById("checkAvailBtn");

if (!checkinInput || !checkoutInput) return;

function toLocalDate(d) {
return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
const now = new Date();
const today = toLocalDate(now);
const tmrw = new Date(now);
tmrw.setDate(tmrw.getDate() + 1);
const tomorrowStr = toLocalDate(tmrw);
checkinInput.min = today;
checkinInput.value = today;
checkoutInput.min = tomorrowStr;
checkoutInput.value = tomorrowStr;

checkinInput.addEventListener("change", () => {
if (checkinInput.value) {
const next = new Date(checkinInput.value);
next.setDate(next.getDate() + 1);
checkoutInput.min = next.toISOString().split("T")[0];
if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
checkoutInput.value = next.toISOString().split("T")[0];
}
}
});

function formatDate(dateStr) {
const d = new Date(dateStr);
return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

if (checkAvailBtn) {
checkAvailBtn.addEventListener("click", () => {
if (!checkinInput.value || !checkoutInput.value) {
alert("Please select check-in and check-out dates.");
return;
}

const adultsEl = document.getElementById("adults");
const childrenEl = document.getElementById("children");
const roomEl = document.getElementById("roomType");
const adults = adultsEl ? adultsEl.value : "2 Adults";
const children = childrenEl ? childrenEl.value : "0";
const room = roomEl ? roomEl.value : "Superior King Room";

let guestInfo = adults;
if (children !== "0") {
guestInfo += ", " + children + " " + (children === "1" ? "Child" : "Children");
}

const message = encodeURIComponent(
"Hello Hotel V Kondapur!\n\n" +
"I'd like to check availability:\n\n" +
"Check-in: " + formatDate(checkinInput.value) + "\n" +
"Check-out: " + formatDate(checkoutInput.value) + "\n" +
"Room: " + room + "\n" +
"Guests: " + guestInfo
);
window.open("https://wa.me/919849534566?text=" + message, "_blank");
});
}
}

/* ==========================================
HERO ANIMATION
========================================== */

function initHeroAnimation() {
const hero = document.querySelector(".hero");
if (hero) {
hero.style.opacity = "0";
setTimeout(() => {
hero.style.transition = "opacity 1.2s ease";
hero.style.opacity = "1";
}, 100);
}
}

/* ==========================================
CONTACT FORM
========================================== */

document.addEventListener("DOMContentLoaded", () => {
const contactForm = document.getElementById("contactForm");
if (!contactForm) return;

contactForm.addEventListener("submit", e => {
e.preventDefault();
const name = (document.getElementById("contactName") || {}).value || "";
const msg = (document.getElementById("contactMessage") || {}).value || "";

let text = "Hello Hotel V Kondapur!\n";
if (name.trim()) {
text += "\nI'm " + name.trim() + ".";
}
if (msg.trim()) {
text += "\n\n" + msg.trim();
}

window.open("https://wa.me/919849534566?text=" + encodeURIComponent(text), "_blank");
});
});

/* ==========================================
PAGE LOADER
========================================== */

window.addEventListener("load", () => {
const preloader = document.querySelector(".preloader");
if (preloader) {
preloader.classList.add("hide");
}
});

/* ==========================================
BACK TO TOP
========================================== */

function scrollTopBtn() {
window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================================
CUSTOM SELECT DROPDOWNS
========================================== */

function initCustomSelects() {
document.querySelectorAll(".select-wrapper").forEach(wrapper => {
const select = wrapper.querySelector("select");
if (!select) return;

const customSelect = document.createElement("div");
customSelect.className = "custom-select";
if (select.id === "roomType") customSelect.classList.add("dropup");

const trigger = document.createElement("div");
trigger.className = "custom-select-trigger";
trigger.innerHTML = select.options[select.selectedIndex].text.replace(/\+ GST/g, '<span class="gst-label">+ GST</span>');

const optionsContainer = document.createElement("div");
optionsContainer.className = "custom-select-options";

Array.from(select.options).forEach((option, i) => {
const customOption = document.createElement("div");
customOption.className = "custom-select-option" + (i === select.selectedIndex ? " selected" : "");
customOption.innerHTML = option.text.replace(/\+ GST/g, '<span class="gst-label">+ GST</span>');
customOption.dataset.value = option.value;

customOption.addEventListener("click", () => {
select.value = option.value;
select.dispatchEvent(new Event("change"));
trigger.innerHTML = option.text.replace(/\+ GST/g, '<span class="gst-label">+ GST</span>');
optionsContainer.querySelectorAll(".custom-select-option").forEach(o => o.classList.remove("selected"));
customOption.classList.add("selected");
customSelect.classList.remove("open");
});

optionsContainer.appendChild(customOption);
});

customSelect.appendChild(trigger);
customSelect.appendChild(optionsContainer);
wrapper.appendChild(customSelect);

trigger.addEventListener("click", e => {
e.stopPropagation();
document.querySelectorAll(".custom-select.open").forEach(s => {
if (s !== customSelect) s.classList.remove("open");
});
customSelect.classList.toggle("open");
});
});

document.addEventListener("click", () => {
document.querySelectorAll(".custom-select.open").forEach(s => s.classList.remove("open"));
});
}

/* ==========================================
REVIEWS AUTO-SLIDER
========================================== */

function initReviewsSlider() {
const track = document.getElementById("reviewsTrack");
if (!track) return;

const slides = track.querySelectorAll(".reviews-slide");
if (slides.length === 0) return;

const dotsContainer = document.getElementById("reviewsDots");
let current = 0;

function updateDots() {
dotsContainer.querySelectorAll(".review-dot").forEach((d, i) => {
d.classList.toggle("active", i === current);
});
}

function goToSlide(n) {
current = n;
track.style.transform = "translateX(-" + (current * 100) + "%)";
updateDots();
}

function advance() {
goToSlide((current + 1) % slides.length);
}

let timer = setInterval(advance, 10000);
let paused = false;

slides.forEach((_, i) => {
const dot = document.createElement("button");
dot.className = "review-dot" + (i === 0 ? " active" : "");
dot.addEventListener("click", () => {
goToSlide(i);
clearInterval(timer);
paused = true;
});
dotsContainer.appendChild(dot);
});

const wrapper = track.closest(".reviews-slider");
if (wrapper) {
wrapper.addEventListener("mouseenter", () => clearInterval(timer));
wrapper.addEventListener("mouseleave", () => { if (!paused) { timer = setInterval(advance, 10000); } });
let sx = 0, sy = 0, sd = false;
wrapper.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; sd = true; }, {passive: true});
wrapper.addEventListener("touchend", e => {
if (!sd) return; sd = false;
const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
goToSlide(dx < 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length);
clearInterval(timer); timer = setInterval(advance, 10000);
}
});
}
}

/* ==========================================
DINING CAROUSEL
========================================== */

function initDiningCarousel() {
const track = document.querySelector(".dining-track");
if (!track) return;

const slides = track.querySelectorAll(".dining-slide");
if (slides.length === 0) return;

const dotsContainer = document.getElementById("diningDots");
let current = 0;

slides.forEach((_, i) => {
const dot = document.createElement("button");
dot.className = "dining-dot" + (i === 0 ? " active" : "");
dot.addEventListener("click", () => { goToSlide(i); resetTimer(); });
dotsContainer.appendChild(dot);
});

function updateDots() {
dotsContainer.querySelectorAll(".dining-dot").forEach((d, i) => {
d.classList.toggle("active", i === current);
});
}

function goToSlide(n) {
current = n;
track.style.transform = "translateX(-" + (current * 100) + "%)";
updateDots();
}

function advance() {
goToSlide((current + 1) % slides.length);
}

let timer = setInterval(advance, 8000);
function resetTimer() { clearInterval(timer); timer = setInterval(advance, 8000); }

const wrapper = track.closest(".dining-carousel");
if (wrapper) {
wrapper.addEventListener("mouseenter", () => clearInterval(timer));
wrapper.addEventListener("mouseleave", () => {
timer = setInterval(advance, 8000);
});
let sx = 0, sy = 0, sd = false;
wrapper.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; sd = true; }, {passive: true});
wrapper.addEventListener("touchend", e => {
if (!sd) return; sd = false;
const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
goToSlide(dx < 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length);
resetTimer();
}
});
}
}

/* ==========================================
BANQUET CAROUSEL
========================================== */

function initBanquetCarousel() {
const track = document.querySelector(".banquet-carousel-track");
if (!track) return;

const slides = track.querySelectorAll(".banquet-carousel-slide");
if (slides.length === 0) return;

const dotsContainer = document.getElementById("banquetDots");
let current = 0;

slides.forEach((_, i) => {
const dot = document.createElement("button");
dot.className = "banquet-carousel-dot" + (i === 0 ? " active" : "");
dot.addEventListener("click", () => { goToSlide(i); resetTimer(); });
dotsContainer.appendChild(dot);
});

function updateDots() {
dotsContainer.querySelectorAll(".banquet-carousel-dot").forEach((d, i) => {
d.classList.toggle("active", i === current);
});
}

function goToSlide(n) {
current = n;
track.style.transform = "translateX(-" + (current * 100) + "%)";
updateDots();
}

function advance() {
goToSlide((current + 1) % slides.length);
}

let timer = setInterval(advance, 8000);
function resetTimer() { clearInterval(timer); timer = setInterval(advance, 8000); }

const wrapper = track.closest(".banquet-carousel");
if (wrapper) {
wrapper.addEventListener("mouseenter", () => clearInterval(timer));
wrapper.addEventListener("mouseleave", () => { timer = setInterval(advance, 8000); });
let sx = 0, sy = 0, sd = false;
wrapper.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; sd = true; }, {passive: true});
wrapper.addEventListener("touchend", e => {
if (!sd) return; sd = false;
const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
goToSlide(dx < 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length);
resetTimer();
}
});
}
}

/* ==========================================
GALLERY CAROUSEL
========================================== */

function initGalleryCarousel() {
const track = document.querySelector(".gallery-carousel-track");
if (!track) return;

const allSlides = Array.from(track.querySelectorAll(".gallery-carousel-slide"));
if (allSlides.length === 0) return;

const counter = document.getElementById("galleryCurrentSlide");
const totalEl = document.getElementById("galleryTotalSlides");
let visibleSlides = allSlides;
let current = 0;

function filterSlides(category) {
allSlides.forEach(s => {
var show = category === "all" || s.dataset.category === category;
s.style.display = show ? "" : "none";
s.style.minWidth = show ? "100%" : "0";
s.style.width = show ? "100%" : "0";
});
visibleSlides = allSlides.filter(s => s.style.display !== "none");
if (totalEl) totalEl.textContent = visibleSlides.length;
current = 0;
track.style.transition = "none";
goToSlide(0);
requestAnimationFrame(() => { track.style.transition = "transform 0.5s cubic-bezier(.4,0,.2,1)"; });
resetTimer();
}

function goToSlide(n) {
if (visibleSlides.length === 0) return;
current = ((n % visibleSlides.length) + visibleSlides.length) % visibleSlides.length;
var idx = allSlides.indexOf(visibleSlides[current]);
var offset = 0;
for (var i = 0; i < idx; i++) {
if (allSlides[i].style.display !== "none") offset++;
}
track.style.transform = "translateX(-" + (offset * 100) + "%)";
if (counter) counter.textContent = current + 1;
}

function advance() { goToSlide(current + 1); }

let timer = setInterval(advance, 5000);
function resetTimer() { clearInterval(timer); timer = setInterval(advance, 5000); }

const wrapper = track.closest(".gallery-carousel");
if (wrapper) {
let sx = 0, sy = 0, sd = false;
wrapper.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; sd = true; }, {passive: true});
wrapper.addEventListener("touchend", e => {
if (!sd) return; sd = false;
const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
goToSlide(dx < 0 ? current + 1 : current - 1);
resetTimer();
}
});
}

window._galleryCarouselFilter = filterSlides;
}

/* ==========================================
ROOM BOOK NOW BUTTONS
========================================== */

function initRoomBookButtons() {
document.querySelectorAll(".room-book-btn").forEach(btn => {
btn.addEventListener("click", e => {
const roomVal = btn.getAttribute("data-room");
const roomSelect = document.getElementById("roomType");
if (roomSelect && roomVal) {
roomSelect.value = roomVal;
const selectedOption = roomSelect.querySelector('option[value="' + roomVal + '"]');
const displayText = selectedOption ? selectedOption.textContent : roomVal;
const wrapper = roomSelect.closest(".select-wrapper");
const customTrigger = wrapper.querySelector(".custom-select-trigger");
if (customTrigger) customTrigger.innerHTML = displayText.replace(/\+ GST/g, '<span class="gst-label">+ GST</span>');
const options = wrapper.querySelectorAll(".custom-select-option");
options.forEach(o => {
o.classList.toggle("selected", o.dataset.value === roomVal);
});
}
});
});
}
