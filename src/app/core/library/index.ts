
//models
export {BookModel} from './_models/book.model';
export {LibraryStaffMemberDtoModel} from './_models/libraryStaffMemberDto.model';
export {LibraryStudentMemberDtoModel} from './_models/libraryStudentMemberDto.model';


//datasource
export {BooksDataSource} from './_data-sources/book.datasource';



// Effects
export { BookEffects } from './_effects/book.effects';




// Actions
// Customer Actions =>
export {
    BookActionToggleLoading,
    BookActionTypes,
    BookActions,
    BookCreated,
    BookOnServerCreated,
    BookUpdated,
    BooksPageCancelled,
    BooksPageLoaded,
    BooksPageRequested,
    BooksPageToggleLoading,
    BooksStatusUpdated,
    ManyBooksDeleted,
    OneBookDeleted
} from './_actions/book.actions';


// Reducers
export { booksReducer } from './_reducers/book.reducers';


// Selectors
export {
    selectBookById,
    selectBooksActionLoading,
    selectBooksInStore,
    selectBooksPageLoading,
    selectBooksShowInitWaitingMessage,
    selectBooksState,
    selectLastCreatedBookId
} from './_selectors/book.selectors';


// Services
export { BookService } from './_services/book.service';


