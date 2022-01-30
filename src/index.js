module.exports = function check(str, bracketsConfig) {

    const brackets = {}; //объект, где ключ - закрывающая скобка, а значение - открывающая
    const openBrackets = []; // массив открытых скобок
    const identicalBrackets = []; //массив идентичных скобок

    for (let i = 0; i < bracketsConfig.length; i++) {
        if (bracketsConfig[i][1] === bracketsConfig[i][0]) { //добавить в массив одинаковых скобок
            identicalBrackets.push(bracketsConfig[i][1])
        } else {

            brackets[bracketsConfig[i][1]] = bracketsConfig[i][0]; // добавить в массив разных
            openBrackets.push(bracketsConfig[i][0])
        }
    }

    let stack = [];

    for (let i = 0; i < str.length; i++) { //обход строки

        let currentSym = str[i]; //текущий символ строки

        if (identicalBrackets.includes(currentSym)) { //если скобка из массива одинаковых

            if (stack.length) { //если стек не пуст 
                let topElement = stack[stack.length - 1];

                if (currentSym === topElement) { // если одинаковая скобка есть - удалять
                    stack.pop()
                } else {
                    stack.push(currentSym) //если нет - добавлять
                }
            } else {
                stack.push(currentSym) //если стек пуст - добавлять
            }


        }

        if (openBrackets.includes(currentSym)) { //если это открывающая скобка - добавить в стек
            stack.push(currentSym)
        } else //иначе (если это закрывающая)
        if (!(identicalBrackets.includes(currentSym))) { //если Не-идентичная

            if (stack.length === 0) { //стек пуст - нет пары
                return false
            }

            let upElement = stack[stack.length - 1]; // последний элемент стека

            if (brackets[currentSym] === upElement) { //если значение по ключу (закр скобка) совпадает с последним элементом
                stack.pop(); //удалять последний
            } else {
                return false
            }
        }
    }

    return stack.length === 0
}