import { FileText } from "lucide-react";

const Overview = ({ overview }) => (
  <div>
    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
      <FileText className="w-5 h-5 text-yellow-400" />
      Overview
    </h2>
    <p className="text-gray-400 leading-relaxed">{overview}</p>
  </div>
);

export default Overview;