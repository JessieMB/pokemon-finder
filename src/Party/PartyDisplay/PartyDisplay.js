import React, {Component} from 'react';

const partyDisplay = (props) => {
    const headerStyle = {
        cursor: 'pointer',
        border: 'solid 1px #f2f2f2',
        padding: '15px',
        backgroundColor: '#0089CC',
        color: '#FFF',
        fontFamily: 'verdana'
    };
    console.log(props);
    return (
        <div style={{display: props.show}}>
            <ul>
                {
                    props.currentPokemon.map(pokemon => {
                        return (
                            <li onClick={props.pokemonManager} style={{listStyle: 'none', display: 'inline-flex', flexDirection: 'row', marginLeft: '2px', marginRight: '2px'}}>
                                <div style={{display: 'inline-flex', flexDirection: 'column', border: '1px outset black'}}>
                                    <img src={pokemon.pokemonImageUrl} style={{border: '1px double black'}}/>
                                    {pokemon.pokemonName}
                                </div>
                            </li>);
                    })
                }
            </ul>
        </div>
    )

};

export default partyDisplay;