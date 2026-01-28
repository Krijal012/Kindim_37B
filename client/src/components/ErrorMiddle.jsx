function ErrorMiddle() {
    const handleReload = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-16 px-4 sm:px-6 py-8 sm:py-12 lg:py-20 max-w-6xl mx-auto min-h-screen">
            {/* Left Side - Text Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 max-w-lg">
                {/* 404 Title */}
                <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold text-blue-600">
                    404
                </h1>

                {/* Page Not Found */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                    We couldn't find the page you were looking for. It might have been moved or deleted.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-4">
                    <button
                        onClick={handleReload}
                        className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white border-2 border-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                        Reload Page
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    >
                        Go to HomePage
                    </button>
                </div>
            </div>

            {/* Right Side - Error Image */}
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
                <img
                    src="https://via.placeholder.com/800x600?text=404+Not+Found"
                    alt="Error Page"
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>
    );
}

export default ErrorMiddle;