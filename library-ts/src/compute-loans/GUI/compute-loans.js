/**
 * 公式：等额本息
 * P:贷款本金 --> debtMoneyTotalOrigin
 * R:月利率 --> monthRate
 * N:还款期数 --> monthTotal
 * 其中还款期数=贷款年限*12
 * P * (((1 + R) ** N * R) / ((1 + R) ** N - 1))
 */
var debtMoneyTotalOrigin = 1180000;
var monthRate = 0.0588 / 12;
var monthTotal = 30 * 12;


function computeTotal(debtMoneyTotalParam) {
    var commonVar = Math.pow((1 + monthRate), monthTotal);
    var fractionUp = monthRate * commonVar;
    var fractionDown = commonVar - 1;
    var repaymentMonth = debtMoneyTotalParam * (fractionUp / fractionDown);
    var repaymentTotal = repaymentMonth * monthTotal;
    var interestTotal = repaymentTotal - debtMoneyTotalParam;
    // console.log(repaymentMonth, repaymentTotal, interestTotal);
    return repaymentMonth;
}
/*********************** * **************************/
function computeDetail(debtMoneyTotalParam, repaymentMonth) {
    var interestMonth = debtMoneyTotalParam * monthRate;
    var debtMoneyMonth = repaymentMonth - interestMonth;
    var remainDebtMoneyTotal = debtMoneyTotalParam - debtMoneyMonth;
    // console.log(interestMonth, debtMoneyMonth, remainDebtMoneyTotal)
    return remainDebtMoneyTotal;
}

/**
 * 多少个月后，还入多少钱，还剩多少贷款
 * @param {number} debtMoneyTotalParam 总贷款
 * @param {number} month 多少个月后还款
 * @param {number} minusMoney 还入多少钱
 * @returns {number} 还剩多少贷款
 */
function computeMonthly(debtMoneyTotalParam, month, minusMoney) {
    if (minusMoney === void 0) { minusMoney = 0; }
    var remainDebtMoneyTotal = debtMoneyTotalParam;
    var repaymentMonth = computeTotal(debtMoneyTotalParam);
    for (var i = 1; i <= month; i++) {
        remainDebtMoneyTotal = computeDetail(remainDebtMoneyTotal, repaymentMonth);
    }
    // console.log(remainDebtMoneyTotal)
    return remainDebtMoneyTotal - minusMoney;
}
// var aaa = computeMonthly(debtMoneyTotalOrigin, 18, 300000);
// let bbb = computeMonthly(aaa, 12, 200000)
// let ccc = computeMonthly(bbb, 12, 200000)
// let ddd = computeMonthly(ccc, 12, 200000)
// let eee = computeMonthly(ddd, 12, 200000)
// let fff = computeMonthly(eee, 12, 100000)
// console.log(computeMonthly(aaa, 1));
