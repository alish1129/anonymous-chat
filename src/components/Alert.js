import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import React from 'react'
import { connect } from 'react-redux'

const AlertBar = (props) => {
    return (
        props.alert !== null && props.alert.length > 0 && props.alert.map((alert) => {    
            return (
                <Snackbar key={alert.uid} open={true} autoHideDuration={3000} anchorOrigin={{vertical: "bottom", horizontal: "right"}} >
                    <Alert variant="filled" severity={alert.alertType}>
                        {alert.alertMessage}
                    </Alert>
                </Snackbar>
        )
        })
    )
}

const mapStateToProps = (state) => ({
    alert: state.alert
})

export default connect(mapStateToProps, {}) (AlertBar);