import { Building2 } from "lucide-react";

const ProductionCompanies = ({ companies }) => {
  if (!companies?.length) return null;
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
        <Building2 className="w-5 h-5 text-yellow-400" />
        Production Companies
      </h2>
      <span className="text-gray-400 mt-1">
        {companies.map((company, index) => (
          <span key={company.id}>
            {company.name}
            {index < companies.length - 1 && (
              <span className="mx-2 text-gray-500">•</span>
            )}
          </span>
        ))}
      </span>
    </div>
  );
};

export default ProductionCompanies;