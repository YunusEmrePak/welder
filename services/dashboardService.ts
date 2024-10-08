import { totolEmployeeCostDb } from "@/database/employeeDb"
import { totalCollectedMoneyDb, totalDebtDb, totalMaterialCostDb } from "@/database/projectDb"

export const totalCollectedMoney = (): number => {
    return totalCollectedMoneyDb()
}

export const totalDebt = (): number => {
    return totalDebtDb()
}

export const totalMaterialCost = (): number => {
    return totalMaterialCostDb()
}

export const totolEmployeeCost = (): number => {
    return totolEmployeeCostDb()
}

export const totalProfit = (): number => {
    return totalCollectedMoney() - totalMaterialCost() - totolEmployeeCost()
}
