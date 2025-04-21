import { Database } from "@ui/types/db";
import { Button } from "@ui/ui-library/button";
import { DialogBody, DialogFooter } from "@ui/ui-library/dialog";

import { DialogCloseButton } from "@ui/ui-library/dialog";

import { Dialog, DialogHeader } from "@ui/ui-library/dialog";
import { EyeIcon } from "lucide-react";
import { Modal } from "@ui/ui-library/modal";
import { useState } from "react";

type Devis = Database["public"]["Tables"]["devis"]["Row"];

export const ViewDevisModalButton = ({
  selectedDevis,
}: {
  selectedDevis: Devis;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onPress={() => setIsOpen(true)}
        aria-label="Modifier le devis"
        tooltip="Voir le devis"
      >
        <EyeIcon className="w-4 h-4" />
      </Button>
      <ViewDevisModal
        selectedDevis={selectedDevis}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export const ViewDevisModal = ({
  selectedDevis,
  isOpen,
  setIsOpen,
}: {
  selectedDevis: Devis | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Modal size="lg" isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
      <Dialog aria-label="Voir le devis">
        <DialogHeader slot="title">
          <h2 className="text-xl font-semibold">
            Devis {selectedDevis?.number}
          </h2>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Client
                </h3>
                <p className="mt-1">{selectedDevis?.client_email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Statut
                </h3>
                <p className="mt-1">{selectedDevis?.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date de création
                </h3>
                <p className="mt-1">
                  {selectedDevis?.date
                    ? new Date(selectedDevis.date).toLocaleDateString("fr-FR")
                    : ""}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date d&apos;échéance
                </h3>
                <p className="mt-1">
                  {selectedDevis?.due_date
                    ? new Date(selectedDevis.due_date).toLocaleDateString(
                        "fr-FR"
                      )
                    : ""}
                </p>
              </div>
            </div>
            {selectedDevis?.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Notes
                </h3>
                <p className="mt-1 whitespace-pre-wrap">
                  {selectedDevis.notes}
                </p>
              </div>
            )}
            {selectedDevis?.terms && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Conditions
                </h3>
                <p className="mt-1 whitespace-pre-wrap">
                  {selectedDevis.terms}
                </p>
              </div>
            )}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Sous-total
                </span>
                <span>{selectedDevis?.subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  TVA
                </span>
                <span>{selectedDevis?.tax.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between mt-2 font-semibold">
                <span>Total</span>
                <span>{selectedDevis?.total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogCloseButton>Fermer</DialogCloseButton>
        </DialogFooter>
      </Dialog>
    </Modal>
  );
};
