// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { AssignFeesStudentModel } from '../_models/assign-fees-student.model';

export enum AssignFeesStudentActionTypes {
  AssignFeesStudentOnServerCreated = '[Edit AssignFeesStudent Dialog] AssignFeesStudent On Server Created',
  AssignFeesStudentCreated = '[Edit AssignFeesStudent Dialog] AssignFeesStudent Created',
  AssignFeesStudentUpdated = '[Edit AssignFeesStudent Dialog] AssignFeesStudent Updated',
  AssignFeesStudentsStatusUpdated = '[AssignFeesStudent List Page] AssignFeesStudents Status Updated',
  OneAssignFeesStudentDeleted = '[AssignFeesStudents List Page] One AssignFeesStudent Deleted',
  ManyAssignFeesStudentsDeleted = '[AssignFeesStudents List Page] Many AssignFeesStudent Deleted',
  AssignFeesStudentsPageRequested = '[AssignFeesStudents List Page] AssignFeesStudents Page Requested',
  AssignFeesStudentsPageLoaded = '[AssignFeesStudents API] AssignFeesStudents Page Loaded',
  AssignFeesStudentsPageCancelled = '[AssignFeesStudents API] AssignFeesStudents Page Cancelled',
  AssignFeesStudentsPageToggleLoading = '[AssignFeesStudents] AssignFeesStudents Page Toggle Loading',
  AssignFeesStudentActionToggleLoading = '[AssignFeesStudents] AssignFeesStudents Action Toggle Loading'
}

export class AssignFeesStudentOnServerCreated implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentOnServerCreated;
  constructor(public payload: { assignFeesStudent: AssignFeesStudentModel }) {
  }
}

export class AssignFeesStudentCreated implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentCreated;

  constructor(public payload: { assignFeesStudent: AssignFeesStudentModel }) {
  }
}

export class AssignFeesStudentUpdated implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentUpdated;

  constructor(public payload: {
    partialAssignFeesStudent: Update<AssignFeesStudentModel>, // For State update
    assignFeesStudent: AssignFeesStudentModel // For Server update (through service)
  }) {
  }
}

export class AssignFeesStudentsStatusUpdated implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentsStatusUpdated;

  constructor(public payload: {
    assignFeesStudents: AssignFeesStudentModel[],
    status: number
  }) {
  }
}

export class OneAssignFeesStudentDeleted implements Action {
  readonly type = AssignFeesStudentActionTypes.OneAssignFeesStudentDeleted;

  constructor(public payload: { id: number }) {
  }
}

export class ManyAssignFeesStudentsDeleted implements Action {
  readonly type = AssignFeesStudentActionTypes.ManyAssignFeesStudentsDeleted;

  constructor(public payload: { ids: number[] }) {
  }
}

export class AssignFeesStudentsPageRequested implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentsPageRequested;

  constructor(public payload: { page: QueryParamsModel }) {
  }
}

export class AssignFeesStudentsPageLoaded implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentsPageLoaded;

  constructor(public payload: { assignFeesStudents: AssignFeesStudentModel[], totalCount: number, page: QueryParamsModel }) {
  }
}

export class AssignFeesStudentsPageCancelled implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentsPageCancelled;
}

export class AssignFeesStudentsPageToggleLoading implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentsPageToggleLoading;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class AssignFeesStudentActionToggleLoading implements Action {
  readonly type = AssignFeesStudentActionTypes.AssignFeesStudentActionToggleLoading;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export type AssignFeesStudentActions = AssignFeesStudentOnServerCreated
| AssignFeesStudentCreated
| AssignFeesStudentUpdated
| AssignFeesStudentsStatusUpdated
| OneAssignFeesStudentDeleted
| ManyAssignFeesStudentsDeleted
| AssignFeesStudentsPageRequested
| AssignFeesStudentsPageLoaded
| AssignFeesStudentsPageCancelled
| AssignFeesStudentsPageToggleLoading
| AssignFeesStudentActionToggleLoading;
