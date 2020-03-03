function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr, isDeep = false) {
    let str = '';
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '+' || expr[i] === '-' || expr[i] === '/' || expr[i] === '*') {
            str += ' ' + expr[i] + ' ';
        } else if (expr[i] === '(') {
            str += expr[i] + ' ';
        } else if (expr[i] === ')') {
            str += ' ' + expr[i];
        }
        else if (expr[i] != ' ') {
            str += expr[i];
        }
    }
    let innerArr = str.split(' ');
    let i = 0;
    let result;
    while (i < innerArr.length) {
        if (innerArr[i] === ')') throw new Error('ExpressionError: Brackets must be paired');
        if (innerArr[i] === '(') {
            let count = 0;
            let firstIndex = i;
            let j = i;
            while(innerArr[j] != ')' || count) {
                if (innerArr[j] === ')') {
                    count--;
                }
                if (j === innerArr.length-1 && innerArr[j] != ')') throw new Error('ExpressionError: Brackets must be paired');
                j++;
                if (innerArr[j] === '(') {
                    count++;
                }
            }
            result = expressionCalculator(innerArr.slice(firstIndex + 1, j).join(' '), true);
            innerArr = innerArr.slice(0, firstIndex).concat(result).concat(innerArr.slice(j+1));
            i-=2;
        } else if (innerArr[i] === '*' && innerArr[i+1] != '(') {
            result = innerArr[i-1] * innerArr[i+1];
            innerArr = innerArr.slice(0, i-1).concat(result).concat(innerArr.slice(i+2));
            i--;
        } else if (innerArr[i] === '/' && innerArr[i+1] != '(') {
            if (innerArr[i+1] === '0') throw new Error('TypeError: Division by zero.');
            result = innerArr[i-1] / innerArr[i+1];
            innerArr = innerArr.slice(0, i-1).concat(result).concat(innerArr.slice(i+2));
            i--;
        }
        i++;
    }
    i = 0;
    while (i < innerArr.length) {
        if (innerArr[i] === '+' && innerArr[i+1] != '(') {
            result = innerArr[i-1]*1 + innerArr[i+1]*1;
            innerArr = innerArr.slice(0, i-1).concat(result).concat(innerArr.slice(i+2));
            i--;
        } else if (innerArr[i] === '-' && innerArr[i+1] != '(') {
            result = innerArr[i-1] - innerArr[i+1];
            innerArr = innerArr.slice(0, i-1).concat(result).concat(innerArr.slice(i+2));
            i--;
        }
        i++;
    }

    return isDeep ? innerArr[0] : innerArr[0].toFixed(4)*1;
}

module.exports = {
    expressionCalculator
}