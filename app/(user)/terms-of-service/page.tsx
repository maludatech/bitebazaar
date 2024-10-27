"use client";

const TermsOfService = () => {
  return (
    <div className="relative text-[#444444] font-roboto px-4 py-28 min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center">
        <img
          src="/assets/images/burger-solid.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 body-container">
        <h1 className="text-start text-3xl font-bold font-poppins mb-6">Our Terms & Conditions</h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Welcome to BiteBazaar</h2>
          <p>
            Thank you for choosing BiteBazaar! These Terms of Service ("Terms") govern your use of our services and website. By placing an order with BiteBazaar, you agree to be bound by these Terms. Please read them carefully.
          </p>
        </section>

        {/* Orders and Payment */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Orders and Payment</h2>
          <p>
            BiteBazaar offers a variety of delicious items, including burgers, shawarma, different sorts of drinks and chicken dishes. Orders can be placed through our website or mobile application. Payment is required at the time of placing the order, and once completed, orders are final and cannot be refunded.
          </p>
          <p>
            All sales are final. BiteBazaar does not issue refunds once an order is placed, even in the event of customer cancellation.
          </p>
        </section>

        {/* Delivery Policy */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Delivery Policy</h2>
          <p>
            BiteBazaar is committed to delivering orders within two hours of receiving your order. While we strive to meet this delivery timeframe, please note that delays may occasionally occur due to high demand or other unforeseen circumstances. In such cases, our team will notify you of any significant delays.
          </p>
        </section>

        {/* Privacy and Data Protection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. BiteBazaar will only use your personal information to process and deliver your order. We do not share, sell, or use your personal information or payment details, including credit card information, for any other purposes beyond processing your order.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
          <p>
            BiteBazaar reserves the right to modify these Terms at any time. Any changes will be effective immediately upon posting on our website. We encourage you to review our Terms regularly to stay informed of any updates.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p>
            For any questions or concerns regarding these Terms, please reach out to our customer support team at +2348163887385 or bitebazaarltd@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
