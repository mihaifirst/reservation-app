export const CONFIRMATION_MODAL_CONTEXT = {
  DELETE_TABLE: "DELETE_TABLE",
  DELETE_CATEGORY: "DELETE_CATEGORY",
  DELETE_FIELD: "DELETE_FIELD",
};

export const confirmationModalStateDefault = {
  isOpen: false,
  submitButtonLabel: "",
  modalTitleLabel: "",
  modalMessage: "",
  context: "",
  data: {},
};

export const deleteCalendarConfirmationModal = () => {
  return buildConfirmationModal(
    CONFIRMATION_MODAL_CONTEXT.DELETE_TABLE,
    "Sterge tabel",
    "Esti sigur ca vrei sa stergi tabelul?",
    "Sterge"
  );
};

export const deleteCategoryConfirmationModal = (categoryId) => {
  return buildConfirmationModal(
    CONFIRMATION_MODAL_CONTEXT.DELETE_CATEGORY,
    "Sterge categoria",
    "Esti sigur ca vrei sa stergi categoria?",
    "Sterge",
    { categoryId }
  );
};

export const deleteFieldConfirmationModal = () => {
  return buildConfirmationModal(
    CONFIRMATION_MODAL_CONTEXT.DELETE_FIELD,
    "Sterge Fieldul",
    "Esti sigur ca vrei sa stergi fieldul?",
    "Sterge"
  );
};

const buildConfirmationModal = (
  context,
  modalTitleLabel,
  modalMessage,
  submitButtonLabel,
  data
) => {
  return {
    context,
    modalTitleLabel,
    modalMessage,
    submitButtonLabel: submitButtonLabel || "Sterge",
    isOpen: true,
    data,
  };
};
