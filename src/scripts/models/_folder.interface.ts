import IItem from "./_item.interface";
import { File } from "./_file.interface";

interface Folder extends IItem {
    files: Array<File>,
    subFolders: Array<Folder>
}

export { Folder }