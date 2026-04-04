export default function TermsOfServicePage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Terms of Service</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            The conditions that apply when you use Da-Rocha Travel &amp; Tour Agency.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().getFullYear()}
          </p>
          <p className="text-gray-700 leading-relaxed">
            These Terms of Service (&quot;Terms&quot;) govern your use of the Da-Rocha Travel
            &amp; Tour Agency website and services. By accessing our website or making a booking
            with us, you agree to be bound by these Terms. If you do not agree, please do not use
            our services.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Bookings & Payments
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              All bookings are subject to availability and confirmation from our travel
              partners.
            </li>
            <li>
              A deposit or full payment may be required at the time of booking, depending on
              the package and supplier terms.
            </li>
            <li>
              You are responsible for providing accurate traveler information and reviewing all
              details on your confirmation documents.
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Your Responsibilities
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              Ensure that you have valid passports, visas, and any required travel documents
              for your destination.
            </li>
            <li>
              Comply with all health, safety, and entry requirements imposed by airlines,
              hotels, and local authorities.
            </li>
            <li>
              Arrive on time for flights, tours, and transfers; missed services due to late
              arrival may be non-refundable.
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Changes, Cancellations & Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Many of our services are provided by independent third-party suppliers, each with
            their own terms and conditions. We will communicate applicable supplier terms at
            the time of booking. Changes or cancellations to your trip may incur additional
            fees as specified by those suppliers as well as our own service fees.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Da-Rocha Travel &amp; Tour Agency is not liable for acts or omissions of third-party
            suppliers, including but not limited to delays, cancellations, or service
            interruptions outside of our direct control.
          </p>
        </div>
      </section>
    </div>
  );
}

