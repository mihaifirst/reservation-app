export const CONFIRMATION_MODAL_CONTEXT = {
    DELETE_TABLE: 'DELETE_TABLE',
    DELETE_CATEGORY: 'DELETE_CATEGORY'
}

export const confirmationModalStateDefault = {
    isOpen: false,
    submitButtonLabel: '',
    modalTitleLabel: '',
    modalMessage: '',
    context: '',
}

export const deleteCalendarConfirmationModal = () => {
    return buildConfirmationModal(CONFIRMATION_MODAL_CONTEXT.DELETE_TABLE,
        'Sterge tabel',
        'Esti sigur ca vrei sa stergi tabelul?',
        'Sterge')
}

export const deleteCategoryConfirmationModal = () => {
    return buildConfirmationModal(CONFIRMATION_MODAL_CONTEXT.DELETE_TABLE,
        'Sterge categoria',
        'Esti sigur ca vrei sa stergi categoria?',
        'Sterge')
}

const buildConfirmationModal = (context, modalTitleLabel, modalMessage, submitButtonLabel) => {
   return {
        context,
        modalTitleLabel,
        modalMessage,
        submitButtonLabel: submitButtonLabel || 'Sterge',
        isOpen: true,
    };
}