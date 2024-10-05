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
    create_date: getCurrentDate(),
    status: notStarted,
    debt_amount: price - paid_amount,
    start_date: null,
    finish_date: null,
    id: null,
  };

  insertProject(project);
};

const getCurrentDate = () => {
  const monthNames = [
    "Ocak",
    "Subat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return `${day} ${monthNames[month]} ${year}`;
};
