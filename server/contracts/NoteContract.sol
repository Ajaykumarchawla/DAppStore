// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;

contract NoteContract {
    constructor() {}

    event AddNote(address recipient, uint noteId);
    event DeleteNote(uint noteId, bool isDeleted);

    struct Note {
        uint id;
        address username;
        string noteText;
        bool isDeleted;
    }

    Note[] private notes;

    //Mapping of Note Id to the wallet address of the user
    mapping(uint256 => address) noteToOwner;

    // Method to be called by Frontend when trying to add a new note
    function addNote(string memory noteText, bool isDeleted) external {
        uint noteId = notes.length;
        notes.push(Note(noteId, msg.sender, noteText, isDeleted));
        noteToOwner[noteId] = msg.sender;
        emit AddNote(msg.sender, noteId);
    }

    // method to get all notes
    function getAllNotes() external view returns (Note[] memory) {
        Note[] memory temporary = new Note[](notes.length);

        uint counter = 0;
        for (uint i = 0; i < notes.length; i++) {
            if (notes[i].isDeleted == false) {
                temporary[counter] = notes[i];
                counter++;
            }
        }

        Note[] memory result = new Note[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function getMyNotes() external view returns (Note[] memory) {
        Note[] memory temporary = new Note[](notes.length);

        uint counter = 0;
        for (uint i = 0; i < notes.length; i++) {
            if (noteToOwner[i] == msg.sender && notes[i].isDeleted == false) {
                temporary[counter] = notes[i];
                counter++;
            }
        }

        Note[] memory result = new Note[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Method to Delete A Note

    function deleteNote(uint noteId, bool isDeleted) external {
        if (noteToOwner[noteId] == msg.sender) {
            notes[noteId].isDeleted = isDeleted;
            emit DeleteNote(noteId, isDeleted);
        }
    }
}
