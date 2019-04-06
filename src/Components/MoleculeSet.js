import React from 'react' 
import Molecule from './Molecule' 
import moleculelist from '../Helpers/MyJSON'
import uuidv4 from 'uuid/v4'
import Input from '@material-ui/core/Input';

const MoleculeStyle = {
    'display': 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
class MoleculeSet extends React.Component {
    constructor(props){
        super(props)
        this.molecule = '' // pas besoin d'encapsuler dans le state pour éviter le refresh
        this.state = {
            moleculeset: moleculelist
        }
    }

    // fn callback
    removeMolecule = (param) => {
        const newmolecules = this.state.moleculeset.filter( molecule => molecule.id !== param.id)
        this.setState({
            ...this.state,
            moleculeset: [...newmolecules]
        })
    }

    editMolecule = (param, mol) => {
        const moleculetochange = this.state.moleculeset.find( molecule => molecule.id === mol.id)
        const moleculesother = this.state.moleculeset.filter( molecule => molecule.id !== mol.id)

        const newmolecule = {
            ...moleculetochange,
            title: param
        }
        this.setState({
            ...this.state,
            moleculeset: [...moleculesother, newmolecule]
        })
    }

    addAtom = (param, newlabel, event) => {
        const uuid = uuidv4()
        const newatom = {
            ...param.atomlist[param.atomlist.length],
            id: uuid,
            title: newlabel
        }
        const newmolecule = { ...param, atomlist: [
            ...param.atomlist, newatom]
        }
        
        const moleculesother = this.state.moleculeset.filter( molecule => molecule.id !== newmolecule.id)
        this.setState({
            ...this.state,
            // pas de ... si ajout d'un objet à une liste
            moleculeset: [...moleculesother, newmolecule ]
        })        
        event.preventDefault()
    }

    removeAtom = (param, molecule) => {
        const atomlist = molecule.atomlist.filter( atom => atom.id !== param.id)
        const moleculesother = this.state.moleculeset.filter( mol => mol.id !== molecule.id)
        // Attention, utiliser find pour n'avoir qu'un seul résultat ! 
        // => Sinon, impossible de modifier la structure et la vaeur si plusieurs résultat...
        const moleculetochange = this.state.moleculeset.find( mol => mol.id === molecule.id)
        const moleculechanges = [{
            ...moleculetochange,
            atomlist: atomlist
        }]

        // 2x ... si concaténation de listes
        const newmolecules = [...moleculesother, ...moleculechanges]

        this.setState({
            ...this.state,
            moleculeset: [...newmolecules]
        })
    }

    // necessaire pour modifier la valeur du champ input
    handleChangeMoleculeLabel = (event) => {
        // on recupere le nom de la nouvelle molecule
        this.molecule = event.target.value
    }

    handleAddMolecule = (event) => {
        // add a new molecule
        const uuid = uuidv4()
        const newmolecule = {
            ...this.state.moleculeset[this.state.moleculeset.length],
            id: uuid,
            title: this.molecule, 
                atomlist: []
        }
        const nextState = { ...this.state, moleculeset: [
            ...this.state.moleculeset, newmolecule]
        }
        this.setState(nextState)

        // permet de ne pas valider le formulaire (eviter le fonctionnement normal)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Molecule set</h1>
                <form onSubmit={this.handleAddMolecule}>
                    <label> New molecule: </label>
                    <Input type="text" onChange={this.handleChangeMoleculeLabel} />
                    <Input type="submit" value="Submit" />
                </form>
                <br />
                <span>{this.state.moleculeset.length} molécules</span>
                <div style={MoleculeStyle}>
                    {this.state.moleculeset
                        .sort((a, b) => a.id - b.id) // TODO : cf. comment sort la liste ? 
                        .map((molecule) => {
                        return (
                            <Molecule 
                                key={molecule.id} 
                                data={molecule} 
                                addAtom={this.addAtom}
                                editMolecule={this.editMolecule}
                                rmAtom={this.removeAtom} 
                                rmMolecule={this.removeMolecule} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default MoleculeSet
