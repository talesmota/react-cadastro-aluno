import React, { Component } from 'react';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
        <div>
            <header>
              <img src="/img/logo.png" alt="" />
           </header>
           <div className="nti-body">
                 <Menu />
                 <div className="nti-body">
                    <div className="content">
                        {this.props.children}
                    </div>            
                </div>
            </div>
            
        </div>
    );
  }
}

export default App;
