import React from 'react'

const UserForm = () => {
  return (
    <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm bg-white shadow-default">
            
            <form action="#">
              <div className="p-6.5">
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
                    
                    <button className="flex w-5/12 justify-center rounded bg-blue-500 my-5 p-3 font-medium text-white hover:bg-blue-800">
                    Save
                    </button>
                    </div>
                </div>

              </div>
            </form>
          </div>
        </div>
  )
}

export default UserForm