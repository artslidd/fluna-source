import { SignOutButton } from "@ui/components/SignOutButton";
export const Overall = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Patrimoine
        </h1>
        <SignOutButton />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600 dark:text-gray-300">
              Votre patrimoine est composé de 100% d&apos;actions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
