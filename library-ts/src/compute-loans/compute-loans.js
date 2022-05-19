/**
 * 公式：等额本息
 * P:贷款本金 --> debtMoneyTotalOrigin
 * R:月利率 --> monthRate
 * N:还款期数 --> monthTotal
 * 其中还款期数=贷款年限*12
 * P * (((1 + R) ** N * R) / ((1 + R) ** N - 1))
 */
const debtMoneyTotalOrigin = 1180000;
const monthRate = 0.0588 / 12
const monthTotal = 30 * 12

function computeTotal(debtMoneyTotalParam){ // 计算总体：一共多少
  let commonVar = (1 + monthRate) ** monthTotal
  let fractionUp = monthRate * commonVar
  let fractionDown = commonVar - 1
  let repaymentMonth = debtMoneyTotalParam * (fractionUp / fractionDown)
  let repaymentTotal = repaymentMonth * monthTotal
  let interestTotal = repaymentTotal - debtMoneyTotalParam

  console.log(repaymentMonth, repaymentTotal, interestTotal)
  return repaymentMonth;
}

/*********************** * **************************/

function computeDetail(debtMoneyTotalParam, repaymentMonth){ // 计算详情：每月多少
  let interestMonth = debtMoneyTotalParam * monthRate
  let debtMoneyMonth = repaymentMonth - interestMonth
  let remainDebtMoneyTotal = debtMoneyTotalParam - debtMoneyMonth

  // console.log(interestMonth, debtMoneyMonth, remainDebtMoneyTotal)
  return remainDebtMoneyTotal
}

function computeMonthly(debtMoneyTotalParam, month, minusMoney = 0) { // 计算剩余
  let remainDebtMoneyTotal = debtMoneyTotalParam
  let repaymentMonth = computeTotal(debtMoneyTotalParam)
  for(let i = 1; i <= month; i ++) {
    remainDebtMoneyTotal = computeDetail(remainDebtMoneyTotal, repaymentMonth)
  }
  
  // console.log(remainDebtMoneyTotal)
  return remainDebtMoneyTotal - minusMoney
}

let aaa = computeMonthly(debtMoneyTotalOrigin, 18, 300000)
// let bbb = computeMonthly(aaa, 12, 200000)
// let ccc = computeMonthly(bbb, 12, 200000)
// let ddd = computeMonthly(ccc, 12, 200000)
// let eee = computeMonthly(ddd, 12, 200000)
// let fff = computeMonthly(eee, 12, 100000)
console.log(computeMonthly(aaa, 1))
