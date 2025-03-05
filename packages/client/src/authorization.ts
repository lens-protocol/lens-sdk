/**
 * Operations types.
 */
export enum OperationType {
  Post = 'Post',
  Repost = 'Repost',
  EditPost = 'EditPost',
  DeletePost = 'DeletePost',
  Follow = 'Follow',
  Unfollow = 'Unfollow',
  CreateAccount = 'CreateAccount',
  CreateUsername = 'CreateUsername',
  CreateAndAssignUsername = 'CreateAndAssignUsername',
  AssignUsername = 'AssignUsername',
  UnassignUsername = 'UnassignUsername',
  SetAccountMetadata = 'SetAccountMetadata',
  JoinGroup = 'JoinGroup',
  LeaveGroup = 'LeaveGroup',
  AddGroupMember = 'AddGroupMember',
  RemoveGroupMember = 'RemoveGroupMember',
}

/**
 * An operation approval request.
 */
export type OperationApprovalRequest = {
  nonce: string;
  deadline: string;
  operation: OperationType;
  validator: string;
  account: string;
};
