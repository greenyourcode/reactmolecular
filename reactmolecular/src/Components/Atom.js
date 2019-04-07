import React from 'react'
import Button from '@material-ui/core/Button';

class Atom extends React.Component {

    handleRemoveAtom = () => {
        this.props.rmAtom(this.props.data)
    }

    render() {
        return (
            <div>
                <li>
                    {this.props.data.title}
                    <label htmlFor="contained-button-file">
                        <Button 
                            color="secondary" 
                            variant="outlined" 
                            component="span"
                            onClick={this.handleRemoveAtom}>
                        Delete
                        </Button>
                    </label>
                </li>
            </div>
        )
    }
}
export default Atom
