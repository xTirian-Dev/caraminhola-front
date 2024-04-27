import { useState } from "react";
import Modal from "react-modal";

import "./AddNewWordModal.css";
import { CardModel } from "../../models/card";
import addNewWordApi from "../../api/addNewWord";

const AddWordButton = ({
  onAddNewWord,
  setIsLoading,
  currentCardId,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newWord, setNewWord] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setIsLoading(true);
    addNewWordApi(newWord, currentCardId)
      .then((card) => {
        closeModal();
        onAddNewWord(card);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <button onClick={openModal}>Adicionar nova palavra</button>
      <Modal isOpen={isOpen} onRequestClose={closeModal} className={"modal"}>
        <h2>Adicionar Nova Palavra</h2>
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Digite a nova palavra"
        />
        <button className="confirm-button" onClick={handleConfirm}>
          Confirmar
        </button>
        <button className="cancel-button " onClick={closeModal}>
          Cancelar
        </button>
      </Modal>
    </>
  );
};

export default AddWordButton;

interface ModalProps {
  setIsLoading: (value: boolean) => void;
  onAddNewWord: (card: CardModel) => void;
  currentCardId: string;
}
