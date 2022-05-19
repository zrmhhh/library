/**
 * 公式：等额本息
 * P:贷款本金 --> debtMoneyTotalOrigin
 * R:月利率 --> monthRate
 * N:还款期数 --> monthTotal
 * 其中还款期数=贷款年限*12
 */
let R = 0.0588 / 12
let N = 30 * 12
let P = 1180000

var top = ((1 + R) ** N) * R
var bottom = (1 + R) ** N - 1
var total = P * (top / bottom)

console.log(total);