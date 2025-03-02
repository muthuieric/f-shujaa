<div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <Image
          src="/2.webp" // Replace with your image path
          alt="Hero Image"
          fill
          className="object-cover"
          priority // Ensures the image loads first
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Welcome to Our Website
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
              Discover amazing features and services tailored for you.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
              Get Started
          </button>
      </div>
  </div>