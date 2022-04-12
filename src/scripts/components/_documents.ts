import { findKey } from "lodash";
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

    const documents = new Documents();

    function getExtension(fileName: string) {
        const [file, extension] = fileName.split('.');
        return extension;
    }

    function randomNumberID() {
        return Math.floor(Math.random() * (1000002 - 1 + 1)) + 1;
    }

    function iconExtension(extension: string) {
        if (extension.includes("doc")) {
            return `<i class="file-icon fa fa-file-text-o"></i>`;
        } else if (extension.includes("xlsx")) {
            return `<i class="file-icon fa fa-file-excel-o"></i>`;
        } else {
            return `<i class="file-icon fa fa-folder"></i>`;
        }
    }

    document.querySelector("#btn-save")!.addEventListener("click", () => addFile());
    document.querySelector("#btn-upload")!.addEventListener("click", () => uploadFile());
    document.querySelector("#btn-save-folder")!.addEventListener("click", () => addFolder());

    // Loading 
    function showLoadingScreen() {
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
    };

    // Render Documents
    const renderDocuments = () => {
        const tbody: any = document.getElementById('data-file');
        documents.items.forEach(item => {
            const tr = document.createElement("tr");
            const iconItem = document.createElement("td");
            iconItem.innerHTML = iconExtension(item.name);
            const fileName = document.createElement("td");
            fileName.innerText = item.name;
            const modifiedAt = document.createElement("td");
            modifiedAt.innerText = item.modifiedAt;
            const modifiedBy = document.createElement("td");
            modifiedBy.innerText = item.modifiedBy;
            tr.append(iconItem, fileName, modifiedAt, modifiedBy);

            const editButton = document.createElement("a");
            editButton.className = "button btn-edit";
            editButton.innerText = "Edit"
            editButton.setAttribute("href", "#updateFile");
            editButton.addEventListener("click", () => showEditForm(item))
            
            const deleteButton = document.createElement("a");
            deleteButton.className = "button btn-delete";
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => deleteFile(item.id))

            tr.append(editButton, deleteButton);
            tbody.append(tr);
        })
    };
    // Handle Documents
    renderDocuments();

    function addFile() {
        const fileName = (
            document.getElementById("file_name") as HTMLInputElement
        ).value;
        let newFile: File = {
            id: randomNumberID(),
            name: fileName,
            extension: getExtension(fileName),
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
        showLoadingScreen()
    }

    // Delete File
    function deleteFile(id: number) {
        //Remove the deleted file by id
        const filtered = documents.items.filter(
            (item: { id: number | undefined }) => item.id != id
        );
        //Set new data to LocalStorage
        localStorage.setItem("Documents", JSON.stringify(filtered));
        // Re-render Data
        renderDocuments();

        // Show Loading
        showLoadingScreen();
    }

    function showUpdateScreen(file: any) {
        //Update File to LocalStorage
        updateFile(file);
        //Show loading that File was saved
        showLoadingScreen()
    }

    function showEditForm(item: any) {
        const file: File = item;
        console.log(item);
        const fileDetail: any = document.getElementById("update-file");
        const renderFile =
            `
            <section id="name">
              <label>File:</label>
              <input id="file" type="text" value="${file.name}" name="File Name" placeholder="Please Enter File Name" required />
              <label>Created At:</label>
              <input id="createdAt" value="${file.createdAt}" type="text" disabled />
              <label>Modified At:</label>
              <input id="modifiedAt" value="${file.modifiedAt}" type="text" disabled />
              <label>Modified By:</label>
              <input id="modifiedBy" value="${file.modifiedBy}" type="text" disabled />
            </section>
        `;
        fileDetail.innerHTML = renderFile;
        document.querySelector("#btn-update")!.addEventListener("click", () => showUpdateScreen(file));
    }

    function updateFile(item: any) {
        const file: File = item;
        const index = documents.items.findIndex(x => x.id === file.id);
        var form: any = document.getElementById("update-file");
        documents.items[index].name = form.file.value;
        documents.items[index].modifiedAt = new Date().toLocaleString();
        console.log(form.file.value);
        localStorage.setItem("Documents", JSON.stringify(documents.items));
    }

    function uploadFile() {
        const input: any = document.getElementById('upload-file') as HTMLInputElement | null;
        const files: any = input.files;
        for (var item of files) {
            let newFile: File = {
                id: randomNumberID(),
                name: item.name,
                extension: getExtension(item.name),
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
        }
        renderDocuments();
        showLoadingScreen();
    }

    function addFolder() {
        const fileName = (
            document.getElementById("folder_name") as HTMLInputElement
        ).value;
        let newFolder: Folder = {
            id: randomNumberID(),
            name: fileName,
            createdAt: new Date().toLocaleString(),
            createdBy: "Nguyễn Tú",
            modifiedAt: new Date().toLocaleString(),
            modifiedBy: "Nguyễn Tú",
            files: [],
            subFolders: []
        };
        if (localStorage.getItem("Documents") === null) {
            localStorage.setItem("Documents", JSON.stringify([newFolder]));
            return;
        }
        documents.items = JSON.parse(localStorage.getItem("Documents") as string);
        documents.items.push(newFolder);
        localStorage.clear();
        localStorage.setItem("Documents", JSON.stringify(documents.items));
        renderDocuments();
        showLoadingScreen()
    }
}

export default renderDocuments;
