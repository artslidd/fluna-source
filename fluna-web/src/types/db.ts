export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      devis: {
        Row: {
          client_email: string;
          created_at: string;
          date: string;
          due_date: string;
          id: string;
          items: Json;
          notes: string | null;
          number: string;
          status: Database["public"]["Enums"]["devis_status"];
          subtotal: number;
          tax: number;
          terms: string | null;
          total: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          client_email: string;
          created_at?: string;
          date: string;
          due_date: string;
          id?: string;
          items?: Json;
          notes?: string | null;
          number: string;
          status?: Database["public"]["Enums"]["devis_status"];
          subtotal: number;
          tax: number;
          terms?: string | null;
          total: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          client_email?: string;
          created_at?: string;
          date?: string;
          due_date?: string;
          id?: string;
          items?: Json;
          notes?: string | null;
          number?: string;
          status?: Database["public"]["Enums"]["devis_status"];
          subtotal?: number;
          tax?: number;
          terms?: string | null;
          total?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      devis_status: "draft" | "sent" | "accepted" | "rejected" | "expired";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
