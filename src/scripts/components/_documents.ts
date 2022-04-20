import { File } from '../models/_file.interface';
import axios from '../../../node_modules/axios/index';

const renderDocuments = () => {
  class Documents {
    // items: Array<File | Folder>;
    items: Array<File>;
    constructor() {
      this.items = [];
    }
  }

  // Documents
  const documents = new Documents();

  const documentsAPI = (
    url = 'https://localhost:44365/api/files/',
  ) => {
    return {
      fetchAll: () => axios.get(url),
      findById: (id: number) => axios.get(url + id),
      create: (newRecord: File) => axios.post(url, newRecord),
      update: (id: number, updatedRecord: File) =>
        axios.put(url + id, updatedRecord),
      delete: (id: number) => axios.delete(url + id),
      uploadFile: (newRecord: any) =>
        axios.post(url + 'UploadFiles', newRecord),
    };
  };

  const getExtension = (fileName: string) => {
    const [file, extension] = fileName.split('.');
    return extension;
  };

  const randomNumberID = () => {
    return Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
  };

  const iconExtension = (extension: string) => {
    if (extension.includes('doc') || extension.includes('txt')) {
      return `<i class="file-icon fa fa-file-text-o"></i>`;
    } else if (extension.includes('xlsx')) {
      return `<i class="file-icon fa fa-file-excel-o"></i>`;
    } else if (
      extension.includes('jpg') ||
      extension.includes('png') ||
      extension.includes('jpeg')
    ) {
      return `<i class="file-icon fa fa-picture-o"></i>`;
    } else {
      return `<i class="file-icon fa fa-folder"></i>`;
    }
  };

  // Loading Screen
  const showLoadingScreen = () => {
    const element: HTMLElement | null = document.querySelector(
      '.loading-screen',
    );
    if (element != null) element.style.visibility = 'visible';
    //Then reload page
    setTimeout(() => window.location.replace(''), 2300);
  };

  // Render Documents
  const renderDocuments = () => {
    documentsAPI()
      .fetchAll()
      .then(res => {
        console.log(res.data);
        documents.items = res.data;
        const tbody: any = document.getElementById('data-file');
        documents.items.forEach(item => {
          // build tbody data
          const tr = document.createElement('tr');
          const iconItem = document.createElement('td');
          iconItem.innerHTML = item.extension
            ? iconExtension(item.extension)
            : `<i class="file-icon fa fa-folder"></i>`;
          const fileName = document.createElement('td');
          fileName.innerText = item.name;
          const modifiedAt = document.createElement('td');
          modifiedAt.innerText = item.modifiedAt;
          const modifiedBy = document.createElement('td');
          modifiedBy.innerText = item.modifiedBy;
          tr.append(iconItem, fileName, modifiedAt, modifiedBy);

          const detailsButton = document.createElement('a');
          detailsButton.className = 'button btn-details';
          detailsButton.innerText = 'Details';
          detailsButton.setAttribute('href', '#detailsFile');
          detailsButton.addEventListener('click', () =>
            showDetails(item.id),
          );

          tr.append(detailsButton);
          tbody.append(tr);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Documents List
  renderDocuments();

  //Add File
  document
    .querySelector('#btn-save')!
    .addEventListener('click', () => addFile());

  document
    .querySelector('#btn-upload')!
    .addEventListener('click', () => uploadFile());

  const addFile = () => {
    const fileName = (document.getElementById(
      'file_name',
    ) as HTMLInputElement).value;
    let newFile: any = {
      name: fileName,
      extension: getExtension(fileName),
    };
    if (fileName === '') {
      alert('Please Input File Name');
    } else {
      documentsAPI()
        .create(newFile)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    renderDocuments();
    showLoadingScreen();
  };

  //Upload File
  const uploadFile = () => {
    const input: any = document.getElementById(
      'upload-file',
    ) as HTMLInputElement | null;
    const files: any = input.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('uploadFile', files[i]);
    }
    documentsAPI()
      .uploadFile(formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    renderDocuments();
    showLoadingScreen();
  };

  // Delete File
  const deleteFile = (id: number) => {
    if (confirm('Do you want to delete this file ?') == true) {
      documentsAPI()
        .delete(id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      renderDocuments();
      showLoadingScreen();
    }
  };

  //Show File Details
  const showDetails = (id: number) => {
    const fileDetails: any = document.getElementById('details-file');
    documentsAPI()
      .findById(id)
      .then(res => {
        console.log(res.data);
        const renderFile = `
            <section id="name">
              <label>File:</label>
              <input id="file" type="text" value="${res.data.name}" disabled />
              <label>Created At:</label>
              <input id="createdAt" value="${res.data.createdAt}" type="text" disabled />
              <label>Modified At:</label>
              <input id="modifiedAt" value="${res.data.modifiedAt}" type="text" disabled />
              <label>Modified By:</label>
              <input id="modifiedBy" value="${res.data.modifiedBy}" type="text" disabled />
            </section>
            <div class="footer-btn">
              <button class="button btn-delete" id="btn-delete">
               Delete
              </button>
            </div>
            `;
        fileDetails.innerHTML = renderFile;
        document
          .querySelector('#btn-delete')!
          .addEventListener('click', () => deleteFile(res.data.id));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default renderDocuments;
