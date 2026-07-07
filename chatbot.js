const chatbot = {
    responses: {
        greeting: [
            "Hello! 👋 Welcome to Partway Express Delivery. How can I help you today?",
            "Hi there! 👋 Thanks for reaching out to Partway Express Delivery. What can I do for you?"
        ],
        delivery: [
            "We offer worldwide delivery service available 24/7. We serve Korea and deliver to customers worldwide with reliable and fast service."
        ],
        hours: [
            "We operate 24/7, so you can contact us anytime for your delivery needs!"
        ],
        contact: [
            "You can reach us at:\n📧 Email: leeminhoteam8@gmail.com\n📞 Phone: +49 1578 2223853\n\nOr fill out the contact form and we'll get back to you shortly!"
        ],
        service_area: [
            "We serve Korea and deliver worldwide! No matter where you are, we can help with your delivery needs."
        ],
        tracking: [
            "We provide tracking for all deliveries. Once you place an order, you'll receive tracking information via email."
        ],
        pricing: [
            "Our pricing depends on the destination and delivery speed. For a custom quote, please contact us at leeminhoteam8@gmail.com or call +49 1578 2223853."
        ],
        thanks: [
            "You're welcome! 😊 Is there anything else I can help you with?",
            "Happy to help! Do you have any other questions?"
        ],
        default: [
            "Great question! For more detailed information, please contact us at leeminhoteam8@gmail.com or call +49 1578 2223853. You can also use the contact form above.",
            "I'm here to help! Could you be more specific about what you need? Or feel free to contact our team directly."
        ]
    },

    keywords: {
        greeting: ['hello', 'hi', 'hey', 'greetings', 'sup', 'hiya'],
        delivery: ['delivery', 'deliver', 'shipping', 'ship', 'send', 'parcel', 'package'],
        hours: ['hours', 'open', 'available', 'when', 'time', '24/7', 'operating'],
        contact: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'call us'],
        service_area: ['area', 'where', 'serve', 'location', 'country', 'worldwide', 'korea'],
        tracking: ['track', 'tracking', 'trace', 'status', 'where is my'],
        pricing: ['price', 'cost', 'how much', 'fee', 'charge', 'quote', 'rates'],
        thanks: ['thanks', 'thank you', 'appreciate', 'grateful', 'ty', 'thx', 'thanks!']
    },

    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    },

    categorizeMessage(message) {
        const lowerMessage = message.toLowerCase();
        for (const [category, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                return category;
            }
        }
        return 'default';
    },

    generateResponse(message) {
        const category = this.categorizeMessage(message);
        return this.getRandomResponse(category);
    }
};

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const contactForm = document.getElementById('contactForm');

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    const p = document.createElement('p');
    p.textContent = text;
    messageDiv.appendChild(p);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleSendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    addMessage(message, 'user');
    userInput.value = '';
    setTimeout(() => {
        const botResponse = chatbot.generateResponse(message);
        addMessage(botResponse, 'bot');
    }, 500);
}

sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon at the email address you provided.');
    contactForm.reset();
});