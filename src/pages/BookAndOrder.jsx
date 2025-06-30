import RepairForm from "../components/RepairForm";
import PartsGrid from "../components/PartsGrid";

export default function BookAndOrder() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-12 w-full">
        {/* Book Repair Section */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-red-600 mb-4">📋 Book a Repair</h2>
          <RepairForm />
        </div>

        {/* Order Parts Section */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-green-700 mb-4">🛒 Order Car Parts</h2>
          <PartsGrid />
        </div>
      </div>
    </section>
  );
}
