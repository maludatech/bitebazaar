"use client";

const CookiePolicy = () => {
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
        <h1 className="text-start text-3xl font-bold font-poppins mb-6">Cookie Policy</h1>

        {/* Introduction */}
        <section className="mb-8">
          <p>
            This Cookie Policy explains how BiteBazaar ("we," "us," or "our") uses cookies and similar tracking technologies on our website to provide, improve, and protect our services. By continuing to use our website, you consent to our use of cookies as described in this policy.
          </p>
        </section>

        {/* What Are Cookies? */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit websites. They help websites recognize your device and remember information about your visit, such as your language preference, login details, and other settings, enhancing your browsing experience.
          </p>
        </section>

        {/* Types of Cookies We Use */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Types of Cookies We Use</h2>
          <p>We use the following types of cookies on BiteBazaar:</p>
          <ul className="list-disc ml-6">
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the operation of our website. They enable you to navigate our website and use essential features, such as accessing secure areas of the site.
            </li>
            <li>
              <strong>Performance Cookies:</strong> These cookies collect information about how visitors use our website, allowing us to improve its functionality. For example, they help us understand which pages are most popular and monitor any errors encountered.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These cookies allow our website to remember your preferences, such as your language or region, to provide a more personalized experience.
            </li>
            <li>
              <strong>Targeting Cookies:</strong> We may use these cookies to deliver relevant advertisements and measure the effectiveness of our marketing campaigns.
            </li>
          </ul>
        </section>

        {/* Managing Cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through your browser settings. You can choose to disable cookies, block them, or delete them after they are stored. However, please note that if you disable cookies, some features of our website may not function as intended.
          </p>
        </section>

        {/* Third-Party Cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Third-Party Cookies</h2>
          <p>
            BiteBazaar may use third-party cookies to provide services on our behalf, such as analytics or advertising. These third-party providers may use cookies to collect information about your interactions with our website and other sites. We do not have control over these third-party cookies.
          </p>
        </section>

        {/* Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices. Any updates will be posted on this page, and we encourage you to review it periodically.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy, please contact us at +2348163887385 or bitebazaarltd@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy;
