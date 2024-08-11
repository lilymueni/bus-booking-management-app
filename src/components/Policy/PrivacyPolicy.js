import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      
      <section>
        <h2>1. Introduction</h2>
        <p>This Privacy Policy explains how TransitWise collects, uses, and protects your personal information when you use our online bus booking platform.</p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We collect personal information such as your name, contact details, payment information, and travel preferences when you make a booking or create an account on our platform.</p>
        <ul>
          <li>Personal data is collected during account registration, booking, and when you contact us.</li>
          <li>We may also collect data through cookies and other tracking technologies.</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>Your information is used to process bookings, provide customer support, and improve our services. We may also use your contact details to send you updates and promotional offers.</p>
        <ul>
          <li>We use your data to ensure a smooth booking process and enhance your experience.</li>
          <li>Your data helps us tailor our services to meet your needs.</li>
          <li>We may use anonymized data for analytics and research.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or destruction.</p>
        <ul>
          <li>Your data is stored securely on our servers.</li>
          <li>We use encryption and other security technologies to safeguard your data.</li>
          <li>Access to your data is restricted to authorized personnel only.</li>
        </ul>
      </section>

      <section>
        <h2>5. Sharing Your Information</h2>
        <p>We do not sell or rent your personal information to third parties. We may share your information with service providers involved in processing your booking or as required by law.</p>
        <ul>
          <li>We only share your data with trusted partners necessary to provide our services.</li>
          <li>We comply with legal obligations to disclose data when required by law.</li>
        </ul>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information at any time. You can also opt-out of receiving promotional communications from us.</p>
        <ul>
          <li>You can manage your data and preferences through your account settings.</li>
          <li>Contact our support team to exercise your rights or if you have any concerns.</li>
        </ul>
      </section>

      <section>
        <h2>7. Changes to This Policy</h2>
        <p>TransitWise reserves the right to update this Privacy Policy as necessary. Any changes will be posted on this page, and your continued use of our services signifies your acceptance of the updated policy.</p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>For any questions or concerns about this Privacy Policy, please contact us at privacy@transitwise.com.</p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
