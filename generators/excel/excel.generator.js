const excelnode = require('excel4node'), fs = require("fs"), path = require('path');
!fs.existsSync(path.join(__dirname, "../generatedFiles")) ?
    fs.mkdirSync(path.join(__dirname, "../generatedFiles")) : "";

getDate = () =>
    new Date(new Date() + 'UTC').toISOString().split("T")[0]
module.exports = class excel {


    folderPath = `../generatedFiles/`

    constructor(config) {
        this.sheetName = config.sheetName || 'Sheet 1';
        this.docName = config.docName.trim();
        this.header = config.header;
        this.date = config.date;
        this.etx = 'xlsx';
        this.createfolder();
        this.initializeStyle();
        this.initializeHeader();

    }

   

    initializeStyle() {
        this.wb = new excelnode.Workbook({
            defaultFont: {
                size: 12,
                name: 'Calibri'
            },
            numberFormat: '@',
            dateFormat: 'd/m/yyyy hh:mm:ss',

        });
        this.ws = this.wb.addWorksheet(this.sheetName);
        this.style = this.wb.createStyle({
            alignment: {
                vertical: 'center',
                horizontal: 'center',

            }
        });

    }

    createfolder() {
        this.folderPath = `${this.folderPath}${this.date || getDate()}`;
        !fs.existsSync(path.join(__dirname, this.folderPath)) ?
            fs.mkdirSync(path.join(__dirname, this.folderPath)) : "";
        this.docName = `${this.docName}_${this.date || getDate()}_${Date.now()}.${this.etx}`
        this.fPath = path.join(__dirname, `${this.folderPath}/${this.docName}`);
    }

    initializeHeader() {
        let headerKeys = Object.keys(this.header);
        this.ws.row(1).setHeight(20);
        for (let index in headerKeys) {
            index *= 1;
            this.ws.column(index + 1).setWidth(25);
            this.ws.cell(1, index + 1).string(headerKeys[index]).style(this.style);
        }

        this.headerType = Object.values(this.header);
    }

    addCell(rowIndex, colIndex, cellType, value) {
        colIndex = Number(colIndex) + 1; rowIndex = Number(rowIndex) + 2;
        this.ws.column(colIndex).setWidth(25);
        this.ws.row(rowIndex).setHeight(20);
        this.ws.cell(rowIndex, colIndex)[cellType](value || '').style(this.style);
    }

    addToFile(data, startIndex) {
        for (let rowIndex in data) {
            rowIndex *= 1
            let row = Object.values(data[rowIndex]);
            for (let colIndex in row) {
                colIndex *= 1;
                let cellType = this.headerType[colIndex];
                if (!cellType) continue;
                // console.log
                let value = row[colIndex];
                //  if (cellType == 'date') value = new Date(value);
                this.addCell(startIndex * 1 + rowIndex, colIndex, cellType, value);
            }
        }
    }


    savefile() {
        this.wb.write(this.fPath);
        return this.docName;
    }


}