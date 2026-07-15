import reactLogo from './assets/react.svg';

function Learn() {
  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold text-blue-400 mb-10">
        Here I will add the content of LEARN PAGE
      </h1>

      <div className="flex flex-col items-center justify-center mt-10">

        <img
          src={reactLogo}
          alt="React Logo"
          className="w-40 h-40 animate-bounce  transition duration-700"
        />

        <h1 className="text-5xl font-bold mt-4">
          React
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          The library for web and native user interfaces
        </p>

        <div className="flex gap-4 mt-6">
  <button
    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition duration-300" onClick={()=>window.open('https://react.dev/learn', '_blank')}>
  
    Get Started
  </button>

  <button
    className="border border-gray-400 hover:bg-gray-100 px-6 py-2 rounded transition duration-300"
  >
    API Reference
  </button>
</div>
      </div>

    </div>
  );
}

export default Learn;