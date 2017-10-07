
let nodeExcel = require('excel-export');
module.exports = {

    scanned:({ name = "default.xml", cols, rows })=>{

        try {
            let conf = {};
            conf.cols = cols;
            conf.rows = rows;
            return nodeExcel.execute(conf);
        } catch (e) {
            throw e;
        }
    }
}