const inputField = document.querySelector(`[data-input]`);
const outputField = document.querySelector(`[data-output]`);
const transformButton = document.querySelector(`[data-transfer]`);
const clearButton = document.querySelector(`[data-clear]`);
const inputType = document.querySelector(`[data-input-type]`);
const outputType = document.querySelector(`[data-output-type]`);

const inputField1 = document.querySelector(`[data-input-log-1]`);
const inputField2 = document.querySelector(`[data-input-log-2`);
const outputField1 = document.querySelector(`[data-output-log]`);
const andButton = document.querySelector(`[data-and]`);
const orButton = document.querySelector(`[data-or]`);
const xorButton = document.querySelector(`[data-xor]`);
const inputType1 = document.querySelector(`[data-input-type-1]`);
const inputType2 = document.querySelector(`[data-input-type-2]`);
const outputType1 = document.querySelector(`[data-output-type-log]`);
const clearButton1 = document.querySelector(`[data-clear-log]`);

class Transformator {
  restArr = [];
  firstNum = ``;
  secondNum = ``;
  result = [];
  system = {
    bin: [`0`, `1`],
    oct: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`],
    dec: [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`],
    hex: [
      `0`,
      `1`,
      `2`,
      `3`,
      `4`,
      `5`,
      `6`,
      `7`,
      `8`,
      `9`,
      `A`,
      `B`,
      `C`,
      `D`,
      `E`,
      `F`,
    ],
  };
  outputNumber = ``;

  constructor(inputField, outputField, inputType, outputType) {
    this.inputField = inputField;
    this.outputField = outputField;
    this.inputType = inputType;
    this.outputType = outputType;
  }

  isSystem(num, system) {
    let val;

    if (system === `2`) {
      val = `bin`;
    } else if (system === `8`) {
      val = `oct`;
    } else if (system === `10`) {
      val = `dec`;
    } else if (system === `16`) {
      val = `hex`;
    }

    return num.split(``).every((num) => this.system[val].includes(num));
  }

  to(num, system) {
    if (system === `10`) return num;

    this.restArr.push(num % system);

    if (!Math.floor(num / system)) {
      return this.restArr
        .map((num) => {
          if (num === 10) {
            return `A`;
          } else if (num === 11) {
            return `B`;
          } else if (num === 12) {
            return `C`;
          } else if (num === 13) {
            return `D`;
          } else if (num === 14) {
            return `E`;
          } else if (num === 15) {
            return `F`;
          } else {
            return num;
          }
        })
        .reverse()
        .join(``);
    } else {
      return this.to(Math.floor(num / system), system);
    }
  }

  from(num, system) {
    if (system === `10`) return num;

    return num
      .split(``)
      .reverse()
      .map((num) => {
        if (num === `A`) {
          return 10;
        } else if (num === `B`) {
          return 11;
        } else if (num === `C`) {
          return 12;
        } else if (num === `D`) {
          return 13;
        } else if (num === `E`) {
          return 14;
        } else if (num === `F`) {
          return 15;
        } else {
          return num;
        }
      })
      .map((num, i) => num * Math.pow(system, i))
      .reduce((acc, num) => acc + num);
  }

  calculate() {
    if (!this.isSystem(this.inputField.value, this.inputType.value)) return;

    this.outputNumber = this.from(this.inputField.value, this.inputType.value);

    this.outputNumber = this.to(this.outputNumber, this.outputType.value);
  }

  logOpCalc(operand1, operand2, operation) {
    console.log(operand1, operand2);

    if (
      [...operand1.split(``).reverse()].length >
      [...operand2.split(``).reverse()].length
    ) {
      this.firstNum = [...operand1.split(``).reverse()];
      this.secondNum = [...operand2.split(``).reverse()];
    } else {
      this.firstNum = [...operand2.split(``).reverse()];
      this.secondNum = [...operand1.split(``).reverse()];
    }

    if (operation === `or`) {
      this.result = this.firstNum.map((num, i) => {
        if (num === `1` || this.secondNum[i] === `1`) {
          return `1`;
        } else {
          return `0`;
        }
      });
    } else if (operation === `and`) {
      this.result = this.secondNum.map((num, i) => {
        if (num === `1` && this.firstNum[i] === `1`) {
          return `1`;
        } else {
          return `0`;
        }
      });
    } else if (operation === `xor`) {
      for (let i = -1; i <= this.firstNum.length - this.secondNum.length; i++) {
        this.secondNum.push(`0`);
      }
      this.result = this.firstNum.map((num, i) => {
        if (!(num === this.secondNum[i])) {
          return `1`;
        } else {
          return `0`;
        }
      });
    }

    this.result = this.result.reverse().join(``);
    return this.result;
  }

  calculateLog(operation) {
    if (!this.isSystem(inputField1.value, inputType1.value)) return;
    if (!this.isSystem(inputField2.value, inputType2.value)) return;
    if (!inputField1.value) return;
    if (!inputField2.value) return;

    this.firstNum = this.from(inputField1.value, inputType1.value);
    this.restArr = [];
    this.secondNum = this.from(inputField2.value, inputType2.value);
    this.restArr = [];

    this.firstNum = this.outputNumber = this.to(this.firstNum, `2`);
    this.restArr = [];
    this.secondNum = this.outputNumber = this.to(this.secondNum, `2`);
    this.restArr = [];

    this.logOpCalc(this.firstNum, this.secondNum, operation);

    this.result = this.from(this.result, `2`);
    this.restArr = [];

    this.result = this.to(this.result, outputType1.value);
    this.restArr = [];

    outputField1.value = this.result;

    this.result = ``;
    this.firstNum = ``;
    this.secondNum = ``;
  }

  clearLog() {
    inputField1.value = ``;
    inputField2.value = ``;
    outputField1.value = ``;
  }

  clear() {
    this.outputField.value = ``;
    this.inputField.value = ``;
  }

  updateDisplay() {
    this.outputField.value = this.outputNumber;
    this.restArr = [];
    this.outputNumber = ``;
  }
}

