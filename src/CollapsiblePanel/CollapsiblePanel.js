import React, {Component} from 'react';
import classes from './CollapsiblePanel.css';

class CollapsiblePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        this.setState({open: !this.state.open})
    }

    headerStyle = {
        cursor: 'pointer',
        border: 'solid 1px #f2f2f2',
        padding: '15px',
        backgroundColor: '#0089CC',
        color: '#FFF',
        fontFamily: 'verdana'
    }

    contentStyle = {
        cursor: 'pointer',
        borderLeft: 'solid 1px #f2f2f2',
        borderRight: 'solid 1px #f2f2f2',
        borderBottom: 'solid 1px #f2f2f2',
        borderRadius: '0 0 5px 5px',
        padding: '15px',
        fontFamily: 'verdana',
        fontSize: '14px',
    }

    replaceCharacters = (description) => {
        const regex = '(\$[A-Za-z_])\w+%';
        const newDesc = description.replace(regex, '');
        console.log(description);
        console.log(newDesc);
        return newDesc;
    }


    render() {
        console.log(this.props.moveInfo);
        return (
            <div>
                <button style={this.headerStyle} onClick={(e) => this.togglePanel(e)} className={classes.header}>
                    {!this.state.open ? 'Show More Info' : 'Show Less Info'}
                </button>
                {this.state.open ? (
                    <div style={this.contentStyle}>
                        <div>
                            Power: {this.props.moveInfo[this.props.title].power ? this.props.moveInfo[this.props.title].power : '0'}
                        </div>
                        <div>
                            Type: {this.props.moveInfo[this.props.title].type.name ? this.props.moveInfo[this.props.title].type.name : 'Unknown'}

                        </div>
                        <div>
                            PP: {this.props.moveInfo[this.props.title].pp ? this.props.moveInfo[this.props.title].pp : 'Unknown'}

                        </div>
                        <div>
                            Accuracy: {this.props.moveInfo[this.props.title].accuracy ? this.props.moveInfo[this.props.title].accuracy : 'Unknown'}
                        </div>
                        <div>
                            {this.props.moveInfo[this.props.title].effect_entries[0].effect ?
                                this.replaceCharacters(this.props.moveInfo[this.props.title].effect_entries[0].effect) : null}

                        </div>
                        {this.props.children}
                    </div>
                ) : null}
            </div>
        )
    }
}


export default CollapsiblePanel;