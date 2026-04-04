export default function RefundPolicyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Refund Policy</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            How refunds and cancellations are handled at Da-Rocha Travel &amp; Tour Agency.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-4">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().getFullYear()}
          </p>
          <p className="text-gray-700 leading-relaxed">
            We understand that travel plans can change. Our Refund Policy is designed to be as
            fair and transparent as possible while respecting the rules of our travel
            partners.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Cancellations by the Traveler
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>
              Cancellation terms vary by package, airline, hotel, and tour operator. Specific
              conditions will be provided with your booking confirmation.
            </li>
            <li>
              In many cases, deposits are non-refundable. Some services may be fully
              non-refundable once confirmed.
            </li>
            <li>
              Where refunds are permitted, they may be subject to supplier penalties and our
              administrative fees.
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Cancellations or Changes by Suppliers
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If a supplier cancels or significantly changes your booking, we will do our best
            to assist with alternative arrangements or secure a refund according to the
            supplier&apos;s policies. Refund processing times may vary depending on the
            supplier and payment method.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4">
            Travel Insurance
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We strongly recommend purchasing comprehensive travel insurance to cover
            unexpected events such as illness, flight disruptions, or other emergencies that
            may affect your trip and eligibility for refunds.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about our policies or need clarification on the terms
            that apply to your specific booking, please contact our team before confirming
            your reservation.
          </p>
        </div>
      </section>
    </div>
  );
}

