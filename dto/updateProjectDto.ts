export interface UpdateProjectDto {
  id: number;
  title: string | null;
  detail: string | null;
  customer: string | null;
  status: string | null;
  price: number | null;
  material_cost: number | null;
  paid_amount: number | null;
}
