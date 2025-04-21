import { Button } from "../ui-library/button";
import { useLogout } from "../hooks/auth";
import { LogOutIcon } from "lucide-react";

export const SignOutButton = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <div
      className={`
        relative
        inline-block
        transition-all
        duration-200
        ease-in-out
        hover:scale-[1.02]
        active:scale-95
      `}
    >
      <Button
        onPress={() => logout()}
        variant="outline"
        color="destructive"
        size="sm"
        className={`
          relative
          overflow-hidden
          border-0
          py-2
          px-0
          transition-all
          duration-200
          ease-in-out
          hover:bg-destructive/10
          hover:text-destructive
          ${isPending ? "opacity-70 cursor-not-allowed" : ""}
        `}
        isDisabled={isPending}
      >
        <div className="flex items-center gap-2">
          <LogOutIcon
            className={`
              transition-transform
              duration-200
              "hover:translate-x-[-2px]"
              ${isPending ? "animate-spin" : ""}
            `}
            size={16}
          />
          <span className="font-medium">Déconnexion</span>
        </div>
        {isPending && <div className="absolute inset-0 bg-destructive/5" />}
      </Button>
    </div>
  );
};
