// ts-lint:disable
// External Dependencies
import * as React from 'react';

// tslint:disable
// Internal Dependencies
import './App.css';
import './components/SoundPad/style.css';
import logo from './logo.svg';

// Audio
import notAWinner from './assets/hes_not_a_winner.wav';
import iSee from './assets/i_see_uhhuh.wav';
import soHappy from './assets/i_was_so_happy.wav';
import imSorry from './assets/oh_im_sorry.wav';
import hurtingMe from './assets/youre_hurting_me.wav';

// Components
import SoundPad from './components/SoundPad';

class App extends React.Component {
    private notAWinner = new Audio(notAWinner);
    private iSee = new Audio(iSee)
    private soHappy = new Audio(soHappy);
    private imSorry = new Audio(imSorry);
    private hurtingMe = new Audio(hurtingMe);
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Cheat Heat - Soundboard</h1>
                </header>

                <div className="container mt-3">
                    <div className="row justify-content-center">
                        <div className="col-5 col-sm-4 col-md-3">
                            <SoundPad title={`He's not a winner.`} audio={this.notAWinner}/>
                            <SoundPad title={`I see, uh huh.`} audio={this.iSee}/>
                            <SoundPad title={`I was so happy.`} audio={this.soHappy}/>
                        </div>
                        <div className="col-5 col-sm-4 col-md-3">
                            <SoundPad title={`Oh, I'm sorry.`} audio={this.imSorry}/>
                            <SoundPad title={`You're hurting me.`} audio={this.hurtingMe}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
