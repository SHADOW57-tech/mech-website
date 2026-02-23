import RepairForm from "../components/RepairForm";
import PartsGrid from "../components/PartsGrid";

export default function BookAndOrder() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-gray-600">
      <div className="flex flex-col lg:flex-row gap-12 w-full">
        {/* Book Repair Section */}
        <div className="w-full lg:w-1/2 bg-gray-400 p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-[#B22222] mb-4">
            📋 Book a Repair
          </h2>
          <RepairForm />
        </div>

        {/* Order Parts Section */}
        <div className="w-full lg:w-1/2 bg-gray-400 p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">
            🛒 Order Car Parts
          </h2>
          <PartsGrid />
        </div>
      </div>
    </section>
  );
}
