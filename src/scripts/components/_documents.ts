import { File } from "../models/_file.interface";
import { Folder } from "../models/_folder.interface";

const renderDocuments = () => {
    class Documents {
        items: Array<File | Folder>;
        constructor() {
            this.items = this.mockupData();
        }

        mockupData(): Array<File | Folder> {
            let dataInStorage = localStorage.getItem('Documents');
            if (dataInStorage) {
                return JSON.parse(dataInStorage);
            } else {
                return [];
            }
        }
    }

    // Dummy data for Documents
    const documents = new Documents();

    function iconExtension(extension: string) {
        if (extension.includes("doc")) {
            return `<i class="file-icon fa fa-file-text-o"></i>`;
        } else if (extension.includes("xlsx")) {
            return `<i class="file-icon fa fa-file-excel-o"></i>`;
        } else {
            return `<i class="file-icon fa fa-folder"></i>`;
        }
    }

    function validateInput() {
        const fileName = (
            document.getElementById("file_name") as HTMLInputElement
        ).value;
        if (fileName === "") {
            alert("Please input file name");
            return false;
        } else {
            return true;
        }
    }
    function showSaveScreen() {
        //Check that data exists. Cancels save and alerts;
        if (validateInput() === false) return;

        //Add File to LocalStorage
        addFile();

        //Show loading that File was saved
        const element: HTMLElement | null = document.querySelector(".loading-screen");
        if (element != null) element.style.visibility = "visible";

        //Then redirect to home page
        setTimeout(
            () =>
                window.location.replace(
                    "index.html"
                ),
            2300
        );
    }

    // Render Documents
    const renderDocuments = () => {
        const tbody: any = document.getElementById('data-file');
        let body = '';
        for (var item of documents.items) {
            body +=
            `<tr>
                <td>
                    ${iconExtension(item.name)}
                </td>
                <td><i class="fa fa-yelp new-item"></i>${item.name}</td>
                <td>${item.createdAt}</td>
                <td>${item.modifiedBy}</td>
            </tr>`;
        }
        tbody.innerHTML = body;
    };
    console.log(JSON.parse(localStorage.getItem('Documents')!));

    var _saveButton, _deteletButton;
    (_saveButton = document
        .querySelector(".save-wrapper")) === null || _saveButton === void 0 ? void 0 : _saveButton.addEventListener("click", () => showSaveScreen());

    function addFile() {
        const fileName = (
            document.getElementById("file_name") as HTMLInputElement
        ).value;
        const [file, extension] = fileName.split('.');
        let newFile: File = {
            id: Date.now(),
            name: fileName,
            extension: extension,
            createdAt: new Date().toLocaleString(),
            createdBy: "Nguyễn Tú",
            modifiedAt: new Date().toLocaleString(),
            modifiedBy: "Nguyễn Tú",
        };
        if (localStorage.getItem("Documents") === null) {
            localStorage.setItem("Documents", JSON.stringify([newFile]));
            return;
        }
        documents.items = JSON.parse(localStorage.getItem("Documents") as string);
        documents.items.push(newFile);
        localStorage.clear();
        localStorage.setItem("Documents", JSON.stringify(documents.items));
        renderDocuments();
    }

    // Handle Documents
    renderDocuments();

}

export default renderDocuments;
