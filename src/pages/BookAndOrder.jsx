import RepairForm from "../components/RepairForm";
import PartsGrid from "../components/PartsGrid";

export default function BookAndOrder() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Book Repair */}
        <div className="w-full lg:w-1/2">
          <RepairForm />
        </div>

        {/* Order Parts */}
        <div className="w-full lg:w-1/2">
          <PartsGrid />
        </div>
      </div>
    </section>
  );
}
