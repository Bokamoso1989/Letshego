// import logo from './logo.svg';
import './App.css';
import Header from './header';
import ArticlesList from './articles';

function App() {
  return (
    <body>
      <Header />
      <div className="row" style={{ paddingLeft: '10px', paddingTop: '10px' }}>
        <div className="col-md-12">
          <ArticlesList />
        </div>
        
      </div>

    </body>
  );
}

export default App;
