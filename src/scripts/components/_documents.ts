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

        addItem = (newItem: File | Folder) => {
            if (localStorage.getItem("Documents") === null) {
                localStorage.setItem("Documents", JSON.stringify([newItem]));
                return;
            }
            documents.items = JSON.parse(localStorage.getItem("Documents") as string);
            documents.items.push(newItem);
            localStorage.clear();
            localStorage.setItem("Documents", JSON.stringify(documents.items));
            renderDocuments();
            showLoadingScreen();
        }

        deleteItem = (id: number) => {
            const filtered = documents.items.filter(
                (item: { id: number | undefined }) => item.id != id
            );
            //Set new data to LocalStorage
            localStorage.setItem("Documents", JSON.stringify(filtered));
            renderDocuments();
            showLoadingScreen();
        }
    }

    const documents = new Documents();

    const getExtension = (fileName: string) => {
        const [file, extension] = fileName.split('.');
        return extension;
    }

    const randomNumberID = () => {
        return Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    }

    const iconExtension = (extension: string) => {
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

    // Loading Screen
    const showLoadingScreen = () => {
        const element: HTMLElement | null = document.querySelector(".loading-screen");
        if (element != null) element.style.visibility = "visible";
        //Then reload page
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

            // build tbody data
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

            // create button edit / delete
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

    // Documents List
    renderDocuments();

    // Add File
    const addFile = () => {
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
        if (fileName === "") {
            alert("Please Input File Name")
        } else {
            documents.addItem(newFile);
        }
    }

    // Delete File
    const deleteFile = (id: number) => {
        if(confirm("Do you want to delete this file ?") == true){
            documents.deleteItem(id);
        }
    }

    // Edit File
    const showEditForm = (item: any) => {
        const fileDetail: any = document.getElementById("update-file");
        const renderFile =
            `
            <section id="name">
              <label>File:</label>
              <input id="file" type="text" value="${item.name}" name="File Name" placeholder="Please Enter File Name" required />
              <label>Created At:</label>
              <input id="createdAt" value="${item.createdAt}" type="text" disabled />
              <label>Modified At:</label>
              <input id="modifiedAt" value="${item.modifiedAt}" type="text" disabled />
              <label>Modified By:</label>
              <input id="modifiedBy" value="${item.modifiedBy}" type="text" disabled />
            </section>
            `;
        fileDetail.innerHTML = renderFile;
        document.querySelector("#btn-update")!.addEventListener("click", () => showUpdateScreen(item));
    }

    const showUpdateScreen = (file: any) => {
        //Update File to LocalStorage
        updateFile(file);
        //Show loading that File was saved
        showLoadingScreen()
    }

    // Update File
    const updateFile = (item: any) => {
        const index = documents.items.findIndex(x => x.id === item.id);
        const form: any = document.getElementById("update-file");
        documents.items[index].name = form.file.value;
        documents.items[index].modifiedAt = new Date().toLocaleString();
        localStorage.setItem("Documents", JSON.stringify(documents.items));
    }

    // Upload Multiple File
    const uploadFile = () => {
        const input: any = document.getElementById('upload-file') as HTMLInputElement | null;
        const files: any = input.files;
        for (const item of files) {
            let newFile: File = {
                id: randomNumberID(),
                name: item.name,
                extension: getExtension(item.name),
                createdAt: new Date().toLocaleString(),
                createdBy: "Nguyễn Tú",
                modifiedAt: new Date().toLocaleString(),
                modifiedBy: "Nguyễn Tú",
            };
            documents.addItem(newFile);
        }
    }

    // Add Folder
    const addFolder = () => {
        const folderName = (
            document.getElementById("folder_name") as HTMLInputElement
        ).value;
        let newFolder: Folder = {
            id: randomNumberID(),
            name: folderName,
            createdAt: new Date().toLocaleString(),
            createdBy: "Nguyễn Tú",
            modifiedAt: new Date().toLocaleString(),
            modifiedBy: "Nguyễn Tú",
            files: [],
            subFolders: []
        };
        if (folderName === "") {
            alert("Please Input Folder Name")
        } else {
            documents.addItem(newFolder);
        }
    }
}

export default renderDocuments;
