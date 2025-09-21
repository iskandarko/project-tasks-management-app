import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import DeleteProject from './components/modal/DeleteProject';
import AppContextProvider from './store/app-context';

function App() {
  return (
    <AppContextProvider>
      <div className="app h-full md:container">
        <header>
          <h1 className='sr-only'>Project Management App</h1>
        </header>
        <div className="h-full md:flex md:gap-4 md:pt-9">
          <Sidebar />
          <MainContent />
        </div>
        <DeleteProject />
      </div>
    </AppContextProvider>
  );
}

export default App;