const transformator = new Transformator(
  inputField,
  outputField,
  inputType,
  outputType
);

transformButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  transformator.calculate();
  transformator.updateDisplay();
});

clearButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  transformator.clear();
});

clearButton1.addEventListener(`click`, (e) => {
  e.preventDefault();
  transformator.clearLog();
});

andButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  console.log(`Works`);
  transformator.calculateLog(`and`);
});

orButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  transformator.calculateLog(`or`);
});

xorButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  transformator.calculateLog(`xor`);
});

///////////////////////////////////////////////////////////////////////////

const upload = document.querySelector(".file-input__upload-input");
const uploadDiv = document.querySelector("file-input");

upload.addEventListener(`change`, () => {
  let fr = new FileReader();

  fr.readAsText(upload.files[0]);

  fr.onload = function () {
    let newFileText = fr.result
      .trim(` `)
      .split(`\r\n`)
      .map((item) => item.split(` `))
      .map((item) => {
        item[0] = item[0]
          .replace(`BIN`, `2`)
          .replace(`OCT`, `8`)
          .replace(`DEC`, `10`)
          .replace(`HEX`, `16`);

        item[2] = item[2]
          .replace(`BIN`, `2`)
          .replace(`OCT`, `8`)
          .replace(`DEC`, `10`)
          .replace(`HEX`, `16`);

        let result = transformator.from(item[1], item[0]);
        transformator.restArr = [];
        result = transformator.to(result, item[2]) + ``;

        result[0] = result[0]
          .replace(`2`, `BIN2`)
          .replace(`8`, `OCT`)
          .replace(`10`, `DEC`)
          .replace(`16`, `HEX`);

        item[2] = item[2]
          .replace(`2`, `BIN`)
          .replace(`8`, `OCT`)
          .replace(`10`, `DEC`)
          .replace(`16`, `HEX`);

        result = [...item, result, `\r\n`].join(` `);

        return result;
      });

    const newFile = new Blob(newFileText, { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(newFile);
    link.download = "newFile.txt";
    link.innerHTML = "Click Here to download";
    uploadDiv.appendChild(link);
    link.click();
  };
});

///////////////////////////////////////////////////////

const uploadCalc = document.querySelector(".file-input-calc__upload-input");
const uploadCalcDiv = document.querySelector(".file-input-calc");

uploadCalc.addEventListener(`change`, () => {
  let fr = new FileReader();

  fr.readAsText(uploadCalc.files[0]);

  fr.onload = function () {
    let newFileText = fr.result
      .trim(` `)
      .split(`\r\n`)
      .map((item) => item.split(` `))
      .map((item) => {
        let result = transformator.logOpCalc(
          item[0],
          item[2],
          item[1].toLowerCase()
        );

        transformator.firstNum = ``;
        transformator.secondNum = ``;
        transformator.result = ``;

        result = [...item, result, `\r\n`].join(` `);

        return result;
      });

    const newFileCalc = new Blob(newFileText, { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(newFileCalc);
    link.download = "newFile.txt";
    link.innerHTML = "Click Here to download";
    uploadCalcDiv.appendChild(link);
    link.click();
  };
});
