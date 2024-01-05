const notesContainer = document.getElementById("app");
const addNoteButton = document.querySelector(".add_note");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);  
    notesContainer.insertBefore(noteElement, addNoteButton)  ;
});

addNoteButton.addEventListener("click", () => addNotes());  

// getNotes
function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// save notes
function saveNotes(notes){
    localStorage.setItem('stickynotes-notes', JSON.stringify(notes));

}

// create element notes
function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty sticky note";

    element.addEventListener("change", () => {
        updateNotes(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete ?");
        if(doDelete){
            deleteNote(id, element);
        }
    });

    return element;
}

// add notes
function addNotes(){
    const notes = getNotes();
    const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

// update notes
function updateNotes(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

// delete notes
function deleteNote(id, element){
    const notes = getNotes().filter((note) => note.id != id );

    saveNotes(notes);
    notesContainer.removeChild(element);
}