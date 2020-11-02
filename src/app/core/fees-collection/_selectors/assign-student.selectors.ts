// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { AssignFeesStudentsState } from '../_reducers/assign-student.reducers';
import { AssignFeesStudentModel } from '../_models/assign-fees-student.model';

export const selectAssignFeesStudentsState = createFeatureSelector<AssignFeesStudentsState>('assignFeesStudents');

export const selectAssignFeesStudentById = (assignFeesStudentId: number) => createSelector(
    selectAssignFeesStudentsState,
    assignFeesStudentsState => assignFeesStudentsState.entities[assignFeesStudentId]
);

export const selectAssignFeesStudentsPageLoading = createSelector(
    selectAssignFeesStudentsState,
    assignFeesStudentsState => assignFeesStudentsState.listLoading
);

export const selectAssignFeesStudentsActionLoading = createSelector(
    selectAssignFeesStudentsState,
    assignFeesStudentsState => assignFeesStudentsState.actionsloading
);

export const selectLastCreatedAssignFeesStudentId = createSelector(
    selectAssignFeesStudentsState,
    assignFeesStudentsState => assignFeesStudentsState.lastCreatedAssignFeesStudentId
);

export const selectAssignFeesStudentsShowInitWaitingMessage = createSelector(
    selectAssignFeesStudentsState,
    assignFeesStudentsState => assignFeesStudentsState.showInitWaitingMessage
);

export const selectAssignFeesStudentsInStore = createSelector(
    selectAssignFeesStudentsState,
    assignFeesStudentsState => {
      const items: AssignFeesStudentModel[] = [];
      each(assignFeesStudentsState.entities, element => {
        items.push(element);
      });
      const httpExtension = new HttpExtenstionsModel();
      const result: AssignFeesStudentModel[] =
        httpExtension.sortArray(items, assignFeesStudentsState.lastQuery.sortField, assignFeesStudentsState.lastQuery.sortOrder);
      return new QueryResultsModel(result, assignFeesStudentsState.totalCount, '');
    }
);
