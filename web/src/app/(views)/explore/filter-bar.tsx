import { Button } from "@/components/ui/button";

// Filter Bar Component
const FilterBar = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Popular Events</h2>
      <div className="flex gap-4">
        <Button variant="outline">Filters</Button>
        <select className="border rounded-md px-3 py-2">
          <option>Sort by: Featured</option>
          <option>Date</option>
          <option>Price</option>
        </select>
      </div>
    </div>
  );
};
