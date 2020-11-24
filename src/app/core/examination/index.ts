
//models

export {ExamModel} from './_models/exam.model';
export {HostelRoomModel} from './_models/hostel-room.model';
export {ExamGroupModel} from './_models/exam-group.model';


//datasource

export {ExamsDataSource} from './_data-sources/exam.datasource';
export {HostelRoomsDataSource} from './_data-sources/hosel-room.datasource';
export {ExamGroupsDataSource} from './_data-sources/exam-group.datasource';

// Effects

export { ExamEffects } from './_effects/exam.effects';
export { HostelRoomEffects } from './_effects/hostel-room.effects';
export { ExamGroupEffects } from './_effects/exam-group.effects';


// Actions
// Customer Actions =>

export {
    ExamActionToggleLoading,
    ExamActionTypes,
    ExamActions,
    ExamCreated,
    ExamOnServerCreated,
    ExamUpdated,
    ExamsPageCancelled,
    ExamsPageLoaded,
    ExamsPageRequested,
    ExamsPageToggleLoading,
    ExamsStatusUpdated,
     ManyExamsDeleted,
     OneExamDeleted
 } from './_actions/exam.actions';
 export {
 HostelRoomActionToggleLoading,
 HostelRoomActionTypes,
 HostelRoomActions,
 HostelRoomCreated,
 HostelRoomOnServerCreated,
 HostelRoomUpdated,
 HostelRoomsPageCancelled,
 HostelRoomsPageLoaded,
 HostelRoomsPageRequested,
 HostelRoomsPageToggleLoading,
 HostelRoomsStatusUpdated,
  ManyHostelRoomsDeleted,
  OneHostelRoomDeleted
} from './_actions/hostel-room.actions';
export {
ExamGroupActionToggleLoading,
ExamGroupActionTypes,
ExamGroupActions,
ExamGroupCreated,
ExamGroupOnServerCreated,
ExamGroupUpdated,
ExamGroupsPageCancelled,
ExamGroupsPageLoaded,
ExamGroupsPageRequested,
ExamGroupsPageToggleLoading,
ExamGroupsStatusUpdated,
 ManyExamGroupsDeleted,
 OneExamGroupDeleted
} from './_actions/exam-group.actions';

// Reducers

export {examsReducer } from './_reducers/exam.reducers';
export {hostelRoomsReducer } from './_reducers/hostel-room.reducers';
export {examGroupsReducer } from './_reducers/exam-group.reducers';
// Selectors

export {
    selectExamById,
    selectExamsActionLoading,
    selectExamsInStore,
    selectExamsPageLoading,
    selectExamsShowInitWaitingMessage,
    selectExamsState,
    selectLastCreatedExamId
} from './_selectors/exam.selectors';

export {
    selectHostelRoomById,
    selectHostelRoomsActionLoading,
    selectHostelRoomsInStore,
    selectHostelRoomsPageLoading,
    selectHostelRoomsShowInitWaitingMessage,
    selectHostelRoomsState,
    selectLastCreatedHostelRoomId
} from './_selectors/hostel-room.selectors';

export {
    selectExamGroupById,
    selectExamGroupsActionLoading,
    selectExamGroupsInStore,
    selectExamGroupsPageLoading,
    selectExamGroupsShowInitWaitingMessage,
    selectExamGroupsState,
    selectLastCreatedExamGroupId
} from './_selectors/exam-group.selectors';

// Services

export {ExamService } from './_services/exam.service';
export {HostelRoomService } from './_services/hostel-room.service';
export {ExamGroupService } from './_services/exam-group.service';

