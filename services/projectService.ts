import { insertProject } from "@/database/projectDb";
import { notStarted } from "@/enum/status";

export const addProject = (
  title: string,
  detail: string,
  customer: string,
  price: number,
  material_cost: number,
  paid_amount: number
) => {
  const project = {
    title: title,
    detail: detail,
    customer: customer,
    price: price,
    material_cost: material_cost,
    paid_amount: paid_amount,
    create_date: Date.now.toString(),
    status: notStarted,
    debt_amount: price - paid_amount,
    start_date: null,
    finish_date: null,
    id: null,
  };

  insertProject(project);
};
