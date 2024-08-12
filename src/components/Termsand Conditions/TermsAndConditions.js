import React from 'react';
import './TermsAndConditions.css';

function TermsAndConditions() {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>
      
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to TransitWise. By accessing or using our online bus booking platform, you agree to be bound by the following terms and conditions. Please read them carefully before using our services.</p>
      </section>

      <section>
        <h2>2. Booking and Payment</h2>
        <p>All bookings must be made through our website or mobile application. Payment for tickets must be made in full at the time of booking. We accept various payment methods including credit/debit cards and mobile money.</p>
        <ul>
          <li>Ensure all payment details are accurate to avoid delays or cancellations.</li>
          <li>Payment is processed securely through our payment gateway provider.</li>
          <li>After payment, you will receive a confirmation email with your ticket details.</li>
        </ul>
      </section>

      <section>
        <h2>3. Cancellations and Refunds</h2>
        <p>Cancellations made within 24 hours of the scheduled departure time will not be eligible for a refund. Cancellations made prior to this period may be eligible for a refund, subject to our discretion and a cancellation fee.</p>
        <ul>
          <li>No-shows are not eligible for refunds.</li>
          <li>Refunds, where applicable, will be processed within 7 business days.</li>
          <li>Refunds are credited back to the original payment method.</li>
        </ul>
      </section>

      <section>
        <h2>4. Passenger Responsibilities</h2>
        <p>Passengers are responsible for ensuring they arrive at the designated boarding point on time. TransitWise is not responsible for missed buses due to passenger tardiness.</p>
        <ul>
          <li>Ensure you have all necessary travel documents (e.g., ID, ticket).</li>
          <li>Adhere to the bus company's policies regarding luggage and behavior.</li>
          <li>Any damages to the bus or property caused by the passenger will be charged to the passenger.</li>
        </ul>
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        <p>TransitWise is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the ticket.</p>
        <ul>
          <li>We are not liable for delays or cancellations caused by unforeseen events.</li>
          <li>We are not responsible for loss or damage to personal belongings.</li>
        </ul>
      </section>

      <section>
        <h2>6. Changes to Terms</h2>
        <p>TransitWise reserves the right to modify these terms and conditions at any time. Changes will be posted on this page, and continued use of our services constitutes acceptance of the updated terms.</p>
      </section>

      <section>
        <h2>7. Governing Law</h2>
        <p>These terms and conditions are governed by the laws of Kenya. Any disputes arising from these terms will be subject to the jurisdiction of the Kenyan courts.</p>
      </section>

      <section>
        <h2>8. Contact Information</h2>
        <p>For any questions or concerns regarding these terms, please contact our customer support team at support@transitwise.com.</p>
      </section>
    </div>
  );
}

export default TermsAndConditions;
