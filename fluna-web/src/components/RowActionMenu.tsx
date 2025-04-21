import React from "react";
import { DeleteDevisModalButton } from "@ui/components/devis/DeleteDevisModal";
import { ViewDevisModalButton } from "@ui/components/devis/ViewDevisModal";
import { Database } from "@ui/types/db";
import { Button } from "@ui/ui-library/button";
import { Download } from "lucide-react";

type Devis = Database["public"]["Tables"]["devis"]["Row"];
interface RowActionMenuProps {
  devis: Devis;
  //   onEdit: (devis: Devis) => void;
  onDelete: (devisId: string) => void;
  onExport: (devis: Devis) => void;
}

export const RowActionMenu: React.FC<RowActionMenuProps> = ({
  devis,
  // onEdit,
  onDelete,
  onExport,
}) => {
  return (
    <div
      className={`
        w-full h-full 
        flex items-center justify-center p-1 space-x-1 
        bg-transparent
      `}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <ViewDevisModalButton selectedDevis={devis} />
      <Button
        variant="outline"
        size="sm"
        onPress={() => onExport(devis)}
        aria-label="Exporter en PDF"
        tooltip="Exporter en PDF"
      >
        <Download className="h-4 w-4" />
      </Button>
      <DeleteDevisModalButton devisId={devis.id} onDelete={onDelete} />
    </div>
  );
};
