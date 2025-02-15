import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-4">Last Updated: February 14, 2025</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to Luis Ruiz Tech Services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="mb-4">We collect information that you voluntarily provide to us when you:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Contact us through our website</li>
          <li>Subscribe to our newsletter</li>
          <li>Request a consultation</li>
          <li>Submit job applications</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Respond to your inquiries and provide services</li>
          <li>Send you marketing and promotional communications (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Information Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational security measures to protect your information. However, please note that no security system is impenetrable and we cannot guarantee the security of our systems 100%.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p className="mb-4">Under New York State law, you have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Request access to your personal information</li>
          <li>Request correction of your personal information</li>
          <li>Request deletion of your personal information</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
        <p className="mb-4">
          If you have questions about this Privacy Policy, please contact us at:
          <br />
          Email: [contact email]
          <br />
          Address: [business address]
        </p>
      </section>

      <footer className="text-sm text-gray-600">
        <p>This privacy policy is for informational purposes and does not constitute legal advice. This policy is subject to change without notice.</p>
      </footer>
    </div>
  )
}
