import { Button } from "../ui/button";
import { IconDownload } from "@tabler/icons-react";

type ExportButtonsProps = {
  onExportCSV: () => void;
  onExportPDF?: () => void;
};

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  onExportCSV,
}) => {
  return (
    <div className="space-x-4 poppins text-white">
      <Button
        variant="ghost"
        className="bg-emerald-600 dark:bg-blue-500 h-11"
        onClick={onExportCSV}
      >
        <IconDownload className="" />
        Importer en CSV
      </Button>
    </div>
  );
};
