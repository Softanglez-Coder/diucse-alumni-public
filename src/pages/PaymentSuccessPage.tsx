export const PaymentSuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="text-gray-700 mb-6">Thank you for your payment. Your transaction has been completed successfully.</p>
            <a href="/" className="text-blue-500 hover:underline">Return to Home</a>
        </div>
        </div>
    );
};