import { Button } from "@ui/ui-library/button";
import { DialogBody, DialogFooter } from "@ui/ui-library/dialog";

import { DialogCloseButton } from "@ui/ui-library/dialog";
import { DialogHeader } from "@ui/ui-library/dialog";
import { Dialog } from "@ui/ui-library/dialog";
import { TrashIcon } from "lucide-react";
import { Modal } from "@ui/ui-library/modal";
import { useState } from "react";

export const DeleteDevisModalButton = ({
  devisId,
  onDelete,
}: {
  devisId: string | null;
  onDelete: (devisId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        color="destructive"
        size="sm"
        onPress={() => setIsOpen(true)}
        className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
        aria-label="Supprimer le devis"
        tooltip="Supprimer le devis"
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Dialog aria-label="Supprimer le devis">
          <DialogHeader slot="title">
            <h2 className="text-xl font-semibold text-red-600">
              Supprimer le devis
            </h2>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <p className="text-gray-600 dark:text-gray-300">
              Êtes-vous sûr de vouloir supprimer ce devis ? Cette action est
              irréversible.
            </p>
          </DialogBody>
          <DialogFooter>
            <DialogCloseButton variant="outline">Annuler</DialogCloseButton>
            <Button
              variant="outline"
              color="destructive"
              onPress={() => {
                if (devisId) {
                  onDelete(devisId);
                }
              }}
              aria-label="Supprimer le devis"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </Dialog>
      </Modal>
    </>
  );
};
