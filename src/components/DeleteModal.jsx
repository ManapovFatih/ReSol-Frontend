import React from 'react';
import Modal from './Modal';

const DeleteModal = ({ isOpen, taskTitle, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Подтверждение удаления"
    >
      <div className="delete-modal-content">
        <p>Вы уверены, что хотите удалить задачу <strong>"{taskTitle}"</strong>?</p>
        <p>Это действие нельзя отменить.</p>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Отмена
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;