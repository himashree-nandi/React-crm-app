import constants from "./constants";
export const fetchDisabledFields = () => {
  const disabledFields = {
    title: false,
    assignee: false,
    description: false,
    status: false,
    ticketPriority: false,
  };
  const userTypes = localStorage.getItem(
    constants.userAttributeFields.userType
  );
  if (userTypes === constants.constUserTypes.engineer) {
    disabledFields.title = true;
    disabledFields.assignee = true;
    disabledFields.ticketPriority = true;
  }
  if (userTypes === constants.constUserTypes.customer) {
    disabledFields.assignee = true;
  }
  return disabledFields;
};
