import React from 'react' 
import Atom from './Atom' 
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const CardStyle = {
    minWidth: '49%',
    borderStyle: 'solid',
    borderWIdth: 1,
    marginBottom: 5,
    marginRight: 5
  }

const ButtonGroup = {
    'display': 'flex',
    'padding': '20px',
    'border-radius': '4px',
    'justify-content': 'center',
}

const AtomGroup = {
    'padding': '20px',
    'border-radius': '4px',
    'justify-content': 'center',
    'background-color': '#eeeeee',
    minHeight: 230
}

class Molecule extends React.Component {
    constructor(props){
        super(props)
        this.molecule = ''
        this.state = {
            label: ''
        }
    }

    // necessaire pour modifier la valeur du champ input
    handleChangeAtomLabel = (event) => {
        this.setState({
            label: event.target.value
        })
    }

    handleAddAtom = (event) => {
        this.props.addAtom(this.props.data, this.state.label, event)
    }

    handleRemoveAtom = (param) => {
        this.props.rmAtom(param, this.props.data)
    }

    handleDeleteMolecule = () => {
        this.props.rmMolecule(this.props.data)
    }

    handleEditMolecule = () => {
        this.props.editMolecule(this.molecule, this.props.data)
    }

    // to access to data input
    handleChangeMoleculeLabel = (event) => {
        // on recupere le nom de la nouvelle molecule
        this.molecule = event.target.value
    }

    render() {
        return (
            <Card style={CardStyle}>
                <CardContent>
                <div>
                    <h2>{this.props.data.title}</h2>
                    <br />
                    <label htmlFor="contained-button-file">
                        <Input 
                            type="text" 
                            defaultValue={this.props.data.title} 
                            onChange={this.handleChangeMoleculeLabel}/>
                        <div style={ButtonGroup}>
                            <Button 
                                variant="contained" 
                                component="span"
                                onClick={this.handleDeleteMolecule}>
                                Delete
                            </Button>
                            <Button 
                                variant="contained" 
                                component="span"
                                onClick={this.handleEditMolecule}>
                                Modifier
                            </Button>
                        </div>
                    </label>
                    <div style={AtomGroup}>
                        <form onSubmit={this.handleAddAtom}>
                            <label>
                                Atom label:
                                <Input type="text" value={this.state.label} onChange={this.handleChangeAtomLabel} />
                            </label>
                            <Input type="submit" value="Submit" />
                        </form>
                        <br /><span>Nombre d'atomes : </span><span>{this.props.data.atomlist.length}</span>
                        {this.props.data.atomlist.map((atom) => {
                            return ( 
                                <Atom 
                                    key={atom.id}
                                    data={atom}
                                    rmAtom={this.handleRemoveAtom} />
                            )
                        })}
                    </div>
                </div>
                </CardContent>
            </Card>
        )
    }
    
}

export default Molecule
