import { totolEmployeeCostDb } from "@/database/employeeDb"
import { numberOfCanceledProjectsDb, numberOfDoneProjectsDb, numberOfInProgressProjectsDb, numberOfNotStartedProjectsDb, totalCollectedMoneyDb, totalDebtDb, totalMaterialCostDb } from "@/database/projectDb"

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

export const numberOfNotStartedProjects = (): number => {
 return numberOfNotStartedProjectsDb()   
}

export const numberOfInProgressProjects = (): number => {
    return numberOfInProgressProjectsDb()
}

export const numberOfDoneProjects = (): number => {
    return numberOfDoneProjectsDb()
}

export const numberOfCancelledProjects = (): number => {
    return numberOfCanceledProjectsDb()
}
