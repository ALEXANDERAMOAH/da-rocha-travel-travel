export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="relative h-64 md:h-72 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            How Da-Rocha Travel &amp; Tour Agency collects, uses, and protects your information.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().getFullYear()}
          </p>
          <p className="text-gray-700 leading-relaxed">
            At Da-Rocha Travel &amp; Tour Agency (&quot;Da-Rocha Travel &amp; Tour Agency&quot;,
            &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we are committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, and safeguard your
            personal information when you visit our website, make a booking, or otherwise interact
            with our services.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              Contact details such as your name, email address, phone number, and mailing
              address.
            </li>
            <li>
              Booking information including travel dates, destinations, passport details (where
              required), and traveler preferences.
            </li>
            <li>
              Payment information processed securely by our payment partners (we do not store
              full card details).
            </li>
            <li>
              Technical data such as IP address, browser type, and device information used to
              improve our website performance and security.
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>To process and manage your travel bookings and inquiries.</li>
            <li>
              To communicate important updates about your trips, including confirmations,
              changes, and support.
            </li>
            <li>
              To personalize your experience and recommend destinations or packages that may
              interest you.
            </li>
            <li>
              To comply with legal obligations and protect our rights and the rights of our
              customers.
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Data Sharing & Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We share your information only with trusted partners necessary to fulfill your
            travel arrangements (such as airlines, hotels, and tour operators) and only to the
            extent required. We implement appropriate technical and organizational measures to
            protect your data from unauthorized access, alteration, or disclosure.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You may contact us at any time to request access to, correction of, or deletion of
            your personal information, subject to applicable legal requirements.
          </p>
        </div>
      </section>
    </div>
  );
}

