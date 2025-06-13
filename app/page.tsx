import Link from "next/link";

const WelcomeTaskSubmission = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to TaskFlow
          </h1>
          <p className="text-lg text-gray-600">Submit By manikandan Siva</p>
          <Link
            className="p-3 bg-gray-700 text-shadow-white rounded-lg mx-auto"
            href={"/hrm/attendance"}
          >
            HRM page
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden text-black">
          <div className="p-6 sm:p-8">
            <h1 className="text-lg font-bold">
              Tech Stack used : Next js + Typescript + tailwindcss
            </h1>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          {/* <p>Need help? Contact your administrator at admin@company.com</p> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomeTaskSubmission;
