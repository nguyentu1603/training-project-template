import { File } from "../models/File";

const renderDocuments = () => {
    class FileService {
        dataFile: Array<File>;
        constructor() {
            this.dataFile = this.setData();
        }

        private setData(): Array<File> {
            return [
                { id: 1, name: "RevenueByServices.xlsx", type: "", createdAt: "A few second ago", modifiedAt: "A few second ago", modifiedBy: "Nguyễn Tú" },
                { id: 2, name: "RevenueByServices.xlsx", type: "", createdAt: "A few second ago", modifiedAt: "A few second ago", modifiedBy: "Nguyễn Tú" }
            ]
        }


        public showFileToDocuments() {
            let tbody: any = document.getElementById('dataDocuments');
            let _tr = '';
            for (const obj of this.dataFile) {
                _tr += `
                <tr>
                    <td>
                    <i class="file-icon fa fa-file-excel-o"></i>
                    </td>
                    <td><i class="fa fa-yelp new-item"></i>${obj.name}</td>
                    <td>${obj.createdAt}</td>
                    <td>${obj.modifiedBy}</td>
                </tr>
                `;
            }
            tbody.innerHTML = _tr;
        }

    }

    var dataDocument = new FileService();
    dataDocument.showFileToDocuments();

}

export default renderDocuments;