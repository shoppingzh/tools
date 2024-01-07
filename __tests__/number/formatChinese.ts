// import { formatChinese } from '@/number'

// type Pair = [number, string]

// it('normal', () => {
//   ([
//     [1, '一'],
//     [2, '二'],
//     [3, '三'],
//     [4, '四'],
//     [5, '五'],
//     [6, '六'],
//     [7, '七'],
//     [8, '八'],
//     [9, '九'],
//     [10, '十'], // 有争议
//     [19, '十九'],
//     [20, '二十'],
//     [29, '二十九'],
//     [90, '九十'],
//     [99, '九十九'],
//     [100, '一百'],
//     [101, '一百零一'],
//     [111, '一百一十一'],
//     [999, '九百九十九'],
//     [1000, '一千'],
//     [1001, '一千零一'],
//     [1010, '一千零一十'],
//     [1011, '一千零一十一'],
//     [1100, '一千一百'],
//     [1110, '一千一百一十'],
//     [1111, '一千一百一十一'],
//     [10000, '一万'],
//     [10001, '一万零一'],
//     [10010, '一万零一十'],
//     [10100, '一万零一百'],
//     [11000, '一万一千'],
//     [11001, '一万一千零一'],
//     [100001, '十万零一'], // 有争议
//     [100999, '十万零九百九十九'], // 有争议
//     [1000000, '一百万'],
//     [1000001, '一百万零一'],
//     // [20001234, '二千万零一千二百三十四'], // 有争议
//     // [10210300, '一千零二十一万零三百'], // 有争议
//   ] as Pair[]).forEach(o => {
//     expect(formatChinese(o[0])).toBe(o[1])
//   })
// })

// it('negative', () => {
//   expect(formatChinese(-1000)).toBe('负一千')
// })

// it('traditional', () => {
//   ([
//     [1, '壹'],
//     [2, '贰'],
//     [3, '叁'],
//     [4, '肆'],
//     [5, '伍'],
//     [6, '陆'],
//     [7, '柒'],
//     [8, '捌'],
//     [9, '玖'],
//     [10, '拾'],
//     [19, '拾玖'],
//     [20, '贰拾'],
//     [29, '贰拾玖'],
//     [90, '玖拾'],
//     [99, '玖拾玖'],
//     [100, '壹佰'],
//     [101, '壹佰零壹'],
//     [111, '壹佰壹拾壹'],
//     [999, '玖佰玖拾玖'],
//     [1000, '壹仟'],
//     [1001, '壹仟零壹'],
//     [1010, '壹仟零壹拾'],
//     [1011, '壹仟零壹拾壹'],
//     [1100, '壹仟壹佰'],
//     [1110, '壹仟壹佰壹拾'],
//     [1111, '壹仟壹佰壹拾壹'],
//     [10000, '壹万'],
//     [10001, '壹万零壹'],
//     [10010, '壹万零壹拾'],
//     [10100, '壹万零壹佰'],
//     [11000, '壹万壹仟'],
//     [11001, '壹万壹仟零壹'],
//     [100001, '拾万零壹'],
//     [100999, '拾万零玖佰玖拾玖'],
//     [1000000, '壹佰万'],
//     [1000001, '壹佰万零壹'],
//   ] as Pair[]).forEach(o => {
//     expect(formatChinese(o[0], true)).toBe(o[1])
//   })
// })
