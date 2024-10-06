export interface Project {
  id: number | null;
  title: string;
  detail: string;
  customer: string;
  status: string;
  price: number;
  material_cost: number;
  create_date: string;
  start_date: string | null;
  finish_date: string | null;
  paid_amount: number;
  debt_amount: number;
}
