const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Note Contract", function () {
  let Note;
  let owner;

  const NUM_TOTAL_NOT_MY_NOTES = 5;
  const NUM_TOTAL_MY_NOTES = 3;

  let totalNotes;
  beforeEach(async function () {
    Note = await ethers.getContractFactory("NoteContract");
    [owner, addr1, addr2] = await ethers.getSigners();
    notebook = await Note.deploy();

    totalNotes = [];

    for (let i = 0; i < NUM_TOTAL_NOT_MY_NOTES; i++) {
      let note = {
        noteText: "This is to save with Id: " + i,
        username: addr1,
        isDeleted: false,
      };

      await notebook.connect(addr1).addNote(note.noteText, note.isDeleted);
      totalNotes.push(note);
    }

    for (let i = 0; i < NUM_TOTAL_MY_NOTES; i++) {
      let note = {
        noteText: "This is to save with Id: " + i,
        username: owner,
        isDeleted: false,
      };

      await notebook.connect(owner).addNote(note.noteText, note.isDeleted);
      totalNotes.push(note);
    }
  });

  describe("Add note", function () {
    it("should emit AddNote event", async function () {
      let note = {
        noteText: "new note",
        isDeleted: false,
      };
      await expect(await notebook.addNote(note.noteText, note.isDeleted))
        .to.emit(notebook, "AddNote")
        .withArgs(owner.address, NUM_TOTAL_NOT_MY_NOTES + NUM_TOTAL_MY_NOTES);
    });
  });

  describe("Delete Note", function () {
    it("should emit delete note event", async function () {
      const NOTE_ID = 5;
      const NOTE_DELETED = true;

      await expect(await notebook.deleteNote(NOTE_ID, NOTE_DELETED))
        .to.emit(notebook, "DeleteNote")
        .withArgs(NOTE_ID, NOTE_DELETED);
    });
  });
});
