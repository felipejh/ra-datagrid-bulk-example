import { ReactElement, useCallback, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  useListContext,
  useListController
} from "react-admin";
import { values } from "lodash";

type UserListBulkActionButtonsProps = {
  handleClickSelectAll: (selectedIds: Array<string>) => void
}

const UserListBulkActionButtons = ({ handleClickSelectAll }: UserListBulkActionButtonsProps): ReactElement => {
  const { selectedIds } = useListContext();

  handleClickSelectAll(selectedIds);

  return <></>;
};

export const UserList = (props) => {
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
  const listContext = useListController(props);
  const data = values(listContext.data);

  const isRowSelectable = useCallback(
    (record) => {
      const isRecordSelected = selectedUsers.includes(record.id);
      const lastItemSelected = selectedUsers.at(-1);
      const nextItemIndex =
        data.findIndex((item) => item.id === lastItemSelected) + 1;
      const nextItem = data.at(nextItemIndex);

      return isRecordSelected || record.id === nextItem?.id;
    },
    [selectedUsers, data]
  );

  return (
    <List {...props}>
      <Datagrid
        isRowSelectable={isRowSelectable}
        bulkActionButtons={
          <UserListBulkActionButtons handleClickSelectAll={setSelectedUsers} />
        }
      >
        <TextField source="id" label="Installment" />
        <TextField source="name" />
        <EmailField source="email" />
      </Datagrid>
    </List>
  );
};
