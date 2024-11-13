import React from "react";
import { CreditCard, Info, Calendar,XCircle} from "lucide-react";

const PaymentSection = ({ closeModal }) => {
  return (
    <section className="bg-white lg:px-6 py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Payment</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <XCircle className="w-6 h-6" aria-label="Close modal" />
            </button>
          </div>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            {/* Payment Form */}
            <form
              action="#"
              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8"
            >
              <div className="mb-6 grid grid-cols-2 gap-4">
                {/* Full Name Field */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900">
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    required
                  />
                </div>

                {/* Card Number Field */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900">
                    Card number*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="card-number-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-5"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      required
                    />
                    <CreditCard className="absolute right-3 top-3 text-gray-500 h-5 w-5" />
                  </div>
                </div>

                {/* Card Expiration Field */}
                <div>
                  <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900">
                    Card expiration*
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
                    <input
                      type="text"
                      id="card-expiration-input"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-5"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                </div>

                {/* CVV Field */}
                <div>
                  <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900">
                    CVV*
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-900"
                      aria-label="CVV info"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder="•••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-green-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Pay now
              </button>
            </form>

            {/* Order Summary */}
            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Original price</dt>
                    <dd className="text-base font-medium text-gray-900">$6,592.00</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Savings</dt>
                    <dd className="text-base font-medium text-green-500">-$299.00</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900">$99</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Tax</dt>
                    <dd className="text-base font-medium text-gray-900">$799</dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">$7,191.00</dd>
                </dl>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 flex items-center justify-center gap-8">
                <img
                  className="h-8 w-auto "
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                  alt="PayPal"
                />
                <img
                  className="hidden h-8 w-auto "
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                  alt="PayPal Dark"
                />
                <img
                  className="h-8 w-auto "
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                  alt="Visa"
                />
                <img
                  className="hidden h-8 w-auto "
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                  alt="Visa Dark"
                />
                <img
                  className="h-8 w-auto "
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                  alt="MasterCard"
                />
                <img
                  className="hidden h-8 w-auto "
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                  alt="MasterCard Dark"
                />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-500 sm:mt-8 lg:text-left">
            Payment processed by{" "}
            <a href="#" className="font-medium text-primary-700 underline hover:no-underline ">
              Pay Here
            </a>{" "}
            for{" "}
            <a href="#" className="font-medium text-primary-700 underline hover:no-underline ">
              AJ Masala
            </a>{" "}
            - Srilanka
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
