import { Input } from "@/components/ui/input";

interface BrandSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const BrandSearch = ({ searchTerm, onSearchChange }: BrandSearchProps) => {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search brands..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};
