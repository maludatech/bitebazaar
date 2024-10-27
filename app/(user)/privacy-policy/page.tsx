"use client";

const PrivacyPolicy = () => {
  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white mx-auto px-4 py-28 sm:py-24 min-h-screen">
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
        <h1 className="text-start text-3xl font-bold font-poppins mb-6">Privacy Policy</h1>
        
        {/* Introduction */}
        <section className="mb-8">
          <p>
            At BiteBazaar, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By using BiteBazaar, you agree to the practices described in this policy.
          </p>
        </section>

        {/* Information Collection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <p>
            We may collect personal information that you provide to us directly, such as your name, contact information, address, and payment details when placing an order. Additionally, we may collect information about your device, browser, and usage patterns when you visit our website.
          </p>
        </section>

        {/* Use of Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
          <p>
            BiteBazaar uses the information we collect for the following purposes:
          </p>
          <ul className="list-disc ml-6">
            <li>To process and fulfill your orders.</li>
            <li>To communicate with you regarding your order status and customer support inquiries.</li>
            <li>To improve our website, products, and services based on your feedback and preferences.</li>
          </ul>
          <p>We will not use your personal information for any other purpose without your consent.</p>
        </section>

        {/* Sharing of Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Sharing Your Information</h2>
          <p>
            BiteBazaar respects your privacy and does not sell, trade, or otherwise transfer your personal information to outside parties. We may share your information with third-party service providers who assist us in processing payments and delivering your order. All third-party partners are required to maintain the confidentiality of your information.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Data Security</h2>
          <p>
            We implement security measures to protect your personal information against unauthorized access and use. While we strive to ensure the security of your data, please note that no data transmission over the internet or storage system can be guaranteed to be 100% secure.
          </p>
        </section>

        {/* Cookies and Tracking */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Cookies and Tracking Technologies</h2>
          <p>
            BiteBazaar may use cookies and similar tracking technologies to enhance your experience on our website, analyze site traffic, and understand customer preferences. You can set your browser to refuse cookies or alert you when cookies are being sent.
          </p>
        </section>

        {/* Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
          <p>
            BiteBazaar reserves the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new policy on our website. You are encouraged to review this Privacy Policy periodically to stay informed of updates.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our Privacy Policy, please contact us at +2348163887385 or bitebazaarltd@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
