import { Button } from "@ui/ui-library/button";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
} from "@ui/ui-library/dialog";
import { Modal } from "@ui/ui-library/modal";
import { PlusIcon } from "lucide-react";
import { Form } from "@ui/ui-library/form";
import { DateField, DateInput } from "@ui/ui-library/date-field";
import { FieldError, Input, Label } from "@ui/ui-library/field";
import { TextField, TextArea } from "@ui/ui-library/field";
import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { calculateTotal } from "@ui/utils/helpers";
import { calculateTax } from "@ui/utils/helpers";

const now = new Date();
const defaultFormData = {
  client_email: "",
  date: new CalendarDate(now.getFullYear(), now.getMonth(), now.getDate()),
  due_date: new CalendarDate(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).add({ days: 30 }),
  notes: "",
  terms: "",
  amount: 0,
  tax_rate: 20,
};

export const CreateDevisModal = ({
  handleCreate,
  dueDateError,
  setDueDateError,
}: {
  handleCreate: (event: React.FormEvent<HTMLFormElement>) => void;
  dueDateError: string;
  setDueDateError: (error: string) => void;
}) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        color="accent"
        className="px-4 bg-sky-900 hover:bg-accent-200 dark:bg-accent-900 dark:hover:bg-accent-800"
        onPress={() => setIsOpen(true)}
        aria-label="Créer un nouveau devis"
      >
        <PlusIcon />
        Nouveau Devis
      </Button>
      <Modal size="lg" isDismissable isOpen={isOpen} onOpenChange={setIsOpen}>
        <Dialog aria-label="Créer un nouveau devis">
          <DialogHeader slot="title">
            <h2 className="text-xl font-semibold">Créer un nouveau devis</h2>
            <DialogCloseButton />
          </DialogHeader>
          <DialogBody>
            <Form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <DateField name="date" defaultValue={defaultFormData.date}>
                  <Label aria-required>Date</Label>
                  <DateInput />
                </DateField>
                <DateField
                  name="due_date"
                  defaultValue={defaultFormData.due_date}
                  isInvalid={!!dueDateError}
                  onChange={() => setDueDateError("")}
                >
                  <Label aria-required>Date d&apos;échéance</Label>
                  <DateInput />
                  <FieldError>{dueDateError}</FieldError>
                </DateField>
              </div>
              <TextField
                name="client_email"
                type="email"
                isRequired
                aria-label="client_email"
              >
                <Label aria-required>Email du client</Label>
                <Input placeholder="Email" />
                <FieldError>
                  {(validationState) => {
                    console.log(validationState);
                    return validationState.validationErrors
                      ? "Veuillez entrer une adresse email valide"
                      : "";
                  }}
                </FieldError>
              </TextField>
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="amount"
                  type="number"
                  isRequired
                  aria-label="amount"
                  defaultValue={formData.amount.toString()}
                  onChange={(value: string) => {
                    const amount = parseFloat(value) || 0;
                    setFormData((prev) => ({
                      ...prev,
                      amount,
                    }));
                  }}
                >
                  <Label aria-required>Montant HT</Label>
                  <Input placeholder="0.00" step="0.01" />
                  <FieldError>
                    {(validationState) => {
                      return validationState.validationErrors
                        ? "Veuillez entrer un montant valide"
                        : "";
                    }}
                  </FieldError>
                </TextField>
                <TextField
                  name="tax_rate"
                  type="number"
                  isRequired
                  aria-label="tax_rate"
                  defaultValue={formData.tax_rate.toString()}
                  onChange={(value: string) => {
                    const tax_rate = parseFloat(value) || 0;
                    setFormData((prev) => ({
                      ...prev,
                      tax_rate,
                    }));
                  }}
                >
                  <Label aria-required>Taux de TVA (%)</Label>
                  <Input placeholder="20" />
                  <FieldError>
                    {(validationState) => {
                      return validationState.validationErrors
                        ? "Veuillez entrer un taux valide"
                        : "";
                    }}
                  </FieldError>
                </TextField>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Montant HT
                  </span>
                  <span>{formData.amount.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    TVA ({formData.tax_rate}%)
                  </span>
                  <span>
                    {calculateTax(formData.amount, formData.tax_rate).toFixed(
                      2
                    )}{" "}
                    €
                  </span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total TTC</span>
                  <span>
                    {calculateTotal(
                      formData.amount,
                      calculateTax(formData.amount, formData.tax_rate)
                    ).toFixed(2)}{" "}
                    €
                  </span>
                </div>
              </div>
              <TextField aria-label="notes">
                <TextArea name="notes" placeholder="Notes" />
              </TextField>
              <TextField aria-label="terms">
                <TextArea name="terms" placeholder="Conditions" />
              </TextField>
              <DialogFooter>
                <DialogCloseButton variant="outline">Annuler</DialogCloseButton>
                <Button
                  variant="solid"
                  color="accent"
                  type="submit"
                  slot="close"
                >
                  Créer
                </Button>
              </DialogFooter>
            </Form>
          </DialogBody>
        </Dialog>
      </Modal>
    </>
  );
};
