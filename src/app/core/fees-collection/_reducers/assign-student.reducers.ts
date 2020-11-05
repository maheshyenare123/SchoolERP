// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { AssignFeesStudentActions, AssignFeesStudentActionTypes } from '../_actions/assign-student.actions';
// Models
import { AssignFeesStudentModel } from '../_models/assign-fees-student.model';
import { QueryParamsModel } from '../../_base/crud';

export interface AssignFeesStudentsState extends EntityState<AssignFeesStudentModel> {
  listLoading: boolean;
  actionsloading: boolean;
  totalCount: number;
  lastCreatedAssignFeesStudentId: number;
  lastQuery: QueryParamsModel;
  showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<AssignFeesStudentModel> = createEntityAdapter<AssignFeesStudentModel>();

export const initialAssignFeesStudentsState: AssignFeesStudentsState = adapter.getInitialState({
  assignFeesStudentForEdit: null,
  listLoading: false,
  actionsloading: false,
  totalCount: 0,
  lastCreatedAssignFeesStudentId: undefined,
  lastQuery: new QueryParamsModel({}),
  showInitWaitingMessage: true
});

export function assignFeesStudentsReducer(state = initialAssignFeesStudentsState, action: AssignFeesStudentActions): AssignFeesStudentsState {
  switch (action.type) {
    case AssignFeesStudentActionTypes.AssignFeesStudentsPageToggleLoading: {
      return {
        ...state, listLoading: action.payload.isLoading, lastCreatedAssignFeesStudentId: undefined
      };
    }
    case AssignFeesStudentActionTypes.AssignFeesStudentActionToggleLoading: {
      return {
        ...state, actionsloading: action.payload.isLoading
      };
    }
    case AssignFeesStudentActionTypes.AssignFeesStudentOnServerCreated:
      return {
        ...state
      };
    case AssignFeesStudentActionTypes.AssignFeesStudentCreated:
      return adapter.addOne(action.payload.assignFeesStudent, {
        ...state, lastCreatedAssignFeesStudentId: action.payload.assignFeesStudent.studentId
      });
    case AssignFeesStudentActionTypes.AssignFeesStudentUpdated:
      return adapter.updateOne(action.payload.partialAssignFeesStudent, state);
    // case AssignFeesStudentActionTypes.AssignFeesStudentsStatusUpdated: {
    //   // tslint:disable-next-line
    //   const _partialAssignFeesStudents: Update<AssignFeesStudentModel>[] = [];
    //   // tslint:disable-next-line:prefer-const
    //   // tslint:disable-next-line
    //   for (let i = 0; i < action.payload.assignFeesStudents.length; i++) {
    //     _partialAssignFeesStudents.push({
    //       id: action.payload.assignFeesStudents[i].id,
    //       changes: {
    //         status: action.payload.status
    //       }
    //     });
    //   }
    //   return adapter.updateMany(_partialAssignFeesStudents, state);
    // }
    case AssignFeesStudentActionTypes.OneAssignFeesStudentDeleted:
      return adapter.removeOne(action.payload.id, state);
    case AssignFeesStudentActionTypes.ManyAssignFeesStudentsDeleted:
      return adapter.removeMany(action.payload.ids, state);
    case AssignFeesStudentActionTypes.AssignFeesStudentsPageCancelled: {
      return {
        ...state, listLoading: false, lastQuery: new QueryParamsModel({})
      };
    }
    case AssignFeesStudentActionTypes.AssignFeesStudentsPageLoaded: {
      return adapter.addMany(action.payload.assignFeesStudents, {
        ...initialAssignFeesStudentsState,
        totalCount: action.payload.totalCount,
        listLoading: false,
        lastQuery: action.payload.page,
        showInitWaitingMessage: false
      });
    }
    default:
      return state;
  }
}

export const getAssignFeesStudentState = createFeatureSelector<AssignFeesStudentModel>('assignFeesStudents');

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
