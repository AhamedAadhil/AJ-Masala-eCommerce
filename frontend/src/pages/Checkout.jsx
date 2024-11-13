import { ShoppingCart, CircleCheck, ListOrdered } from "lucide-react";
import CheckoutItems from "../components/CheckoutItems";
import PaymentSection from "../components/PaymentSection";

const openModal = () => {
  document.getElementById("my_modal_1").showModal();
};

const closeModal = () => {
  document.getElementById("my_modal_1").close();
};

const Checkout = () => {
  return (
    <section className="bg-white rounded-md shadow-md lg:mt-4 lg:px-4 py-4 antialiased md:py-16">
      <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 sm:text-base">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                <ShoppingCart />
                Cart
              </span>
            </li>
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-20 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                <CircleCheck />
                Checkout
              </span>
            </li>
            <li className="flex shrink-0 items-center">
              <ListOrdered />
              Order summary
            </li>
          </ol> */}

        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Payment Method
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Repeated payment method options */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        aria-describedby="credit_card"
                        type="radio"
                        name="payment-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                        checked
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="credit_card"
                        className="font-medium leading-none text-gray-900"
                      >
                        Pay with Card
                      </label>
                      <p
                        id="credit_card"
                        className="mt-1 text-xs font-normal text-gray-500"
                      >
                        Pay with your credit/Debit card
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="cod"
                        aria-describedby="cod"
                        type="radio"
                        name="payment-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="cod"
                        className="font-medium leading-none text-gray-900"
                      >
                        COD
                      </label>
                      <p
                        id="cod"
                        className="mt-1 text-xs font-normal text-gray-500"
                      >
                        Cash on delivery
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="bank_deposite"
                        aria-describedby="bank_deposite"
                        type="radio"
                        name="payment-method"
                        value=""
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="paypal-2"
                        className="font-medium leading-none text-gray-900"
                      >
                        Bank Deposite
                      </label>
                      <p
                        id="bank_deposite"
                        className="mt-1 text-xs font-normal text-gray-500"
                      >
                        Deposite the amount to our bank account
                      </p>
                    </div>
                  </div>
                </div>
                {/* Repeated payment method options */}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder="Bonnie Green"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobile_number"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    id="mobile_number"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder="07x xxx xxxx"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="house_number"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    House Number
                  </label>
                  <input
                    type="text"
                    id="house_number"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="street"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="province"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    State/Province
                  </label>
                  <select
                    id="province"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="EP">Eastern</option>
                    <option value="NP">Nothern</option>
                    <option value="NW">North Western</option>
                    <option value="NC">Nothern Central</option>
                    <option value="SP">Southern</option>
                    <option value="WP">Western</option>
                    <option value="CP">Central</option>
                    <option value="SP">Sabragamuwa</option>
                    <option value="UP">UVA</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="zip_code"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Zip Code
                  </label>
                  <input
                    type="number"
                    id="zip_code"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                    placeholder="xxxxx"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div>
              <CheckoutItems />
            </div>

            <div>
              <label
                htmlFor="voucher"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Enter a gift card, voucher or promotional code
              </label>
              <div className="flex max-w-md items-center gap-4">
                <input
                  type="text"
                  id="voucher"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                  placeholder=""
                  required
                />
                <button
                  type="button"
                  className="flex items-center justify-center rounded-lg bg-blue-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-500">
                {/* Repeated summary details */}

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    $8,094.00
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 ">
                    Shipping
                  </dt>
                  <dd className="text-base font-medium text-gray-900">0</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500">
                    Discount
                  </dt>
                  <dd className="text-base font-medium text-green-500">-$99</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 ">Total</dt>
                  <dd className="text-base font-bold text-gray-900 ">
                    $8,392.00
                  </dd>
                </dl>

                {/* Repeated summary details */}
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                onClick={openModal}
              >
                Proceed to Payment
              </button>
              
              <dialog id="my_modal_1" className="modal rounded-2xl shadow-2xl">
                <div className="modal-box">
                  <PaymentSection closeModal={closeModal} />
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
