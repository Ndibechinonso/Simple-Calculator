class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
clear() {
this.currentOperand = ""
this.previousOperand = ""
 this.operation = ""
}

appendNumber(number) { if (number === "." && this.currentOperand.includes(".") ) return
this.currentOperand += number

}

    
delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  
}

chooseOperand(operation) { if (this.currentOperand === "") return
if(this.previousOperand !== "" || this.operation === "%") {
    this.calculate()
}
    this.operation = operation
this.previousOperand = this.currentOperand + this.operation;
this.previousOperand = parseFloat(this.currentOperand)
this.currentOperand = ""

}

calculate() { 
    let result
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    
    switch (this.operation) {
     case "+" : 
        result = previous + current 
        break

     case "÷" : 
         result = previous / current  
        break
    
    case "-" :
        result = previous - current
        break

    case "*" :
        result = previous * current
        break

    case "%" :
        result = previous / 100 
        break

    default :
     return
}

 this.currentOperand = result
    this.previousOperand = ""
}


updateDisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand

    }

}





const previousOperandTextElement = document.querySelector("[data-previous-operator]")
const currentOperandTextElement = document.querySelector("[data-current-operator]")
const clearAll = document.querySelector("[data-clear-all]")
const operators = document.querySelectorAll("[data-operator]")
const numberButtons = document.querySelectorAll("[data-number]")
const equalsKey  = document.querySelector("[data-equals]")
const del = document.querySelector("[data-clear]")

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)



numberButtons.forEach(button => {button.addEventListener("click", () => { 
    
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    operators.forEach(k => k.classList.remove("operation-select")) 
        })
    })
clearAll.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
    operators.forEach(k => k.classList.remove("operation-select")) 
} )
const unSelectOperator = () => {
    operators.forEach((button) => {
      button.classList.remove("operation-select");
    });
  };

operators.forEach(button =>  {
    button.addEventListener("click", () => {
     unSelectOperator()
    button.classList.add("operation-select")
    calculator.chooseOperand(button.innerHTML)
    calculator.updateDisplay() 
    
    
     }  )
    
})


operators.forEach(button =>  { if(button.innerHTML === "%") 
{
    button.addEventListener("click", () => {
    calculator.chooseOperand(button.innerHTML)
    calculator.calculate()
    calculator.updateDisplay() 
   })

}})

equalsKey.addEventListener("click", button => {
    calculator.calculate()
    calculator.updateDisplay()
})

del.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
    operators.forEach(k => k.classList.remove("operation-select")) 
})

