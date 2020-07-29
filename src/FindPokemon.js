import React, {Component} from 'react';
import Modal from 'react-modal';
import CollapsiblePanel from "./CollapsiblePanel/CollapsiblePanel";
import Tupi from './tupi.gif';
import PartyDisplay from "./Party/PartyDisplay/PartyDisplay";
import _ from 'underscore';
class FindPokemon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pokemonImageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
            pokemonName: 'pikachu',
            errorState: false,
            moves: [],
            parsedMoveData: {},
            showModal: false,
            currentPokemon: [],
            showParty: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    Pokedex = require('pokedex-promise-v2');
    P = new this.Pokedex();
    errorLinkImg = 'https://i.ibb.co/VVbp76y/MVIMG-20190930-002649.jpg';

    headerStyle = {
        cursor: 'pointer',
        border: 'solid 1px #f2f2f2',
        padding: '15px',
        backgroundColor: '#0089CC',
        color: '#FFF',
        fontFamily: 'verdana'
    }

    findPokemon = () => {
        this.P.getPokemonByName(this.state.pokemonName)
            .then((res) => {
                this.setState({
                    pokemonImageUrl: res.sprites.front_default,
                    pokemonName: res.name, errorState: false,
                    moves: res.moves
                });
                this.generateMovesList();
            }).catch((e) => {
            this.setState({pokemonImageUrl: Tupi, errorState: true});
            console.log(e);
        });
    };

    addToParty = () => {
        const prevPokes = this.state.currentPokemon;
        const newPoke = {
            pokemonName: this.state.pokemonName,
            pokemonImageUrl: this.state.pokemonImageUrl,
            moves: this.state.parsedMoveData
        }
        if (!this.pokemonAlreadyInParty(prevPokes, newPoke) && !this.maxPokemonExceeded(prevPokes)) {
            this.setState({currentPokemon: [...prevPokes, newPoke], showParty: true});
        } else {
            alert('Pokemon already in party or maximum party size exceeded');
        }
    }

    maxPokemonExceeded = (prevPokes) => {
        return prevPokes.length >= 6;
    }

    pokemonAlreadyInParty = (prevPokes, newPoke) => {
        if (prevPokes.length === 0) {
            return false;
        }
        const isEqual = prevPokes.map(prevPoke => {
           return _.isEqual(prevPoke, newPoke);
        });
        return isEqual.every(el => el === true);
    }

    textChangedHandler = (event) => {
        this.setState({pokemonName: event.target.value});
    };

    generateMovesList = () => {
        let moves = this.state.moves;
        moves = moves.map(move => move.move)
        // generate four random moves from list
        const shuffled = moves.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 4);
        selected = this.capitalizeAndParseNames(selected);
        let parsedData = this.getMoveData(selected);
        this.setState({moves: selected});
    }

    getMoveData = (moveList) => {
        let assbutt = moveList;
        const detailedMoveList = {}
        const moveData = assbutt.forEach(move => {
            this.P.getMoveByName(move.name)
                .then(res => {
                    detailedMoveList[move.name] = res;
                }).catch(e => {
                console.log(e);
            });
        });
        this.setState({parsedMoveData: detailedMoveList});
        return detailedMoveList;
    }

    capitalizeAndParseNames = (selectedMoves) => {
        let newMoves = {...selectedMoves};
        return selectedMoves;
    }

    capitalizeName = (moveName) => {
        let move = moveName.split('-').join(' ');
        return move;
    }

    wtf = (move) => {
        console.log('moves');
        console.log(this.state.moves);
        console.log('parsedMoves');
        console.log(this.state.parsedMoveData);
        console.log(this.state.parsedMoveData[move.name].power);
        console.log(move.name);
        const name = move.name;
        this.setState({showModal: true});
    }


    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    determineIfPartyShown = () => {
        console.log(this.state.currentPokemon.length);
        if(this.state.currentPokemon.length > 0) {
            return 'none';
        }
        else {
            return '';
        }
    }

    render() {
        return (
            <div style={{display: 'inline-flex', flexDirection: 'column', height: '50%', alignItems: 'center'}}>
                <h2>
                    Enter Pokemon
                </h2>
                <div>
                    <img src={this.state.pokemonImageUrl}/>
                </div>
                <div>
                    {this.state.pokemonName}
                </div>
                <div style={{marginBottom: '5px'}}></div>

                <div style={{margin: '20px'}}>
                    <input type="text" onChange={this.textChangedHandler}/>
                    <div style={{margin: '20px'}}></div>
                    <button style={this.headerStyle} onClick={this.findPokemon}>Find Pokemon</button>
                    <button style={this.headerStyle} onClick={this.addToParty}>Add To Party</button>
                </div>
                {this.state.errorState ?
                    <div>
                        <h1>
                            404 {this.state.pokemonName} not found!!
                        </h1>
                    </div> : null}

                {/*{this.state.moves.length > 0 && Object.keys(this.state.parsedMoveData).length > 0 ?*/}
                {this.state.moves.length > 0 ?
                    <div style={{display: 'inherit'}}>
                        {this.state.moves.map((move, index) => {
                            return <div id={index}>
                                <strong>{move.name}</strong>
                                <CollapsiblePanel title={move.name} moveInfo={this.state.parsedMoveData}>

                                </CollapsiblePanel>
                            </div>
                        })}
                        {/*{this.state.moves.map(move => {console.log(move.move.name)})}*/}
                    </div> : null
                }
                <div style={{marginTop: '10px', marginBottom: '10px'}}></div>
                {
                    this.state.showParty ?
                        <div>
                            <h3>Current Party</h3>
                        </div> : null
                }
                { this.state.showParty ?
                    <PartyDisplay currentPokemon={this.state.currentPokemon}/> : null
                }


            </div>
        )
    }
}

export default FindPokemon;